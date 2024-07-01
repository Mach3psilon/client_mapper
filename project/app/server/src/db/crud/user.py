from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlmodel import select
from sqlmodel import select, Session

from db.models.user import User, UserLogin, UserCreate, UserResponse

async def create_user(db: Session, user: UserCreate) -> UserResponse:
    try:
        user = User.from_orm(user)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User already exists")

async def login_user(db: Session, user: UserLogin) -> UserResponse:
    result = db.execute(select(User).where(User.email == user.email))
    user_in_db = result.scalar_one_or_none()
    if user_in_db is None:
        raise HTTPException(status_code=404, detail="User not found")
    if user_in_db.password != user.password:
        raise HTTPException(status_code=400, detail="Incorrect password")
    return user_in_db