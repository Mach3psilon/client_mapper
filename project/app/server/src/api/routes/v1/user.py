
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from db.session import get_session

from db.crud.user import create_user, login_user
from db.models.user import UserCreate, UserResponse, UserLogin, User

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post(
    "/create",
    summary="Create a new user.",
    status_code=status.HTTP_201_CREATED,
    response_model=UserResponse,
)
async def create_new_user(user: UserCreate, db: AsyncSession = Depends(get_session)):
    return await create_user(db, user)


@router.post(
    "/login",
    summary="Login as a user.",
    status_code=status.HTTP_200_OK,
    response_model=UserResponse,
)
async def login_as_user(user: UserLogin, db: AsyncSession = Depends(get_session)):
    return await login_user(db, user)

