import os
import smtplib

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from email.mime.text import MIMEText
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
    allow_methods=["GET"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)


@app.get("/")
def get_base_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/send-email", tags=["chat-bot"])
async def send_email_to_manager(user_info: UserRequestToManager):
    pass
