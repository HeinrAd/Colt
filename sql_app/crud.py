# Adjust the import path based on your project structure
from . import models, schemas
from typing import List
from sqlalchemy.orm import Session

from . import models, schemas


# Create operations
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_attendance(db: Session, attendance_data: schemas.AttendanceCreate):
    db_attendance = models.Attendance(**attendance_data.dict())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


def create_department(db: Session, department_data: schemas.DepartmentCreate):
    db_department = models.Department(**department_data.dict())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department


def create_user_department(db: Session, user_department_data: schemas.UserDepartmentCreate):
    db_user_department = models.User_Department(**user_department_data.dict())
    db.add(db_user_department)
    db.commit()
    db.refresh(db_user_department)
    return db_user_department

# Read operations


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_attendences(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Attendance).offset(skip).limit(limit).all()


def get_attendance_by_id(db: Session, attendance_id: int):
    return db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()


def get_attendances_by_user_id(db: Session, user_id: int):
    return db.query(models.Attendance).filter(models.Attendance.user_id == user_id).all()


def get_department_by_id(db: Session, department_id: int):
    return db.query(models.Department).filter(models.Department.id == department_id).first()


def get_user_department_by_id(db: Session, user_department_id: int):
    return db.query(models.User_Department).filter(models.User_Department.id == user_department_id).first()

# Update operations


def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = db.query(models.User).filter(
        models.User.id == user_id).first()

    if db_user:
        for field, value in user_update.dict().items():
            setattr(db_user, field, value)

        db.commit()
        db.refresh(db_user)
        return db_user
    else:
        raise HTTPException(status_code=404, detail="User not found")


def update_attendance(db: Session, attendance_id: int, attendance_data: schemas.AttendanceUpdate):
    db_attendance = db.query(models.Attendance).filter(
        models.Attendance.id == attendance_id).first()

    if db_attendance:
        for key, value in attendance_data.dict().items():
            setattr(db_attendance, key, value)

        db.commit()
        db.refresh(db_attendance)
        return db_attendance
    else:
        raise HTTPException(status_code=404, detail="Attendance not found")


def update_department(db: Session, department_id: int, department_data: schemas.DepartmentUpdate):
    db_department = db.query(models.Department).filter(
        models.Department.id == department_id).first()

    if db_department:
        for key, value in department_data.dict().items():
            setattr(db_department, key, value)

        db.commit()
        db.refresh(db_department)
        return db_department
    else:
        raise HTTPException(status_code=404, detail="Department not found")


def update_user_department(db: Session, user_department_id: int, user_department_data: schemas.UserDepartmentUpdate):
    db_user_department = db.query(models.User_Department).filter(
        models.User_Department.id == user_department_id).first()

    if db_user_department:
        for key, value in user_department_data.dict().items():
            setattr(db_user_department, key, value)

        db.commit()
        db.refresh(db_user_department)
        return db_user_department
    else:
        raise HTTPException(
            status_code=404, detail="User Department not found")

# Delete operations


def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(
        models.User.id == user_id).first()

    if db_user:
        db.delete(db_user)
        db.commit()
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


def delete_attendance(db: Session, attendance_id: int):
    db_attendance = db.query(models.Attendance).filter(
        models.Attendance.id == attendance_id).first()

    if db_attendance:
        db.delete(db_attendance)
        db.commit()
        return {"message": "Attendance deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Attendance not found")


def delete_department(db: Session, department_id: int):
    db_department = db.query(models.Department).filter(
        models.Department.id == department_id).first()

    if db_department:
        db.delete(db_department)
        db.commit()
        return {"message": "Department deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Department not found")


def delete_user_department(db: Session, user_department_id: int):
    db_user_department = db.query(models.User_Department).filter(
        models.User_Department.id == user_department_id).first()

    if db_user_department:
        db.delete(db_user_department)
        db.commit()
        return {"message": "User Department deleted successfully"}
    else:
        raise HTTPException(
            status_code=404, detail="User Department not found")
