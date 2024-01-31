from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    first_name: str
    last_name: str
    birthday: str
    street: str
    house_number: int
    postcode: int
    city: str


class User(UserBase):
    id: int
    first_name: str
    last_name: str
    birthday: str
    street: str
    house_number: int
    postcode: int
    city: str
    is_active: bool

    class Config:
        orm_mode = True


class UserDelete(UserBase):
    id: int


class DeleteResponse(BaseModel):
    message: str


class UserUpdate(UserBase):
    email: str
    first_name: str
    last_name: str
    birthday: str
    street: str
    house_number: int
    postcode: int
    city: str


class DepartmentBase(BaseModel):
    title: str
    description: str


class Department(DepartmentBase):
    id: int
    title: str
    description: str

    class Config:
        orm_mode = True


class DepartmentCreate(DepartmentBase):
    title: str
    description: str


class DepartmentUpdate(DepartmentBase):
    title: str
    description: str


class DepartmentDelete(DepartmentBase):
    id: int


class AttendanceBase(BaseModel):
    user_id: int
    date: str
    month: str
    department_id: int


class Attendance(AttendanceBase):
    id: int
    user_id: int
    date: str
    month: str
    department_id: int

    class Config:
        orm_mode = True


class AttendanceCreate(AttendanceBase):
    user_id: int
    date: str
    month: str
    department_id: int


class AttendanceUpdate(AttendanceBase):
    date: str
    month: str
    department_id: int


class AttendanceDelete(AttendanceBase):
    id: int


class UserDepartmentBase(BaseModel):
    user_id: int
    department_id: int


class UserDepartment(UserDepartmentBase):
    id: int
    user_id: int
    department_id: int

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
