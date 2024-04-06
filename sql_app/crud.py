# Adjust the import path based on your project structure
from . import models, schemas
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select, delete

from . import models, schemas

############################################# User #############################################    

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = db.query(models.User).filter(
        models.User.id == user_id).first()

    if db_user:
        for field, value in user_update.model_dump().items():
            setattr(db_user, field, value)

        db.commit()
        db.refresh(db_user)
        return db_user
    else:
        raise HTTPException(status_code=404, detail="User not found")

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(
        models.User.id == user_id).first()

    if db_user:
        db.delete(db_user)
        db.commit()
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


############################################# Attendance #############################################

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
        for key, value in attendance_data.items():
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


############################################# Department #############################################

def create_department(db: Session, department_data: schemas.DepartmentCreate):
    db_department = models.Department(**department_data.model_dump())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

def get_departments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Department).offset(skip).limit(limit).all()

def get_department_by_id(db: Session, department_id: int):
    return db.query(models.Department).filter(models.Department.id == department_id).first()

def update_department(db: Session, department_id: int, department_data: schemas.DepartmentUpdate):
    db_department = db.query(models.Department).filter(
        models.Department.id == department_id).first()

    if db_department:
        for key, value in department_data.items():
            setattr(db_department, key, value)

        db.commit()
        db.refresh(db_department)
        return db_department
    else:
        raise HTTPException(status_code=404, detail="Department not found")

def delete_department(db: Session, department_id: int):
    db_department = db.query(models.Department).filter(
        models.Department.id == department_id).first()

    if db_department:
        db.delete(db_department)
        db.commit()
        return {"message": "Department deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Department not found")
    

############################################# User Department #############################################

def create_user_department(db: Session, user_department: schemas.UserDepartmentCreate):
    if user_department:
        user_id = user_department.user_id
        department_id = user_department.department_id
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        department = db.query(models.Department).filter(models.Department.id == department_id).first()
        if department:
            stmt = models.user_departments.insert().values(user_id=user_id, department_id=department_id)
            db.execute(stmt)
            db.commit()
            return user.departments

def get_departments_for_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user.departments

def update_user_department(db: Session, user_id: int, department_id: int, user_department_update: schemas.UserDepartmentUpdate):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        department = db.query(models.Department).filter(models.Department.id == department_id).first()
        if department:
            stmt = select([models.user_departments]).where(models.user_departments.c.user_id == user_id).where(models.user_departments.c.department_id == department_id)
            result = db.execute(stmt).first()
            if result:
                update_stmt = (
                    models.user_departments.update()
                    .where(models.user_departments.c.user_id == user_id)
                    .where(models.user_departments.c.department_id == department_id)
                    .values(**user_department_update.dict())
                )
                db.execute(update_stmt)
                db.commit()
                return user.departments
    return False

def delete_user_department(db: Session, user_id: int, department_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        department = db.query(models.Department).filter(models.Department.id == department_id).first()
        if department:
            stmt = delete(models.user_departments).where(models.user_departments.c.user_id == user_id).where(models.user_departments.c.department_id == department_id)
            result = db.execute(stmt)
            db.commit()
            return {"message": "User Department deleted successfully"}
        else:
            raise HTTPException(
                status_code=404, detail="User Department not found")


# def create_user_department(db: Session, user_department_data: schemas.UserDepartmentCreate):
#     db_user_department = models.User_Department(**user_department_data.model_dump())
#     print(db_user_department)
#     db.add(db_user_department)
#     db.commit()
#     db.refresh(db_user_department)
#     return db_user_department



# def get_user_department_by_id(db: Session, user_department_id: int):
#     return db.query(models.User_Department).filter(models.User_Department.id == user_department_id).first()

# def update_user_department(db: Session, user_department_id: int, user_department_data: schemas.UserDepartmentUpdate):
#     db_user_department = db.query(models.User_Department).filter(
#         models.User_Department.id == user_department_id).first()

#     if db_user_department:
#         for key, value in user_department_data.model_dump().items():
#             setattr(db_user_department, key, value)

#         db.commit()
#         db.refresh(db_user_department)
#         return db_user_department
#     else:
#         raise HTTPException(
#             status_code=404, detail="User Department not found")

# def delete_user_department(db: Session, user_department_id: int):
#     db_user_department = db.query(models.User_Department).filter(
#         models.User_Department.id == user_department_id).first()

#     if db_user_department:
#         db.delete(db_user_department)
#         db.commit()
#         return {"message": "User Department deleted successfully"}
#     else:
#         raise HTTPException(
#             status_code=404, detail="User Department not found")
