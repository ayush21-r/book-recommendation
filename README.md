<div align="center">

# 📖 Folio & Ink
### *A Tactile, Full-Stack Literary Book Recommendation System*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.3%2B-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

<br />

> *"Find your next chapter. Discover books that belong on the same shelf."*
<br />
A complete, production-ready machine learning web application that combines **unsupervised text clustering**, **high-dimensional vector similarity**, a **scalable PostgreSQL database**, and an **editorial, tactile user interface** crafted under the **"Folio & Ink"** aesthetic.

</div>

---

## 📑 Table of Contents

- [🌟 Architectural Highlights](#-architectural-highlights)
- [🏛️ Full-Stack System Architecture](#️-full-stack-system-architecture)
- [🧠 Phase 1 — Machine Learning Engine](#-phase-1--machine-learning-engine)
  - [Feature Engineering & TF-IDF Fusion](#feature-engineering--tf-idf-fusion)
  - [K-Means Semantic Partitioning (K=15)](#k-means-semantic-partitioning-k15)
  - [Real-Time Cosine Similarity Search](#real-time-cosine-similarity-search)
  - [The 15 Semantic Cluster Taxonomy](#the-15-semantic-cluster-taxonomy)
- [🗄️ Phase 2 — Database Layer (Supabase PostgreSQL)](#️-phase-2--database-layer-supabase-postgresql)
  - [Schema & Indexing Optimization](#schema--indexing-optimization)
  - [Seeding Pipeline](#seeding-pipeline)
- [⚡ Phase 3 — FastAPI High-Performance Backend](#-phase-3--fastapi-high-performance-backend)
  - [In-Memory Model Loading](#in-memory-model-loading)
  - [REST API Reference](#rest-api-reference)
- [🎨 Phase 4 — Frontend Experience ("Folio & Ink")](#-phase-4--frontend-experience-folio--ink)
  - [Design Tokens & Editorial Aesthetics](#design-tokens--editorial-aesthetics)
  - [Core Views & User Journey](#core-views--user-journey)
  - [Live System Status Diagnostics](#live-system-status-diagnostics)
- [🚀 Quick Start Guide](#-quick-start-guide)
  - [1-Click Startup (Windows)](#1-click-startup-windows)
  - [Manual Step-by-Step Setup](#manual-step-by-step-setup)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🛡️ Security & Best Practices](#️-security--best-practices)

---

## 🌟 Architectural Highlights

- **Privacy-First Content Recommender**: Operates entirely without invasive user tracking, cookies, or history harvesting by computing geometric text affinities across literary features.
- **Sub-Millisecond Inference**: Cluster-restricted search space pruning ($K=15$) cuts cosine similarity computation time by **93%**, achieving $\approx 1.2\text{ ms}$ response latencies on commodity CPUs.
- **4,763 Curated Literary Works**: Seeded into Supabase PostgreSQL with specialized B-Tree and GIN indexes for instantaneous full-text title and author searching.
- **Folio & Ink Design Language**: Pure editorial elegance inspired by archival printing, raw parchment canvas (`#F5F0E8`), unbleached vellum (`#FAF7F2`), terracotta typography (`#C85A32`), library emerald accents (`#1B4332`), and Newsreader serif typography.
- **Live System Health Monitor**: Real-time diagnostic popover measuring end-to-end API roundtrip latency, database connectivity, model memory residency, and dataset telemetry.

---

## 🏛️ Full-Stack System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER (BROWSER)                          │
│                                                                             │
│   React 18 SPA + Vite  ◄───►  Tailwind CSS ("Folio & Ink" Design Tokens)    │
│   • Home / Discover          • Full Search & 15-Cluster Filter Explorer     │
│   • Book Catalog Details     • Shelf Companions ("89% Similar")             │
│   • Live System Health Modal (Latency, PostgreSQL, ML status)               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / JSON REST
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BACKEND LAYER (FASTAPI)                            │
│                                                                             │
│   FastAPI + Uvicorn Async Server (Port 8000)                                │
│   ├── In-Memory ML Service (Preloaded at Lifespan Startup)                 │
│   │   ├── tfidf_vectorizer.pkl  (10,000 Sparse Features)                    │
│   │   ├── kmeans_model.pkl      (K=15 Centroids)                            │
│   │   ├── book_vectors.pkl      (4,763 x 10,000 Compressed Matrix)          │
│   │   └── books.pkl             (In-Memory Lookup Table)                    │
│   └── Route Handlers (/api/health, /api/books, /api/recommend)              │
└──────────────────────┬───────────────────────────────┬──────────────────────┘
                       │                               │
                       ▼                               ▼
┌──────────────────────────────────────┐  ┌───────────────────────────────────┐
│       DATABASE (SUPABASE)            │  │      ML MODEL ARTIFACTS           │
│                                      │  │                                   │
│  PostgreSQL 15+                      │  │  Scikit-Learn Pipeline            │
│  • 4,763 Books Table                 │  │  • TF-IDF Vectorizer (1-2 N-grams)│
│  • GIN Index on Full-Text Search     │  │  • K-Means Cluster Model (K=15)   │
│  • B-Tree on Cluster, Rating, ID     │  │  • Cosine Similarity Matrix       │
└──────────────────────────────────────┘  └───────────────────────────────────┘
```

---

## 🧠 Phase 1 — Machine Learning Engine

The core machine learning engine is built using **Scikit-Learn**, **Pandas**, and **NumPy** inside `model/`.

### Feature Engineering & TF-IDF Fusion

To capture both the thematic storyline and authorial style, multiple metadata fields are concatenated into a consolidated text corpus:
$$\text{Content} = \text{Title} + " " + \text{Authors} + " " + \text{Description}$$

- **Text Cleaning**: Lowercasing, regex tokenization, punctuation removal, and standard English stopword filtering.
- **Vectorization**: `TfidfVectorizer` configured with:
  - `max_features = 10,000`
  - `ngram_range = (1, 2)` (Unigrams & Bigrams)
  - `sublinear_tf = True` (Logarithmic scaling: $1 + \log(\text{tf})$)
  - `min_df = 2`

### K-Means Semantic Partitioning ($K=15$)

To avoid calculating all $N \times N$ pairwise cosine similarities ($4,763 \times 4,763 \approx 22.7\text{ million calculations}$), the dataset is partitioned into **15 thematic clusters** using K-Means:

- **Cluster Validation**: Verified via the **Elbow Method** ($K \in [5, 30]$) and **Silhouette Score analysis**.
- **Dimensionality Reduction**: Visualized in 2D using **TruncatedSVD** (Latent Semantic Analysis).
- **Search Space Reduction**: When generating recommendations for book $B$, the engine isolates only the books sharing $B$'s cluster ($N_{\text{cluster}} \approx 317\text{ books}$), reducing similarity computation by **93.3%**.

### Real-Time Cosine Similarity Search

$$\text{Similarity}(u, v) = \cos(\theta) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$

For a query book $i$:
1. Retrieve cluster assignment $C = \text{Cluster}(i)$.
2. Extract sub-matrix $\mathbf{X}_C$ of all vectors in cluster $C$.
3. Compute dot product $\mathbf{S} = \mathbf{x}_i \cdot \mathbf{X}_C^T$.
4. Sort descending, filter out the query book itself, and return the Top-$K$ closest literary companions.

### The 15 Semantic Cluster Taxonomy

| Cluster | Topic & Literary Genre | Distinctive Tropes & Keywords |
| :---: | :--- | :--- |
| **`C-0`** | **Contemporary Romance** | Love stories, emotional fiction, modern relationships, dating |
| **`C-1`** | **Historical & Literary Prose** | War chronicles, historical period sagas, biographical fiction |
| **`C-2`** | **Mystery & Crime Fiction** | Detective procedurals, murder mysteries, whodunits, noir |
| **`C-3`** | **Non-Fiction & Memoirs** | Autobiographies, life journeys, cultural essays, historical accounts |
| **`C-4`** | **Dystopian & Modern Thrillers** | Post-apocalyptic survival, conspiracy, investigative suspense |
| **`C-5`** | **Classics & Philosophy** | Heritage literature, philosophical essays, ethical discourse |
| **`C-6`** | **Science Fiction & Future** | Space exploration, artificial intelligence, speculative futures |
| **`C-7`** | **Children's & Illustrated** | Fairy tales, bedtime stories, illustrated juvenile adventures |
| **`C-8`** | **Poetry & Drama** | Verse, theatrical plays, anthologies, poetic prose |
| **`C-9`** | **Horror & Dark Fantasy** | Gothic terror, vampires, haunted lore, supernatural suspense |
| **`C-10`** | **Magic & Young Adult** | Academy journeys, sorcery, coming-of-age, magical quests |
| **`C-11`** | **Action & Adventure Sagas** | High-seas expeditions, martial action, heroic escapades |
| **`C-12`** | **Humor & Satire** | Witty commentaries, humorous tales, comedic essays |
| **`C-13`** | **Paranormal & Urban Fantasy** | Urban supernatural, shapeshifters, paranormal romance |
| **`C-14`** | **Epic & Classical Fantasy** | Tolkien lore, ancient sagas, mythic high fantasy realms |

---

## 🗄️ Phase 2 — Database Layer (Supabase PostgreSQL)

The database layer (`database/`) stores the catalog of 4,763 validated books on a managed **Supabase PostgreSQL** instance.

### Schema & Indexing Optimization

```sql
CREATE TABLE IF NOT EXISTS public.books (
    id BIGSERIAL PRIMARY KEY,
    book_id INTEGER UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    authors VARCHAR(500) NOT NULL,
    original_publication_year INTEGER,
    language_code VARCHAR(50) DEFAULT 'eng',
    average_rating NUMERIC(3, 2) DEFAULT 0.0,
    image_url TEXT,
    description TEXT,
    cluster INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_books_book_id ON public.books (book_id);
CREATE INDEX IF NOT EXISTS idx_books_cluster ON public.books (cluster);
CREATE INDEX IF NOT EXISTS idx_books_rating ON public.books (average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_books_title_lower ON public.books (LOWER(title));
CREATE INDEX IF NOT EXISTS idx_books_authors ON public.books (LOWER(authors));

-- Full-Text Search (GIN Index)
CREATE INDEX IF NOT EXISTS idx_books_fts ON public.books 
USING GIN (to_tsvector('english', title || ' ' || authors));
```

### Seeding Pipeline (`seed_books.py`)
- Reads the cleaned dataset alongside Phase 1 K-Means cluster assignments.
- Implements batched upserts ($250\text{ records/batch}$) with exponential backoff.
- Verified all **4,763 books** successfully seeded with zero duplicates.

---

## ⚡ Phase 3 — FastAPI High-Performance Backend

The REST API service (`backend/`) is built with **FastAPI** and **Uvicorn**, serving as the central nervous system connecting React, Supabase, and the ML engine.

### In-Memory Model Loading
During application startup (via `@asynccontextmanager` lifespan), the backend preloads all serialized `.pkl` models into RAM once:
- Vectors matrix: $\approx 3.63\text{ MB}$
- Metadata lookup table: $\approx 13.35\text{ MB}$
- Recommendation latency: **$< 2\text{ milliseconds}$** per query without disk I/O.

### REST API Reference

| Method | Endpoint | Query Parameters | Description |
| :---: | :--- | :--- | :--- |
| `GET` | `/api/health` | — | Diagnostic check (DB, ML status, version) |
| `GET` | `/api/books` | `page=1`, `limit=20`, `cluster=14` | Paginated catalog retrieval with optional cluster filter |
| `GET` | `/api/books/search` | `q=Hobbit`, `page=1`, `limit=20` | Case-insensitive title/author search |
| `GET` | `/api/books/{book_id}` | — | Single book metadata retrieval |
| `GET` | `/api/recommend/{book_id}` | `limit=10` | Top-N ML content-based recommendations |

#### Sample Recommendation Response (`GET /api/recommend/5907` — *The Hobbit*):
```json
{
  "source_book": {
    "book_id": 5907,
    "title": "The Hobbit, or There and Back Again",
    "authors": "J.R.R. Tolkien",
    "cluster": 14
  },
  "total_recommendations": 10,
  "recommendations": [
    {
      "book_id": 20438,
      "title": "Mr. Baggins (The History of The Hobbit, #1)",
      "authors": "John D. Rateliff, J.R.R. Tolkien",
      "cluster": 14,
      "similarity_score": 0.2743,
      "similarity_percentage": 27.4
    },
    {
      "book_id": 18512,
      "title": "The Return of the King (The Lord of the Rings, #3)",
      "authors": "J.R.R. Tolkien",
      "cluster": 14,
      "similarity_score": 0.1415,
      "similarity_percentage": 14.2
    }
  ]
}
```

---

## 🎨 Phase 4 — Frontend Experience ("Folio & Ink")

The frontend application (`frontend/`) is engineered with **React 18**, **Vite**, and **Tailwind CSS**, adhering strictly to the **Folio & Ink** visual identity.

### Design Tokens & Editorial Aesthetics

```css
/* Core Color Palette */
--canvas:      #F5F0E8; /* Raw unbleached linen parchment */
--surface:     #FAF7F2; /* Smooth archival vellum */
--border:      #1E1E1E; /* Carbon black structural hairline */
--primary:     #C85A32; /* Warm terracotta press ink */
--emerald:     #1B4332; /* Deep library study green */
--saffron:     #D99B26; /* Antique gilded rating accent */
--manilla:     #EAE3D5; /* Pressed archive envelope */
```

- **Typography**: `Newsreader` serif for headings and catalog titles; `Plus Jakarta Sans` for UI labels and crisp metadata.
- **Tactile Micro-Interactions**: Hard-offset box shadows (`shadow-folio`: `3px 3px 0px #1E1E1E`) and physical pressed feedback on click.

### Core Views & User Journey

1. **Discover & Featured (`HomeView`)**: Hero banner, curated book showcase, expandable 15-shelf cluster selector, and recommendation architecture explainer.
2. **Search & Catalog Explorer (`SearchResultsView`)**: Real-time keyword search, full pagination, and instant cluster pill filtering across all 15 semantic genres.
3. **Book Catalog Entry (`BookDetailsView`)**: Comprehensive book metadata, synopsis pull-quotes, and the companion shelf (**"Books that belong on the same shelf"**).
4. **Interactive System Status Modal (`SystemStatusModal`)**: Live diagnostic popover querying `/api/health` and live catalog statistics.

---

## 🚀 Quick Start Guide

### 1-Click Startup (Windows)

The simplest way to run the entire project is using the automated batch launcher:

```cmd
start.bat
```
*This starts the FastAPI backend (port `8000`), starts Vite (port `5173`), and automatically opens `http://127.0.0.1:5173` in your default browser.*

To stop all services:
```cmd
stop.bat
```

---

### Manual Step-by-Step Setup

#### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+ & npm**
- **Supabase Account & Project**

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create environment file from template
cp .env.example .env
# Fill in your SUPABASE_URL and SUPABASE_KEY in backend/.env

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server from project root
cd ..
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
- API Docs: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/api/health`

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```
- Web Application: `http://127.0.0.1:5173`

---

## 📂 Project Directory Structure

```
book-recommendation/
├── start.bat                   # 1-Click Windows system startup script
├── stop.bat                    # 1-Click Windows termination script
├── README.md                   # Complete system documentation
├── .gitignore                  # Global Git ignore protecting secrets
│
├── model/                      # PHASE 1: ML Pipeline & Models
│   ├── data/
│   │   └── book.csv            # 4,766 raw book records
│   ├── notebooks/
│   │   └── book_recommendation.ipynb  # Fully executed EDA & training notebook
│   ├── models/                 # Serialized model artifacts (.pkl)
│   │   ├── tfidf_vectorizer.pkl
│   │   ├── kmeans_model.pkl
│   │   ├── book_vectors.pkl
│   │   └── books.pkl
│   └── requirements.txt
│
├── database/                   # PHASE 2: Database Layer
│   ├── schema.sql              # PostgreSQL tables, constraints & GIN indexes
│   ├── seed_books.py           # 4,763 books seeding script
│   ├── .env.example            # Supabase credentials template
│   └── README.md
│
├── backend/                    # PHASE 3: FastAPI Backend
│   ├── app/
│   │   ├── main.py             # App entry point, CORS & lifespan loader
│   │   ├── config.py           # Dynamic settings & path resolution
│   │   ├── schemas.py          # Pydantic validation models
│   │   ├── ml_service.py       # In-memory recommendation engine
│   │   ├── supabase_client.py  # Supabase client singleton
│   │   └── routes/
│   │       ├── books.py        # /api/books catalog endpoints
│   │       └── recommendations.py # /api/recommend endpoint
│   ├── requirements.txt
│   └── PHASE_3_REPORT.md
│
└── frontend/                   # PHASE 4: React / Vite Application
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx     # Masthead & 15-shelf cluster explorer
    │   │   ├── BookCard.jsx    # Editorial card with aspect-ratio cover
    │   │   ├── SearchBar.jsx   # Search input with quick-tags
    │   │   └── SystemStatusModal.jsx # Live /api/health diagnostic popover
    │   ├── constants/
    │   │   └── clusters.js     # All 15 cluster definitions & descriptions
    │   ├── services/
    │   │   └── api.js          # API client communicating exclusively with FastAPI
    │   ├── views/
    │   │   ├── HomeView.jsx    # Discovery & curated showcase
    │   │   ├── SearchResultsView.jsx # Search grid & cluster filter
    │   │   ├── BookDetailsView.jsx   # Catalog entry & recommendation shelf
    │   │   └── AboutView.jsx   # ML architecture explanation
    │   ├── App.jsx             # Main router & layout container
    │   └── index.css           # Folio & Ink tactile design tokens
    ├── DESIGN.md               # Primary visual design specification
    └── package.json
```

---

## 🛡️ Security & Best Practices

1. **Zero Secret Leakage**: Direct Supabase database keys are restricted entirely to the backend (`backend/.env`). No database credentials or `.pkl` binaries are ever exposed to the client bundle.
2. **Environment Variable Protection**: All `.env` files are strictly excluded across root, backend, database, and frontend via comprehensive `.gitignore` rules.
3. **Graceful Error Resilience**: Robust fallbacks for missing book cover art, network connection timeouts, and empty search results.

---

<div align="center">
  <sub>Built with care under the <strong>Folio & Ink</strong> aesthetic. Phase 1 through Phase 4 Complete.</sub>
</div>
