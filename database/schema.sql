-- ====================================================================
-- Book Recommendation System — Supabase PostgreSQL Schema
-- Phase 2: Database Layer
-- ====================================================================

-- 1. Create the books table
CREATE TABLE IF NOT EXISTS books (
    id BIGSERIAL PRIMARY KEY,
    book_id BIGINT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    original_publication_year INTEGER,
    language_code VARCHAR(10) DEFAULT 'eng',
    average_rating NUMERIC(3, 2) DEFAULT 0.00,
    image_url TEXT,
    description TEXT,
    cluster INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for application performance & fast lookup
-- Fast lookup by original dataset ID
CREATE INDEX IF NOT EXISTS idx_books_book_id ON books(book_id);

-- Fast cluster-based filtering (essential for ML recommendation candidate lookup)
CREATE INDEX IF NOT EXISTS idx_books_cluster ON books(cluster);

-- Fast exact & case-insensitive title search
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_books_title_lower ON books(lower(title));

-- Fast author filtering & sorting
CREATE INDEX IF NOT EXISTS idx_books_authors ON books(authors);

-- Fast sorting by rating
CREATE INDEX IF NOT EXISTS idx_books_average_rating ON books(average_rating DESC);

-- Optional: Full-Text Search index for search queries on title and authors
CREATE INDEX IF NOT EXISTS idx_books_fts ON books USING gin(to_tsvector('english', title || ' ' || coalesce(authors, '')));

-- ====================================================================
-- End of Schema Definition
-- ====================================================================
