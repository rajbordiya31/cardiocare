from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from pydantic import BaseModel

import database, auth
from database import get_db, Appointment, AdminUser
import os

# Initialize Database
database.init_db()

app = FastAPI(title="CardioCare API")

# CORS Setup
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000,https://drnarendrabordiya.netlify.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "CardioCare API is running"}

# Pydantic Schemas
class AppointmentBase(BaseModel):
    name: str
    phone: str
    date: date
    symptoms: str = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    status: str

class AppointmentOut(AppointmentBase):
    id: int
    status: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# --- PUBLIC ENDPOINTS ---

@app.post("/appointments", response_model=AppointmentOut)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

# --- ADMIN ENDPOINTS ---

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    from sqlalchemy import func
    # Case-insensitive search: compare lower-case username from input with lower-case username in DB
    user = db.query(AdminUser).filter(func.lower(AdminUser.username) == form_data.username.lower()).first()
    
    if not user:
        print(f"⚠️ Login failed: User '{form_data.username}' not found.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not auth.verify_password(form_data.password, user.hashed_password):
        print(f"⚠️ Login failed: Password mismatch for user '{user.username}'.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/appointments", response_model=List[AppointmentOut])
def read_appointments(db: Session = Depends(get_db), current_user: AdminUser = Depends(auth.get_current_user)):
    return db.query(Appointment).all()

@app.patch("/appointments/{appointment_id}", response_model=AppointmentOut)
def update_appointment_status(appointment_id: int, update: AppointmentUpdate, db: Session = Depends(get_db), current_user: AdminUser = Depends(auth.get_current_user)):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    db_appointment.status = update.status
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.delete("/appointments/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db), current_user: AdminUser = Depends(auth.get_current_user)):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    db.delete(db_appointment)
    db.commit()
    return {"detail": "Appointment deleted"}

class AdminSetup(BaseModel):
    username: str
    password: str

# --- UTILITY ENDPOINT (To create first admin) ---
@app.post("/setup-admin", status_code=201)
def setup_admin(admin: AdminSetup, db: Session = Depends(get_db)):
    # Convert username to lowercase for consistency
    username_lower = admin.username.lower()
    
    # Check if any admin exists
    if db.query(AdminUser).first():
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    hashed_pw = auth.get_password_hash(admin.password)
    new_admin = AdminUser(username=username_lower, hashed_password=hashed_pw)
    db.add(new_admin)
    db.commit()
    return {"detail": f"Admin {username_lower} created"}
