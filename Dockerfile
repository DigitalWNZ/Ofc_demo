# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Python backend + serve static files
FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./backend/
COPY search_catalog.py ./
COPY unstructure_data_meta/catalog/ ./unstructure_data_meta/catalog/
COPY unstructure_data/ ./unstructure_data/
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
EXPOSE 8080
ENV GCP_PROJECT="gpu-launchpad-playground"
ENV GCP_LOCATION="us-central1"
ENV ENTRY_GROUP="okf_demo"
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
