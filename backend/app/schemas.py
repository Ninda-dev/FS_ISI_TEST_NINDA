from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    is_done: Optional[bool]

class TaskOut(TaskBase):
    id: int
    is_done: bool
    created_at: datetime
    updated_at: datetime
    done_at: Optional[datetime]

    class Config:
        orm_mode = True
