from sqlmodel import select
from sqlalchemy.orm import selectinload

from db.models.enodo import EnodoBase, EnodoResponse, Enodo

async def retrieve_enodos_by_filter(session, filter: EnodoBase) -> EnodoResponse:
    # Building the filter conditions
    conditions = []

    if filter.full_address is not None:
        conditions.append(Enodo.full_address.like(f"%{filter.full_address}%"))

    if filter.class_description is not None:
        conditions.append(Enodo.class_description.like(f"%{filter.class_description}%"))
  
    if filter.estimated_market_value is not None:
        conditions.append(Enodo.estimated_market_value.like(f"%{filter.estimated_market_value}%"))

    if filter.building_use is not None:
        conditions.append(Enodo.building_use.like(f"%{filter.building_use}%"))
        
    if filter.building_square_feet is not None:
        conditions.append(Enodo.building_square_feet.like(f"%{filter.building_square_feet}%"))
        
    # Executing the query
    stmt = select(Enodo).options(selectinload('*')).where(*conditions).limit(6)
    result = session.execute(stmt)
    enodos = result.scalars().all()
    enodos_count = len(enodos)

    return EnodoResponse(enodo_entities=enodos, enodo_entities_count=enodos_count)

