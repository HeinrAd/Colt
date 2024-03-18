from pydantic import BaseModel

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

class DepartmentUsers(Department):
    users: list[UserShow]