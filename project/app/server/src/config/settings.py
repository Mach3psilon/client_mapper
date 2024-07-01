from typing import Any

from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    VERSION: str = Field("0.0.1")
    PROJECT_NAME: str = Field("Cliend Mapper Backtend")
    DESCRIPTION: str = Field("Client Mapper Backend API")
    DOCS_URL: str = Field("/docs")

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    
    
    DATABASE_URL: str = "sqlite:///db/sqlite.db"


    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()