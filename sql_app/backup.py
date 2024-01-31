
attendences = relationship("Attendance", back_populates="owner")
departments = relationship("Department", back_populates="owner")


class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    month = Column(Integer, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))

    owner = relationship("User", back_populates="attendances")


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)


class User_Department(Base):
    __tablename__ = "user_departments"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    department_id = Column(Integer, ForeignKey("departments.id"))

    owner = relationship("User", back_populates="departments")


class DepartmentBase(BaseModel):
    title: str
    description: str | None = None


class Department(DepartmentBase):
    id: int

    class Config:
        orm_mode = True


class AttendanceBase(BaseModel):
    date: str
    month: int


class Attendace(AttendanceBase):
    id: int
    user_id: int
    department_id: int

    class Config:
        orm_mode = True
