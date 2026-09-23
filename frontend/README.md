# 📖 Folio & Ink — Frontend Application

**Brand:** Folio & Ink  
**Design Philosophy:** Warm Editorial, Tactile, Archival, Literary & Minimal  
**Technology Stack:** React 18, Vite, Tailwind CSS, Lucide Icons  

---

## 🎨 Visual Identity & Design System

The frontend strictly implements the **Folio & Ink** design system detailed in [`DESIGN.md`](./DESIGN.md):

* **Typography**:
  * **Headlines & Pull Quotes**: `Newsreader` (Contemporary transitional serif with optical warmth)
  * **Body, Metadata & UI**: `Plus Jakarta Sans` (Humanist geometric sans-serif for clarity)
* **Color Palette**:
  * **Root Canvas**: `#F5F0E8` (Raw Linen Parchment)
  * **Card Surfaces**: `#FAF7F2` (Unbleached Vellum)
  * **Accents / Shelves**: `#EAE3D5` (Pressed Manilla)
  * **Primary Bookcloth**: `#C85A32` (Sun-baked Terracotta)
  * **Secondary Brand**: `#1B4332` (Deep Library Emerald)
  * **Ratings & Bookmarks**: `#D99B26` (Antique Saffron)
  * **Ink / Borders**: `#1E1E1E` (Carbon Black)
* **Tactile Styling**:
  * **Crisp Hairline Outlines**: `1.5px solid #1E1E1E`
  * **Hard Offset Shadows**: `2px 2px 0px #1E1E1E` and `3px 3px 0px #C85A32` on interactive hover.
  * **Upright Book Proportions**: Authentic `aspect-[2/3]` book covers with gold corner ribbons.

---

## 🏛️ Application Views & User Flow

```
                      ┌──────────────────────┐
                      │      HOME VIEW       │
                      │  - Editorial Hero    │
                      │  - Featured Catalog  │
                      │  - Thematic Shelves  │
                      └──────────┬───────────┘
                                 │ Search or Select
                                 ▼
                      ┌──────────────────────┐
                      │    SEARCH RESULTS    │
                      │  - Supabase Matches  │
                      │  - Paginated Grid    │
                      └──────────┬───────────┘
                                 │ Click Book
                                 ▼
                      ┌──────────────────────┐
                      │     BOOK DETAILS     │
                      │  - Large Cover       │
                      │  - Synopsis Quote    │
                      │  - Rating & Metadata │
                      │  - COMPANION SHELF   │
                      │    (ML Recs Grid)    │
                      └──────────┬───────────┘
                                 │ Click Recommended Book
                                 ▼
                       (Seamless Re-Routing)
```

1. **Home (`HomeView.jsx`)**: Editorial hero masthead, search bar with quick tags, featured books, and ML architecture breakdown.
2. **Search (`SearchResultsView.jsx`)**: Real-time Supabase search across title and author with pagination and cluster filters.
3. **Book Details (`BookDetailsView.jsx`)**: Full book synopsis with pull-quote styling and integrated ML recommendation cards (*"Books that belong on the same shelf"*) showing human-friendly similarity scores (`89% Match`).
4. **About Engine (`AboutView.jsx`)**: Architectural explanation of the TF-IDF, K-Means, and Cosine Similarity pipeline.

---

## ⚙️ Setup & Development

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your running FastAPI backend:
```env
VITE_API_URL=http://127.0.0.1:8000
```

### 3. Start Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 📱 Responsive Layout

* **Desktop (1200px+)**: Persistent 280px left sidebar masthead with asymmetric 12-column content canvas.
* **Tablet (768px - 1199px)**: Reflows cleanly with compact navigation.
* **Mobile (< 768px)**: Single fluid column with slide-out navigation drawer, zero horizontal overflow.

---

## 🔒 Security & Privacy

* **Zero Supabase Direct Access**: The frontend communicates exclusively with the FastAPI REST backend.
* **No Secret Exposure**: No API keys, JWT tokens, or database credentials exist on the client.
