from fastapi import FastAPI

import sys
import os

# Add the project root to the PYTHONPATH
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from api.routes import router as api_router
from config.settings import settings
from db.utils import create_db_and_tables
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


def get_application():
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        docs_url=settings.DOCS_URL,
    )

    # Configure CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allows all origins
        allow_credentials=True,
        allow_methods=["*"],  # Allows all methods
        allow_headers=["*"],  # Allows all headers
    )

    app.include_router(api_router, prefix="/api")
    return app


app = get_application()

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()


@app.get("/", tags=["healthcheck"])
async def health():
    return dict(
        name=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        status="OK",
        message="Visit /docs for more information.",
    )

if __name__ == "__main__":
    
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)