from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


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

    attendances = relationship("Attendance", back_populates="user")
