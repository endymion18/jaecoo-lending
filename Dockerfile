FROM python:3.10

RUN mkdir /jaecoo_lending_app

WORKDIR /jaecoo_lending_app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

