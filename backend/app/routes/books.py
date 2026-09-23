import math
import logging
from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Path, status
from app.supabase_client import get_supabase
from app.schemas import BookBase, BookDetail, BookListResponse, ErrorResponse

logger = logging.getLogger("book_api.routes.books")
router = APIRouter(prefix="/books", tags=["Books"])


@router.get(
    "",
    response_model=BookListResponse,
    summary="Get Paginated Books",
    description="Retrieve a paginated list of books from Supabase with optional cluster filtering.",
    responses={
        200: {"description": "Paginated list of books returned successfully"},
        500: {"model": ErrorResponse, "description": "Database query error"}
    }
)
async def get_books(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    limit: int = Query(20, ge=1, le=100, description="Number of books per page (max 100)"),
    cluster: Optional[int] = Query(None, ge=0, le=14, description="Optional cluster ID filter (0-14)")
):
    try:
        supabase = get_supabase()
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit - 1

        query = supabase.table("books").select(
            "book_id, title, authors, original_publication_year, language_code, average_rating, image_url, description, cluster",
            count="exact"
        )

        if cluster is not None:
            query = query.eq("cluster", cluster)

        query = query.order("id", desc=False).range(start_idx, end_idx)
        response = query.execute()

        total = response.count if response.count is not None else 0
        total_pages = math.ceil(total / limit) if total > 0 else 0

        items_data = response.data if response and response.data else []

        return BookListResponse(
            total=total,
            page=page,
            limit=limit,
            total_pages=total_pages,
            items=[BookBase(**item) for item in items_data]
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching books list: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve books catalog from database."
        )


@router.get(
    "/search",
    response_model=BookListResponse,
    summary="Search Books",
    description="Search for books by title or author substring (case-insensitive) using Supabase.",
    responses={
        200: {"description": "Matching books returned successfully"},
        422: {"model": ErrorResponse, "description": "Invalid query parameters"},
        500: {"model": ErrorResponse, "description": "Search query failure"}
    }
)
async def search_books(
    q: str = Query(..., min_length=1, max_length=100, description="Search term for book title or author"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Max results to return (max 100)")
):
    search_term = q.strip()
    if not search_term:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Search query 'q' must not be empty or whitespace only."
        )

    try:
        supabase = get_supabase()
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit - 1

        # Search across title or authors using Supabase ILIKE
        filter_str = f"title.ilike.%{search_term}%,authors.ilike.%{search_term}%"
        query = supabase.table("books").select(
            "book_id, title, authors, original_publication_year, language_code, average_rating, image_url, description, cluster",
            count="exact"
        ).or_(filter_str).order("average_rating", desc=True).range(start_idx, end_idx)

        response = query.execute()
        total = response.count if response.count is not None else 0
        total_pages = math.ceil(total / limit) if total > 0 else 0

        items_data = response.data if response and response.data else []

        return BookListResponse(
            total=total,
            page=page,
            limit=limit,
            total_pages=total_pages,
            items=[BookBase(**item) for item in items_data]
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching books with query '{search_term}': {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing book search query."
        )


@router.get(
    "/{book_id}",
    response_model=BookDetail,
    summary="Get Book by ID",
    description="Retrieve full metadata for a single book by its original dataset book_id.",
    responses={
        200: {"description": "Book details retrieved successfully"},
        404: {"model": ErrorResponse, "description": "Book not found"},
        500: {"model": ErrorResponse, "description": "Database query error"}
    }
)
async def get_book_by_id(
    book_id: int = Path(..., ge=1, description="The unique book_id")
):
    try:
        supabase = get_supabase()
        response = supabase.table("books").select(
            "id, book_id, title, authors, original_publication_year, language_code, average_rating, image_url, description, cluster"
        ).eq("book_id", book_id).limit(1).execute()

        if not response or not response.data or len(response.data) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Book with ID {book_id} was not found in the catalog."
            )

        return BookDetail(**response.data[0])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving book_id {book_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve book details for ID {book_id}."
        )
