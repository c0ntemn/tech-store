from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Временное "хранилище" в памяти (пока нет БД)
items_db = []


class Item(BaseModel):
    id: int
    name: str
    quantity: int


@app.get("/")
def get_users():
    return [
        {"id": 1, "name": "Алексей", "role": "Админ"},
        {"id": 2, "name": "Мария", "role": "Разработчик"},
        {"id": 3, "name": "Иван", "role": "Дизайнер"},
    ]


@app.post("/butaforia")
def create_item(item: Item):
    # item — это уже провалидированный объект Pydantic
    items_db.append(item.model_dump())
    return {"status": "ok", "item": item}


@app.get("/butaforia")
def get_items():
    return items_db