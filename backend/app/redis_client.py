import redis.asyncio as aioredis
from app.config import settings

redis: aioredis.Redis | None = None


async def init_redis():
    global redis
    redis = aioredis.from_url(settings.REDIS_URL, decode_responses=True)


async def close_redis():
    global redis
    if redis:
        await redis.close()


def get_redis_client() -> aioredis.Redis:
    assert redis is not None, "Redis not initialized"
    return redis
