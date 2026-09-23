import sys
import os
import logging
from contextlib import asynccontextmanager

# Add backend directory to sys.path to support execution from root directory
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.supabase_client import get_supabase
from app.ml_service import ml_service
from app.schemas import HealthResponse, ErrorResponse
from app.routes.books import router as books_router
from app.routes.recommendations import router as recommendations_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("book_api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context to initialize ML models and verify connections on startup."""
    logger.info("Initializing Book Recommendation Backend Service...")

    # 1. Load ML Model Artifacts
    try:
        ml_service.load_models()
        logger.info("ML Models loaded and ready for inference.")
    except Exception as e:
        logger.error(f"Critical: Failed to load ML model artifacts: {e}")

    # 2. Test Supabase Connection
    try:
        supabase = get_supabase()
        res = supabase.table("books").select("id", count="exact").limit(1).execute()
        count = res.count if res.count is not None else "connected"
        logger.info(f"Supabase connection verified (Books count: {count}).")
    except Exception as e:
        logger.warning(f"Supabase connection warning: {e}")

    yield
    logger.info("Shutting down Book Recommendation Backend Service.")


# Initialize FastAPI app
app = FastAPI(
    title="Book Recommendation API",
    description=(
        "Production-ready backend API for the Book Recommendation System. "
        "Provides book catalog browsing, Supabase database search, and real-time "
        "content-based recommendations powered by TF-IDF & K-Means clustering."
    ),
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Mount API Routers under /api
app.include_router(books_router, prefix=settings.API_PREFIX)
app.include_router(recommendations_router, prefix=settings.API_PREFIX)


@app.get(
    "/api/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Health Check",
    description="Check API service availability, database status, and ML model loading state."
)
async def health_check():
    db_status = "connected"
    try:
        supabase = get_supabase()
        supabase.table("books").select("id").limit(1).execute()
    except Exception:
        db_status = "error"

    ml_status = "loaded" if ml_service.is_ready else "not_loaded"

    return HealthResponse(
        status="ok" if db_status == "connected" and ml_status == "loaded" else "degraded",
        version=settings.VERSION,
        database=db_status,
        ml_model=ml_status
    )


@app.get(
    "/",
    include_in_schema=False
)
async def root():
    return {
        "message": "Welcome to the Book Recommendation API",
        "documentation": "/docs",
        "health": "/api/health"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred."}
    )
