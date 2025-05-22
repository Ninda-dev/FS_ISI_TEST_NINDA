from fastapi import FastAPI
from .database import Base, engine
from .routes import tasks
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"
        # "http://localhost:5173",
        # "http://127.0.0.1:5173",
        # "http://todo_frontend:5173"
    ],
    allow_credentials=False, 
    # jika allow_credentials true maka wildcard origin tidak bisa digunakan
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
