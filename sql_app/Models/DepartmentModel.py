from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    price = Column(Integer, nullable=False)

    users = relationship("user_departments", )