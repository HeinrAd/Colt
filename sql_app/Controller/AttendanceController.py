from . import models, schemas
from typing import List
from sqlalchemy.orm import Session

from . import models, schemas

def create_attendance(db: Session, attendance_data: schemas.AttendanceCreate):
    db_attendance = models.Attendance(**attendance_data.model_dump())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

def get_attendences(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Attendance).offset(skip).limit(limit).all()


def get_attendance_by_id(db: Session, attendance_id: int):
    return db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()


def get_attendances_by_user_id(db: Session, user_id: int):
    return db.query(models.Attendance).filter(models.Attendance.user_id == user_id).all()

def update_attendance(db: Session, attendance_id: int, attendance_data: schemas.AttendanceUpdate):
    db_attendance = db.query(models.Attendance).filter(
        models.Attendance.id == attendance_id).first()

    if db_attendance:
        for key, value in attendance_data.model_dump().items():
            setattr(db_attendance, key, value)

        db.commit()
        db.refresh(db_attendance)
        return db_attendance
    else:
        raise HTTPException(status_code=404, detail="Attendance not found")

def delete_attendance(db: Session, attendance_id: int):
    db_attendance = db.query(models.Attendance).filter(
        models.Attendance.id == attendance_id).first()

    if db_attendance:
        db.delete(db_attendance)
        db.commit()
        return {"message": "Attendance deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Attendance not found")
