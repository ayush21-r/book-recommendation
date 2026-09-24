/**
 * API Service for Folio & Ink Frontend
 * Communicates exclusively with the FastAPI Backend (Phase 3).
 */

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_BASE = rawApiUrl.replace(/\/+$/, '');

class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorDetail = 'Unable to reach the library. Please try again.';
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          errorDetail = typeof errorJson.detail === 'string' 
            ? errorJson.detail 
            : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Fallback to generic message
      }
      throw new ApiError(errorDetail, response.status);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Network or connection error
    throw new ApiError(
      'Unable to connect to the backend server. Please verify the FastAPI service is running.',
      0,
      err.message
    );
  }
}

export const api = {
  /**
   * Health check endpoint
   */
  getHealth: () => request('/api/health'),

  /**
   * Get paginated books list from Supabase with optional cluster filter
   */
  getBooks: ({ page = 1, limit = 20, cluster = null } = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (cluster !== null && cluster !== undefined && cluster !== '') {
      params.append('cluster', cluster.toString());
    }
    return request(`/api/books?${params.toString()}`);
  },

  /**
   * Search books by title/author substring using backend Supabase
   */
  searchBooks: (query, { page = 1, limit = 20 } = {}) => {
    if (!query || !query.trim()) {
      return Promise.resolve({ total: 0, page: 1, limit, total_pages: 0, items: [] });
    }
    const params = new URLSearchParams({
      q: query.trim(),
      page: page.toString(),
      limit: limit.toString(),
    });
    return request(`/api/books/search?${params.toString()}`);
  },

  /**
   * Get single book metadata by original dataset book_id
   */
  getBook: (bookId) => {
    if (!bookId) {
      throw new ApiError('Book ID is required', 400);
    }
    return request(`/api/books/${bookId}`);
  },

  /**
   * Generate content-based recommendations for a target book using Phase 1 ML engine
   */
  getRecommendations: (bookId, { limit = 10 } = {}) => {
    if (!bookId) {
      throw new ApiError('Book ID is required for recommendations', 400);
    }
    const params = new URLSearchParams({
      limit: limit.toString(),
    });
    return request(`/api/recommend/${bookId}?${params.toString()}`);
  }
};
