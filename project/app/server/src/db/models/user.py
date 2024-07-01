from pydantic import EmailStr, BaseModel
from sqlmodel import Field, SQLModel
from typing import Optional


class UserBase(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: EmailStr = Field(nullable=False, index=True, sa_column_kwargs={"unique": True}, primary_key=True)

class UserCreate(UserBase):
    password: str = Field(nullable=False)

class User(UserBase, table=True):
    password: str = Field(nullable=False)
    __tablename__ = "users"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase, table=False):
    ...