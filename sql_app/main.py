from fastapi import Depends, FastAPI, HTTPException
from fastapi.routing import APIRoute
from sqlalchemy.orm import Session
from typing import List
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



############################################# User #############################################

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(
    user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)
):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return crud.update_user(db, user_id, user_update)

@app.delete("/users/{user_id}", response_model=schemas.DeleteResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return crud.delete_user(db, user_id)


############################################# Attendance #############################################

@app.post("/attendances/", response_model=schemas.Attendance)
def create_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db, attendance)

@app.get("/attendances/", response_model=list[schemas.AttendanceUser])
def read_attendences(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    attendences = crud.get_attendences(db, skip=skip, limit=limit)
    return attendences


@app.get("/attendances/{attendance_id}", response_model=schemas.AttendanceUser)
def read_attendance(attendance_id: int, db: Session = Depends(get_db)):
    attendance = crud.get_attendance_by_id(db, attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return attendance


@app.get("/attendances/{user_id}", response_model=list[schemas.AttendanceUser])
def get_attendances_by_user_id(user_id: int, db: Session = Depends(get_db)):
    attendances = crud.get_attendances_by_user_id(db, user_id)
    if not attendances:
        raise HTTPException(
            status_code=404, detail="No attendances found for the user")
    return attendances

@app.put("/attendances/{attendance_id}", response_model=schemas.Attendance)
def update_attendance(attendance_id: int, attendance_update: schemas.AttendanceUpdate, db: Session = Depends(get_db)):
    attendance = crud.get_attendance_by_id(db, attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    return crud.update_attendance(db, attendance_id, attendance_update.dict(exclude_unset=True))

@app.delete("/attendances/{attendance_id}", response_model=schemas.DeleteResponse)
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    attendance = crud.get_attendance_by_id(db, attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    return crud.delete_attendance(db, attendance_id)


############################################# Departments #############################################

@app.post("/departments/", response_model=schemas.Department)
def create_department(department: schemas.DepartmentCreate, db: Session = Depends(get_db)):
    return crud.create_department(db, department)

@app.get("/departments/", response_model=list[schemas.Department])
def read_departments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    departments = crud.get_departments(db, skip=skip, limit=limit)
    return departments

@app.get("/departments/{department_id}", response_model=schemas.DepartmentUsers)
def read_department(department_id: int, db: Session = Depends(get_db)):
    department = crud.get_department_by_id(db, department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    return department

@app.put("/departments/{department_id}", response_model=schemas.Department)
def update_department(department_id: int, department_update: schemas.DepartmentUpdate, db: Session = Depends(get_db)):
    department = crud.get_department_by_id(db, department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
 
    return crud.update_department(db, department_id, department_update.dict(exclude_unset=True))

@app.delete("/departments/{department_id}", response_model=schemas.DeleteResponse)
def delete_department(department_id: int, db: Session = Depends(get_db)):
    department = crud.get_department_by_id(db, department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    return crud.delete_department(db, department_id)


############################################# User Department #############################################
# Create a user_department association
@app.post("/users/{user_id}/departments/{department_id}")
def create_user_department(user_id: int, department_id: int, db: Session = Depends(get_db)):
    user_department = schemas.UserDepartmentCreate(user_id=user_id, department_id=department_id)
    return crud.create_user_department(db=db, user_department=user_department)

# Read a user_department association
@app.get("/users/{user_id}/departments/", response_model=list[schemas.Department])
def read_user_departments(user_id: int, db: Session = Depends(get_db)):
    user_department = crud.get_departments_for_user(db=db, user_id=user_id)
    print(user_department)
    if user_department is None:
        raise HTTPException(status_code=404, detail="User Department association not found")
    return user_department

# Update a user_department association
@app.put("/users/{user_id}/departments/{department_id}", response_model=schemas.Department)
def update_user_department(user_id: int, department_id: int, user_department: schemas.UserDepartmentUpdate, db: Session = Depends(get_db)):
    updated_user_department = crud.update_user_department_by_ids(db=db, user_id=user_id, department_id=department_id, user_department=user_department)
    if updated_user_department is None:
        raise HTTPException(status_code=404, detail="User Department association not found")
    return updated_user_department

# Delete a user_department association
@app.delete("/users/{user_id}/departments/{department_id}")
def delete_user_department(user_id: int, department_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_user_department(db=db, user_id=user_id, department_id=department_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User Department association not found")
    return {"message": "User Department association deleted successfully"}


############################################# OpertationID #############################################

def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name  # in this case, 'read_items'


use_route_names_as_operation_ids(app)

# @app.post("/user_departments/", response_model=schemas.UserDepartment)
# def create_user_department(user_department: schemas.UserDepartmentCreate, db: Session = Depends(get_db)):
#     return crud.create_user_department(db, user_department)
# @app.get("/user_departments/{user_department_id}", response_model=schemas.UserDepartment)
# def read_user_department(user_department_id: int, db: Session = Depends(get_db)):
#     user_department = crud.get_user_department_by_id(db, user_department_id)
#     if not user_department:
#         raise HTTPException(
#             status_code=404, detail="User Department not found")
#     return user_department

# @app.put("/user_departments/{user_department_id}", response_model=schemas.UserDepartment)
# def update_user_department(user_department_id: int, user_department_update: schemas.UserDepartmentUpdate, db: Session = Depends(get_db)):
#     user_department = crud.get_user_department_by_id(db, user_department_id)
#     if not user_department:
#         raise HTTPException(
#             status_code=404, detail="User Department not found")

#     return crud.update_user_department(db, user_department_id, user_department_update.dict(exclude_unset=True))

# @app.delete("/user_departments/{user_department_id}", response_model=schemas.DeleteResponse)
# def delete_user_department(user_department_id: int, db: Session = Depends(get_db)):
#     user_department = crud.get_user_department_by_id(db, user_department_id)
#     if not user_department:
#         raise HTTPException(
#             status_code=404, detail="User Department not found")

#     return crud.delete_user_department(db, user_department_id)