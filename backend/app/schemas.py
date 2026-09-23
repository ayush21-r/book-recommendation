from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class BookBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    book_id: int = Field(..., description="Unique dataset book ID")
    title: str = Field(..., description="Book title")
    authors: str = Field(..., description="Author(s) name(s)")
    original_publication_year: Optional[int] = Field(None, description="Year of original publication")
    language_code: Optional[str] = Field(None, description="Language code (e.g., 'eng')")
    average_rating: float = Field(0.0, description="Average GoodReads rating (1.0 to 5.0)")
    image_url: Optional[str] = Field(None, description="Cover image URL")
    description: Optional[str] = Field(None, description="Book synopsis / description")
    cluster: int = Field(..., description="Assigned K-Means topic cluster ID (0-14)")


class BookDetail(BookBase):
    id: Optional[int] = Field(None, description="Database primary key")


class BookListResponse(BaseModel):
    total: int = Field(..., description="Total number of books matching query")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total pages available")
    items: List[BookBase] = Field(..., description="List of books")


class RecommendationItem(BookBase):
    similarity_score: float = Field(..., description="Cosine similarity score relative to query book (0.0 to 1.0)")


class TargetBookSummary(BaseModel):
    book_id: int = Field(..., description="Input book ID")
    title: str = Field(..., description="Input book title")
    authors: Optional[str] = Field(None, description="Author(s)")
    average_rating: Optional[float] = Field(None, description="Average rating")
    image_url: Optional[str] = Field(None, description="Cover image URL")
    cluster: Optional[int] = Field(None, description="Assigned topic cluster")


class RecommendationResponse(BaseModel):
    book: TargetBookSummary = Field(..., description="Target query book metadata")
    total_recommendations: int = Field(..., description="Number of recommendations returned")
    recommendations: List[RecommendationItem] = Field(..., description="Ranked list of top recommendations")


class HealthResponse(BaseModel):
    status: str = Field("ok", description="Service health status")
    version: str = Field("1.0.0", description="API version")
    database: str = Field("connected", description="Database connection status")
    ml_model: str = Field("loaded", description="ML model status")


class ErrorResponse(BaseModel):
    detail: str = Field(..., description="Error message description")
