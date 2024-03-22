from pydantic import BaseModel
from datetime import date, datetime, time, timedelta
from typing import Optional

class DepartmentBase(BaseModel):
    title: str
    description: str
    price: int


class Department(DepartmentBase):
    id: int
    title: str
    description: str
    price: int

    class Config:
        orm_mode = True


class DepartmentCreate(DepartmentBase):
    title: str
    description: str
    price: int


class DepartmentUpdate(DepartmentBase):
    title: str
    description: str
    price: int


class DepartmentDelete(DepartmentBase):
    id: int


class AttendanceBase(BaseModel):
    date: datetime


class Attendance(AttendanceBase):
    id: int
    date: datetime   
    department: Department

    class Config:
        orm_mode = True


class AttendanceCreate(AttendanceBase):
    user_id: int
    date: datetime
    department_id: int


class AttendanceUpdate(AttendanceBase):
    id: int
    date: datetime
    department_id: int


class AttendanceDelete(AttendanceBase):
    id: int


class UserDepartmentBase(BaseModel):
    user_id: int
    department_id: int


class UserDepartment(UserDepartmentBase):
    id: int

    class Config:
        orm_mode = True


class UserDepartmentCreate(UserDepartmentBase):
    user_id: int
    department_id: int


class UserDepartmentUpdate(UserDepartmentBase):
    user_id: int
    department_id: int


class UserDepartmentDelete(UserDepartmentBase):
    id: int

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    first_name: str
    last_name: str
    birthday: datetime
    street: str
    house_number: int
    postcode: int
    city: str

class User(UserBase):
    id: int
    first_name: str
    last_name: str
    birthday: datetime
    street: str
    house_number: int
    postcode: int
    city: str
    is_active: bool
    can_buy: bool
    attendances: list[Attendance]
    departments: Optional[list[Department]]

    class Config:
        orm_mode = True

class UserShow(UserBase):
    id: int
    first_name: str
    last_name: str

class UserDelete(UserBase):
    id: int

class DeleteResponse(BaseModel):
    message: str

class UserUpdate(UserBase):
    email: str
    first_name: str
    last_name: str
    birthday: datetime
    street: str
    house_number: int
    postcode: int
    city: str

class DepartmentUsers(Department):
    users: list[UserShow]

class AttendanceUser(Attendance):
    user: UserShow

class UserDepartmentShow(UserDepartment):
    user: UserShow
    department: Department