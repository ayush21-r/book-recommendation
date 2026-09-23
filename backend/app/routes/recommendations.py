import logging
from fastapi import APIRouter, HTTPException, Query, Path, status
from app.ml_service import ml_service
from app.schemas import RecommendationResponse, TargetBookSummary, RecommendationItem, ErrorResponse

logger = logging.getLogger("book_api.routes.recommendations")
router = APIRouter(prefix="/recommend", tags=["Recommendations"])


@router.get(
    "/{book_id}",
    response_model=RecommendationResponse,
    summary="Get Book Recommendations",
    description="Generate top N content-based recommendations for a target book using cluster-restricted cosine similarity.",
    responses={
        200: {"description": "Recommendations generated successfully"},
        404: {"model": ErrorResponse, "description": "Target book not found"},
        500: {"model": ErrorResponse, "description": "Recommendation inference error"}
    }
)
async def get_recommendations(
    book_id: int = Path(..., ge=1, description="The unique book_id to base recommendations on"),
    limit: int = Query(10, ge=1, le=50, description="Number of recommendations to return (max 50)")
):
    try:
        target_summary, recs_list = ml_service.recommend_by_book_id(book_id=book_id, limit=limit)

        return RecommendationResponse(
            book=TargetBookSummary(**target_summary),
            total_recommendations=len(recs_list),
            recommendations=[RecommendationItem(**item) for item in recs_list]
        )
    except KeyError as e:
        logger.warning(f"Target book_id {book_id} not found in recommendation catalog.")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book with ID {book_id} was not found in the recommendation catalog."
        )
    except Exception as e:
        logger.error(f"Error generating recommendations for book_id {book_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while generating recommendations."
        )
