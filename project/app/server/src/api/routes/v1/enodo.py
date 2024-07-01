
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from db.session import get_session

from db.crud.enodo import retrieve_enodos_by_filter
from db.models.enodo import EnodoBase, EnodoResponse
from typing import Optional

router = APIRouter(
    prefix="/enodo",
    tags=["enodos"],
)


@router.get(
    "/get_by_filter",
    summary="Retrieve enodos by filter.",
    status_code=status.HTTP_200_OK,
    response_model=EnodoResponse,
)
async def retrieve_enodos_by_filter_route(
    full_address: Optional[str] = Query(None),
    class_description: Optional[str] = Query(None),
    estimated_market_value: Optional[str] = Query(None),
    building_use: Optional[str] = Query(None),
    building_square_feet: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_session),
):
    filter = EnodoBase(
        full_address=full_address,
        class_description=class_description,
        estimated_market_value=estimated_market_value,
        building_use=building_use,
        building_square_feet=building_square_feet,
    )
    return await retrieve_enodos_by_filter(session=db, filter=filter)
