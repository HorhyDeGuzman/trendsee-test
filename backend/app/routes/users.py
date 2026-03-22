import logging

from fastapi import APIRouter, Depends, HTTPException, status
import asyncpg
import redis.asyncio as aioredis

from app.dependencies import get_db, get_redis, get_current_user
from app.schemas import UserCreate, UserUpdate, UserResponse, UserWithToken, TokenResponse
from app.auth import create_token

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/users", tags=["users"])


@router.post("", response_model=UserWithToken, status_code=status.HTTP_201_CREATED)
async def create_user(data: UserCreate, db: asyncpg.Pool = Depends(get_db)):
    row = await db.fetchrow(
        "INSERT INTO users (name) VALUES ($1) RETURNING id, name, created_at, updated_at",
        data.name,
    )
    token = create_token(row["id"])
    logger.info("User created: id=%s", row["id"])
    return UserWithToken(user=UserResponse(**dict(row)), token=token)


@router.get("/{user_id}/token", response_model=UserWithToken)
async def get_token(user_id: int, db: asyncpg.Pool = Depends(get_db)):
    row = await db.fetchrow(
        "SELECT id, name, created_at, updated_at FROM users WHERE id = $1", user_id
    )
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserWithToken(user=UserResponse(**dict(row)), token=create_token(user_id))


@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    data: UserUpdate,
    db: asyncpg.Pool = Depends(get_db),
    r: aioredis.Redis = Depends(get_redis),
    current_user: dict = Depends(get_current_user),
):
    if current_user["id"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    row = await db.fetchrow(
        "UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, created_at, updated_at",
        data.name,
        user_id,
    )
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await r.delete(f"user_posts:{user_id}")
    return UserResponse(**dict(row))


@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user(
    user_id: int,
    db: asyncpg.Pool = Depends(get_db),
    r: aioredis.Redis = Depends(get_redis),
    current_user: dict = Depends(get_current_user),
):
    if current_user["id"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    result = await db.execute("DELETE FROM users WHERE id = $1", user_id)
    if result == "DELETE 0":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await r.delete(f"user_posts:{user_id}")
    logger.info("User deleted: id=%s", user_id)
    return {"detail": "User deleted"}
