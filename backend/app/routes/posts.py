import asyncio
import json
import logging
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, Query
import asyncpg
import redis.asyncio as aioredis

from app.dependencies import get_db, get_redis, get_current_user
from app.schemas import PostCreate, PostUpdate, PostResponse, PostListResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/posts", tags=["posts"])

REDIS_TTL = 600  # 10 minutes


def _serialize_post(row: dict) -> dict:
    d = dict(row)
    for k in ("created_at", "updated_at"):
        if isinstance(d[k], datetime):
            d[k] = d[k].isoformat()
    return d


def _deserialize_post(data: dict) -> PostResponse:
    return PostResponse(**data)


async def _invalidate_user_cache(r: aioredis.Redis, user_id: int) -> None:
    await r.delete(f"user_posts:{user_id}")


@router.post("", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    data: PostCreate,
    db: asyncpg.Pool = Depends(get_db),
    r: aioredis.Redis = Depends(get_redis),
    current_user: dict = Depends(get_current_user),
):
    row = await db.fetchrow(
        "INSERT INTO posts (user_id, title, text) VALUES ($1, $2, $3) "
        "RETURNING id, user_id, title, text, created_at, updated_at",
        current_user["id"],
        data.title,
        data.text,
    )
    post = _serialize_post(row)
    post["author_name"] = current_user["name"]
    await _invalidate_user_cache(r, current_user["id"])
    return PostResponse(**post)


@router.get("/user/{user_id}", response_model=PostListResponse)
async def get_user_posts(
    user_id: int,
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: asyncpg.Pool = Depends(get_db),
    r: aioredis.Redis = Depends(get_redis),
):
    cache_key = f"user_posts:{user_id}"
    cached = await r.get(cache_key)

    if cached:
        logger.info("Cache hit for user_id=%s", user_id)
        data = json.loads(cached)
        posts = data["posts"]
        total = data["total"]
        sliced = posts[offset : offset + limit]
        return PostListResponse(
            posts=[_deserialize_post(p) for p in sliced],
            total=total,
            source="redis",
        )

    # Fallback to Postgres with artificial delay
    logger.info("Cache miss for user_id=%s, fetching from Postgres", user_id)
    await asyncio.sleep(2)

    total = await db.fetchval("SELECT COUNT(*) FROM posts WHERE user_id = $1", user_id)
    rows = await db.fetch(
        "SELECT p.id, p.user_id, u.name AS author_name, p.title, p.text, p.created_at, p.updated_at "
        "FROM posts p JOIN users u ON p.user_id = u.id "
        "WHERE p.user_id = $1 ORDER BY p.created_at DESC",
        user_id,
    )

    all_posts = [_serialize_post(dict(row)) for row in rows]

    # Cache full list for 10 minutes
    await r.setex(cache_key, REDIS_TTL, json.dumps({"posts": all_posts, "total": total}))

    sliced = all_posts[offset : offset + limit]
    return PostListResponse(
        posts=[_deserialize_post(p) for p in sliced],
        total=total,
        source="postgres",
    )


@router.patch("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: int,
    data: PostUpdate,
    db: asyncpg.Pool = Depends(get_db),
    r: aioredis.Redis = Depends(get_redis),
    current_user: dict = Depends(get_current_user),
):
    existing = await db.fetchrow("SELECT user_id FROM posts WHERE id = $1", post_id)
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if existing["user_id"] != current_user["id"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")

    sets, params, idx = [], [], 1
    if data.title is not None:
        sets.append(f"title = ${idx}")
        params.append(data.title)
        idx += 1
    if data.text is not None:
        sets.append(f"text = ${idx}")
        params.append(data.text)
        idx += 1
    if not sets:
        raise HTTPException(status_code=400, detail="No fields to update")

    sets.append(f"updated_at = NOW()")
    params.append(post_id)
    query = f"UPDATE posts SET {', '.join(sets)} WHERE id = ${idx} RETURNING id, user_id, title, text, created_at, updated_at"
    row = await db.fetchrow(query, *params)

    await _invalidate_user_cache(r, current_user["id"])

    post = _serialize_post(row)
    post["author_name"] = current_user["name"]
    return PostResponse(**post)


@router.delete("/{post_id}")
async def delete_post(
    post_id: int,
    db: asyncpg.Pool = Depends(get_db),
    r: aioredis.Redis = Depends(get_redis),
    current_user: dict = Depends(get_current_user),
):
    existing = await db.fetchrow("SELECT user_id FROM posts WHERE id = $1", post_id)
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if existing["user_id"] != current_user["id"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")

    await db.execute("DELETE FROM posts WHERE id = $1", post_id)
    await _invalidate_user_cache(r, current_user["id"])
    return {"detail": "Post deleted"}
