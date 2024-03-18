from pydantic import BaseModel

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