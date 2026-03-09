import os
from sqlalchemy import create_engine, Column, Integer, String, Date, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Database URL from environment variable
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    # Fallback for local development only
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root%401234@localhost:5432/cardiocare"
    print("⚠️ WARNING: DATABASE_URL not set, falling back to localhost.")

# Render provides the database URL, so we create the engine normally
try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
except Exception as e:
    print(f"❌ CRITICAL: Failed to create database engine: {e}")
    raise
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String)
    date = Column(Date)
    symptoms = Column(Text, nullable=True)
    status = Column(String, default="pending")  # pending, confirmed, completed

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
