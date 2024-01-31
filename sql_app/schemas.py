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
    is_active: bool

    class Config:
        orm_mode = True
