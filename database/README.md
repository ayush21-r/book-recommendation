# 🗄️ Database Layer (Supabase PostgreSQL)

This directory manages the PostgreSQL database layer hosted on **Supabase** for the Book Recommendation System. It defines the catalog schema, indexes, and automated data seeding pipeline.

---

## 📋 Database Overview

* **Database Engine**: PostgreSQL (via Supabase)
* **Target Table**: `books`
* **Expected Records**: **4,763 unique books**
* **Cluster Assignments**: Integrated directly from the trained Phase 1 K-Means model (`cluster` IDs 0–14) without retraining.

---

## 📐 Table Schema & Columns

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGSERIAL` | `PRIMARY KEY` | Auto-incrementing unique record ID |
| `book_id` | `BIGINT` | `UNIQUE NOT NULL` | Original dataset book ID |
| `title` | `TEXT` | `NOT NULL` | Full book title |
| `authors` | `TEXT` | `NOT NULL` | Author(s) name(s) |
| `original_publication_year` | `INTEGER` | `NULLABLE` | Year of first publication |
| `language_code` | `VARCHAR(10)` | `DEFAULT 'eng'` | Language code |
| `average_rating` | `NUMERIC(3, 2)` | `DEFAULT 0.00` | GoodReads average rating (1.0 to 5.0) |
| `image_url` | `TEXT` | `NULLABLE` | Cover image URL |
| `description` | `TEXT` | `NULLABLE` | Book synopsis / description |
| `cluster` | `INTEGER` | `NOT NULL` | Assigned ML K-Means cluster (0–14) |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Record insertion timestamp |

### 🚀 Performance Indexes

The schema creates dedicated B-Tree and GIN indexes:
* `idx_books_book_id`: Fast lookups by dataset `book_id`.
* `idx_books_cluster`: Fast cluster-restricted candidate queries for recommendations.
* `idx_books_title` / `idx_books_title_lower`: Exact and case-insensitive title lookups.
* `idx_books_authors`: Author filtering and matching.
* `idx_books_average_rating`: Fast sorting by rating for top-rated book views.
* `idx_books_fts`: PostgreSQL Full-Text Search (GIN) index across `title` and `authors`.

---

## 🛠️ Setup & Deployment Instructions

### Step 1: Execute SQL Schema in Supabase

1. Open your [Supabase Dashboard](https://app.supabase.com).
2. Navigate to the **SQL Editor** tab.
3. Open or copy the contents of [`database/schema.sql`](schema.sql).
4. Click **Run** to create the `books` table and all performance indexes.

### Step 2: Configure Environment Variables

1. Copy the template file:
   ```bash
   cp database/.env.example database/.env
   ```
2. Populate your project credentials from **Supabase Dashboard -> Project Settings -> API**:
   ```env
   SUPABASE_URL=https://<your-project-ref>.supabase.co
   SUPABASE_SECRET_KEY=<your-service-role-or-anon-key>
   ```

### Step 3: Install Requirements

```bash
pip install -r database/requirements.txt
```

### Step 4: Run the Seeding Script

Execute the batch importer:
```bash
python database/seed_books.py
```

The script will:
* Load the 4,763 unique books from the Phase 1 trained model.
* Batch upsert records into Supabase (250 records per batch).
* Run automated validation checks (record count, sample retrieval, cluster query, and title search).

---

## 🔒 Security & Best Practices

* Never commit `.env` or API secret keys to Git.
* The root [`.gitignore`](../.gitignore) is pre-configured to ignore all `.env` files.
* Use `SUPABASE_SECRET_KEY` (Service Role Key) for administrative database seeding and server-side backend operations.
