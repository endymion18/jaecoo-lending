#!/usr/bin/env bash

cd jaecoo-lending

gunicorn backend.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000