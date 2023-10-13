import os
import smtplib

from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from starlette.responses import HTMLResponse
from email.message import EmailMessage
from dotenv import load_dotenv

from backend.models import UserRequestToManager


load_dotenv()

EMAIL_ADDRESS_FROM = os.environ.get("EMAIL_ADDRESS_FROM")
EMAIL_ADDRESS_TO = os.environ.get("EMAIL_ADDRESS_TO")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

router = APIRouter()

templates = Jinja2Templates(directory="frontend")


@router.get("/", response_class=HTMLResponse)
def get_base_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@router.post("/send-email", tags=["chat-bot"])
async def send_email_to_manager(user_info: UserRequestToManager):
    user_info = dict(user_info)

    options = ', '.join(user_info['options']) if len(user_info['options']) > 0 else "Не выбраны"

    msg = EmailMessage()
    msg['Subject'] = 'Новая заявка!'
    msg['From'] = EMAIL_ADDRESS_FROM
    msg['To'] = EMAIL_ADDRESS_TO
    text = f"Машина: {user_info['car']}\n" \
           f"Опции: {options}\n" \
           f"Цвет: {user_info['color']}\n" \
           f"Тип оплаты: {user_info['payment_type']}\n" \
           f"Как связаться: {user_info['contact_type']}\n\n" \
           f"Номер: {user_info['number']}\n" \
           f"Имя клиента: {user_info['client_name']}"

    msg.set_content(text)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(EMAIL_ADDRESS_FROM, EMAIL_PASSWORD)
        server.send_message(msg)
