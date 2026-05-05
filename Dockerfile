FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# System deps
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Install dependencies first (cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Fixed internal port
ENV APP_PORT=9050

EXPOSE 9050

# Run FastAPI
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 9050"]