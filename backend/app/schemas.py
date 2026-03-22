from datetime import datetime
from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)


class UserUpdate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)


class UserResponse(BaseModel):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime


class UserWithToken(BaseModel):
    user: UserResponse
    token: str


class TokenResponse(BaseModel):
    token: str


class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    text: str = Field(..., min_length=1, max_length=10000)


class PostUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=500)
    text: str | None = Field(None, min_length=1, max_length=10000)


class PostResponse(BaseModel):
    id: int
    user_id: int
    author_name: str
    title: str
    text: str
    created_at: datetime
    updated_at: datetime


class PostListResponse(BaseModel):
    posts: list[PostResponse]
    total: int
    source: str  # "redis" or "postgres"
