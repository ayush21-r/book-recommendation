# 🚀 Book Recommendation System — FastAPI Backend

This directory contains the production-ready REST API backend for the Book Recommendation System, built with **FastAPI**, **Uvicorn**, **Supabase**, and **Scikit-Learn**.

---

## 🏛️ Architecture Overview

The backend integrates the data and machine learning layers:

```
                  ┌──────────────────────┐
                  │    React Frontend    │
                  └──────────┬───────────┘
                             │ HTTP Requests
                             ▼
                  ┌──────────────────────┐
                  │   FastAPI Backend    │
                  └───┬──────────────┬───┘
                      │              │
          SQL Queries │              │ Model Artifacts
                      ▼              ▼
           ┌──────────────┐   ┌──────────────┐
           │   Supabase   │   │ ML Model     │
           │  PostgreSQL  │   │ (.pkl files) │
           │ (Book Data)  │   │(Cosine Sim)  │
           └──────────────┘   └──────────────┘
```

* **Supabase PostgreSQL**: Stores the book catalog (4,763 books) and handles pagination, search, and metadata lookups.
* **ML Model Engine**: Serialized Phase 1 artifacts (`tfidf_vectorizer.pkl`, `kmeans_model.pkl`, `book_vectors.pkl`, `books.pkl`) loaded into memory once on startup to perform sub-millisecond cluster-restricted cosine similarity inference.

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application, CORS, lifespan, and health check
│   ├── config.py            # Environment configuration and settings
│   ├── supabase_client.py   # Reusable Supabase client singleton
│   ├── ml_service.py        # ML recommendation engine & artifact loader
│   ├── schemas.py           # Pydantic request/response validation schemas
│   └── routes/
│       ├── __init__.py
│       ├── books.py         # Book catalog and search endpoints
│       └── recommendations.py # Recommendation endpoint
├── requirements.txt         # Backend Python dependencies
├── .env.example             # Environment variable template
└── README.md                # Backend documentation
```

---

## ⚙️ Setup & Installation

### 1. Create a Virtual Environment (Optional)
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` inside `backend/`:
```bash
cp backend/.env.example backend/.env
```

Ensure your `.env` contains valid credentials:
```env
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SECRET_KEY=<your-service-role-or-anon-key>
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
```

---

## ▶️ Running the Server

Start the development server with live reload:

### From Project Root:
```bash
python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

### Or from `backend/` directory:
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be live at `http://localhost:8000`.

---

## 📖 API Documentation & Swagger UI

Interactive OpenAPI Swagger documentation is automatically available at:
* **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc UI**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🌐 API Endpoints Reference

### 1. System Endpoints
* **`GET /api/health`**: Returns system health, database status, and ML model status.

### 2. Book Catalog Endpoints
* **`GET /api/books?page=1&limit=20`**: Paginated book catalog list from Supabase (optional `cluster` filter).
* **`GET /api/books/{book_id}`**: Retrieves a single book by its dataset `book_id`.
* **`GET /api/books/search?q=harry&limit=20`**: Case-insensitive search across book titles and authors.

### 3. Recommendation Endpoints
* **`GET /api/recommend/{book_id}?limit=10`**: Generates top $N$ content-based recommendations for the given `book_id` using cluster-restricted cosine similarity.

---

## 🔒 Security & Best Practices

* **No Secret Exposure**: The `SUPABASE_SECRET_KEY` is only used server-side and is never returned in API payloads.
* **Input Validation**: All query parameters (`limit`, `page`, `book_id`, `q`) are strictly validated using Pydantic models.
* **Error Handling**: Graceful JSON error responses with standard HTTP status codes (200, 404, 422, 500) without exposing stack traces.
