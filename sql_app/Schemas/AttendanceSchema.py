from pydantic import BaseModel

class AttendanceBase(BaseModel):
    date: str


class Attendance(AttendanceBase):
    id: int
    date: str   
    department: Department

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

class AttendanceUser(Attendance):
    user: UserShow