from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_tasks(db: Session, is_done: bool):
    order = models.Task.created_at.asc() if not is_done else models.Task.done_at.desc()
    return db.query(models.Task).filter(models.Task.is_done == is_done).order_by(order).all()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, data: schemas.TaskUpdate):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(task, key, value)
    task.updated_at = datetime.utcnow()
    if data.is_done and not task.done_at:
        task.done_at = datetime.utcnow()
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task
