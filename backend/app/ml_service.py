import os
import logging
from typing import Dict, Any, List, Optional, Tuple
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from app.config import settings

logger = logging.getLogger("book_api.ml_service")


class MLRecommendationService:
    """
    ML Service for managing trained recommendation models and executing
    cluster-restricted cosine similarity inference.
    """

    def __init__(self):
        self.is_ready: bool = False
        self.df_books: Optional[pd.DataFrame] = None
        self.tfidf_matrix: Optional[Any] = None
        self.tfidf_vectorizer: Optional[Any] = None
        self.kmeans_model: Optional[Any] = None
        self._book_id_to_index: Dict[int, int] = {}
        self._cluster_to_indices: Dict[int, List[int]] = {}

    def load_models(self) -> None:
        """Loads all serialized Phase 1 ML model artifacts into memory once on startup."""
        model_dir = settings.MODEL_DIR
        logger.info(f"Loading ML model artifacts from: {model_dir}")

        books_path = os.path.join(model_dir, "books.pkl")
        vectors_path = os.path.join(model_dir, "book_vectors.pkl")
        tfidf_path = os.path.join(model_dir, "tfidf_vectorizer.pkl")
        kmeans_path = os.path.join(model_dir, "kmeans_model.pkl")

        missing = [p for p in [books_path, vectors_path, tfidf_path, kmeans_path] if not os.path.exists(p)]
        if missing:
            raise FileNotFoundError(f"Missing required ML model artifacts: {missing}")

        try:
            self.df_books = joblib.load(books_path)
            self.tfidf_matrix = joblib.load(vectors_path)
            self.tfidf_vectorizer = joblib.load(tfidf_path)
            self.kmeans_model = joblib.load(kmeans_path)

            # Build fast lookup indexes
            self._book_id_to_index = {
                int(book_id): idx for idx, book_id in enumerate(self.df_books['book_id'])
            }

            # Map clusters to indices
            self._cluster_to_indices = {}
            for idx, cluster_id in enumerate(self.df_books['cluster']):
                cid = int(cluster_id)
                if cid not in self._cluster_to_indices:
                    self._cluster_to_indices[cid] = []
                self._cluster_to_indices[cid].append(idx)

            self.is_ready = True
            logger.info(f"ML Recommendation Engine initialized successfully! Loaded {len(self.df_books):,} books across {len(self._cluster_to_indices)} clusters.")
        except Exception as e:
            self.is_ready = False
            logger.error(f"Failed to load ML models: {e}")
            raise RuntimeError(f"Error loading recommendation models: {e}")

    def get_book_by_id(self, book_id: int) -> Optional[Dict[str, Any]]:
        """Retrieves raw book metadata by book_id from model dataframe."""
        if not self.is_ready or self.df_books is None:
            return None
        idx = self._book_id_to_index.get(book_id)
        if idx is None:
            return None
        row = self.df_books.iloc[idx]
        return self._format_book_dict(row)

    def recommend_by_book_id(
        self, book_id: int, limit: int = 10
    ) -> Tuple[Dict[str, Any], List[Dict[str, Any]]]:
        """
        Executes cluster-restricted cosine similarity recommendation for a given book_id.

        Returns:
            Tuple of (target_book_summary, list_of_recommended_book_dicts)
        """
        if not self.is_ready or self.df_books is None or self.tfidf_matrix is None:
            raise RuntimeError("ML model is not loaded yet.")

        target_idx = self._book_id_to_index.get(book_id)
        if target_idx is None:
            raise KeyError(f"Book with ID {book_id} was not found in the ML catalog.")

        target_row = self.df_books.iloc[target_idx]
        target_cluster = int(target_row['cluster'])

        # Filter candidate indices strictly within the same cluster
        cluster_indices = self._cluster_to_indices.get(target_cluster, [])
        if not cluster_indices:
            return self._format_book_dict(target_row), []

        # Extract TF-IDF vectors
        target_vec = self.tfidf_matrix[target_idx]
        cluster_vecs = self.tfidf_matrix[cluster_indices]

        # Compute cosine similarity
        similarities = cosine_similarity(target_vec, cluster_vecs).flatten()

        # Build scored candidate list
        scored_candidates = []
        for c_idx, sim_score in zip(cluster_indices, similarities):
            if c_idx == target_idx:
                continue  # Exclude target book itself

            row = self.df_books.iloc[c_idx]
            book_item = self._format_book_dict(row)
            book_item['similarity_score'] = round(float(sim_score), 4)
            scored_candidates.append(book_item)

        # Sort descending by similarity score
        scored_candidates.sort(key=lambda x: x['similarity_score'], reverse=True)
        recommendations = scored_candidates[:limit]

        target_summary = {
            'book_id': int(target_row['book_id']),
            'title': str(target_row['title']),
            'authors': str(target_row['authors']),
            'average_rating': float(target_row['average_rating']),
            'image_url': str(target_row.get('image_url', '')),
            'cluster': target_cluster
        }

        return target_summary, recommendations

    def _format_book_dict(self, row: pd.Series) -> Dict[str, Any]:
        """Helper to format a DataFrame row into a clean dictionary."""
        pub_year = row.get('original_publication_year')
        year_val = None
        if pd.notna(pub_year) and not np.isnan(pub_year):
            try:
                year_val = int(pub_year)
            except (ValueError, TypeError):
                year_val = None

        rating_val = 0.0
        r = row.get('average_rating')
        if pd.notna(r) and not np.isnan(r):
            try:
                rating_val = round(float(r), 2)
            except (ValueError, TypeError):
                rating_val = 0.0

        return {
            'book_id': int(row['book_id']),
            'title': str(row['title']).strip(),
            'authors': str(row['authors']).strip(),
            'original_publication_year': year_val,
            'language_code': str(row.get('language_code', 'eng')).strip() if pd.notna(row.get('language_code')) else 'eng',
            'average_rating': rating_val,
            'image_url': str(row.get('image_url', '')).strip() if pd.notna(row.get('image_url')) else None,
            'description': str(row.get('description', '')).strip() if pd.notna(row.get('description')) else None,
            'cluster': int(row['cluster'])
        }


# Singleton service instance
ml_service = MLRecommendationService()
