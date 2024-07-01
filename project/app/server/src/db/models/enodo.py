from sqlmodel import Field, SQLModel
from pydantic import BaseModel
from typing import Optional


class EnodoBase(SQLModel):
    full_address: Optional[str] = None
    class_description: Optional[str] = None
    estimated_market_value: Optional[str] = None
    building_use: Optional[str] = None
    building_square_feet: Optional[str] = None


class Enodo(EnodoBase, table=True):
    id: int = Field(default=None, primary_key=True)
    __tablename__ = "enodo"


class EnodoResponseItem(EnodoBase, table=False):
    id: int = None

class EnodoResponse(BaseModel):
    enodo_entities: list[EnodoResponseItem] = []
    enodo_entities_count: int = 0
