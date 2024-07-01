from sqlmodel import SQLModel
from db.session import engine

async def create_db_and_tables():
    # Drop existing tables
    # SQLModel.metadata.drop_all(engine)

    # Create tables based on current models
    SQLModel.metadata.create_all(engine)
    
