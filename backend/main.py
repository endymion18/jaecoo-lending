import os
import smtplib

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from email.message import EmailMessage

from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles

from backend.models import UserRequestToManager

load_dotenv()

EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

templates = Jinja2Templates(directory="frontend")

origins = [
    "http://localhost:3000",
    "http://localhost",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/", response_class=HTMLResponse)
def get_base_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/send-email", tags=["chat-bot"])
async def send_email_to_manager(user_info: UserRequestToManager):
    user_info = dict(user_info)

    options = ', '.join(user_info['options']) if len(user_info['options']) > 0 else "Не выбраны"

    msg = EmailMessage()
    msg['Subject'] = 'Новая заявка!'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    text = f"Машина: {user_info['car']}\n" \
           f"Опции: {options}\n" \
           f"Цвет: {user_info['color']}\n" \
           f"Тип оплаты: {user_info['payment_type']}\n" \
           f"Как связаться: {user_info['contact_type']}\n\n" \
           f"Номер: {user_info['number']}\n" \
           f"Имя клиента: {user_info['client_name']}"

    msg.set_content(text)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
