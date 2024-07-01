from pydantic import BaseModel

class Enodo(BaseModel):
    id: int = None
    full_address: str = None
    class_description: str = None
    estimated_market_value: float = None
    building_use: str = None
    building_square_feet: float = None


class EnodoResponse(Enodo, table=False):
    enodo_entities: list[Enodo] = []
    enodo_entities_count: int = 0

