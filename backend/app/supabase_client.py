import logging
from typing import Optional
from supabase import create_client, Client
from app.config import settings

logger = logging.getLogger("book_api.supabase")

_supabase_client: Optional[Client] = None


def get_supabase() -> Client:
    """
    Returns a singleton instance of the Supabase Client.
    Initializes on first call.
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    if not settings.SUPABASE_URL or not settings.SUPABASE_SECRET_KEY:
        error_msg = "Supabase credentials are not configured in environment variables (SUPABASE_URL, SUPABASE_SECRET_KEY)."
        logger.error(error_msg)
        raise RuntimeError(error_msg)

    try:
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SECRET_KEY)
        logger.info("Supabase client initialized successfully.")
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        raise RuntimeError(f"Could not connect to Supabase: {e}")
