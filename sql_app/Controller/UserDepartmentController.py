from . import models, schemas
from typing import List
from sqlalchemy.orm import Session

from . import models, schemas

def create_user_department(db: Session, user_department_data: schemas.UserDepartmentCreate):
    db_user_department = models.User_Department(**user_department_data.model_dump())
    print(db_user_department)
    db.add(db_user_department)
    db.commit()
    db.refresh(db_user_department)
    return db_user_department

def get_user_department_by_id(db: Session, user_department_id: int):
    return db.query(models.User_Department).filter(models.User_Department.id == user_department_id).first()

def update_user_department(db: Session, user_department_id: int, user_department_data: schemas.UserDepartmentUpdate):
    db_user_department = db.query(models.User_Department).filter(
        models.User_Department.id == user_department_id).first()

    if db_user_department:
        for key, value in user_department_data.model_dump().items():
            setattr(db_user_department, key, value)

        db.commit()
        db.refresh(db_user_department)
        return db_user_department
    else:
        raise HTTPException(
            status_code=404, detail="User Department not found")

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
