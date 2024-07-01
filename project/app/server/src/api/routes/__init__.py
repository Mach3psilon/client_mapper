from fastapi import APIRouter

from api.routes.v1.user import router as user_router_v1
from api.routes.v1.enodo import router as enodo_router_v1

router = APIRouter(prefix="/v1",)

router.include_router(user_router_v1)
router.include_router(enodo_router_v1)