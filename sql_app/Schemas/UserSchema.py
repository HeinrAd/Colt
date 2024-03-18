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
    can_buy: bool
    attendances: list[Attendance]

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
    birthday: str
    street: str
    house_number: int
    postcode: int
    city: str