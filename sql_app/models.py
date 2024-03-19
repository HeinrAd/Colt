from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .database import Base

user_departments = Table(
    'user_departments', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('department_id', Integer, ForeignKey('departments.id'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    birthday = Column(String, nullable=False)
    street = Column(String)
    house_number = Column(Integer)
    postcode = Column(Integer)
    city = Column(String)
    can_buy = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

    departments = relationship("Department", secondary=user_departments, back_populates="users")
    attendances = relationship("Attendance", back_populates="user")


class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(String, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department")
    user = relationship("User", back_populates="attendances")

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    price = Column(Integer, nullable=False)

    users = relationship("User", secondary=user_departments, back_populates="departments")

# class User_Department(Base):
#     __tablename__ = "user_departments"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     department_id = Column(Integer, ForeignKey("departments.id"))

#     department = relationship("Department")