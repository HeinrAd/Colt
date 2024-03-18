from . import models, schemas
from typing import List
from sqlalchemy.orm import Session

from . import models, schemas

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
        for key, value in department_data.model_dump().items():
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
