import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Layers, Award, Terminal, ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { BookGridSkeleton } from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import RecommendationMethodology from '../components/RecommendationMethodology';
import { api } from '../services/api';
import { CLUSTERS } from '../constants/clusters';

export default function HomeView({ onSelectBook, onSearch, onSelectCluster, onNavigate }) {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllShelves, setShowAllShelves] = useState(false);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch 10 curated popular books from the library catalog
      const data = await api.getBooks({ page: 1, limit: 10 });
      setFeaturedBooks(data.items || []);
    } catch (err) {
      setError(err.message || 'Unable to load featured books.');
    } finally {
      setLoading(false);
    }
  };

  const displayedClusters = showAllShelves ? CLUSTERS : CLUSTERS.slice(0, 6);

  return (
    <div className="space-y-12 pb-12">
      {/* Editorial Hero Section */}
      <section className="bg-vellum border-folio rounded-lg p-6 sm:p-10 md:p-12 shadow-folio relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-manilla/40 -rotate-45 translate-x-16 -translate-y-16 pointer-events-none border-b border-carbon/10" />

        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-manilla rounded-full border border-carbon/25 text-xs font-semibold uppercase tracking-widest text-carbon/80">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Curated Machine Learning Engine</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-carbon tracking-tight">
            Find your next chapter. Discover books that belong on the same shelf.
          </h1>

          <p className="text-base sm:text-lg text-carbon/75 font-sans leading-relaxed max-w-2xl">
            A sanctuary for discerning readers. By combining multi-field text vectorization with unsupervised topic clustering, our recommendation engine pairs your favorite titles with works of matching narrative texture and literary voice.
          </p>

          {/* Integrated Search Form */}
          <div className="pt-3">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </section>

      {/* Featured Shelf / Curated Books */}
      <section className="space-y-5">
        <div className="flex items-end justify-between border-b border-carbon/20 pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4" /> From the Reading Room
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon">
              Featured Literary Catalog
            </h2>
          </div>
          <button
            onClick={() => onSelectCluster(null)}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-carbon hover:text-terracotta transition-colors"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading && <BookGridSkeleton count={10} />}

        {error && (
          <ErrorMessage
            message="Could not load featured books from the catalog."
            onRetry={fetchFeaturedBooks}
          />
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.book_id}
                book={book}
                onSelect={onSelectBook}
              />
            ))}
          </div>
        )}
      </section>

      {/* Thematic Shelves / Explore All 15 Clusters */}
      <section className="bg-vellum border-folio rounded-lg p-6 sm:p-8 shadow-folio space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald" />
            <h2 className="font-serif text-2xl font-bold text-carbon">
              Browse by Topic Shelves ({CLUSTERS.length} Semantic Clusters)
            </h2>
          </div>

          <button
            onClick={() => setShowAllShelves(!showAllShelves)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-parchment hover:bg-manilla rounded border border-carbon/25 text-xs font-semibold text-carbon transition-colors tactile-btn"
          >
            <span>{showAllShelves ? 'Show Top 6' : 'View All 15 Topic Shelves'}</span>
            {showAllShelves ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <p className="text-sm text-carbon/75 max-w-2xl font-sans">
          The ML engine partitioned the entire library into 15 thematic clusters based on synopsis, authorship, and literary tropes. Choose any shelf to view all matching volumes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {displayedClusters.map((shelf) => (
            <div
              key={shelf.id}
              onClick={() => onSelectCluster(shelf.id)}
              className="p-4 bg-parchment hover:bg-manilla rounded-md border-folio cursor-pointer group transition-all tactile-btn flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold bg-carbon text-white px-2 py-0.5 rounded">
                    {shelf.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-carbon/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif font-bold text-base text-carbon group-hover:text-terracotta transition-colors">
                  {shelf.name}
                </h3>
                <p className="text-xs text-carbon/70 font-sans mt-1">
                  {shelf.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Folio & Ink Recommends: Architecture Overview */}
      <section className="bg-manilla/40 border-folio rounded-lg p-6 sm:p-8 space-y-6 shadow-folio">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-carbon/15 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-terracotta" />
              <h2 className="font-serif text-2xl font-bold text-carbon">
                How Folio & Ink Recommends
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-carbon/75 font-sans">
              A privacy-first, content-based recommendation workflow powered by unsupervised ML and textual similarity.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-vellum hover:bg-parchment rounded border border-carbon/25 text-xs font-semibold text-carbon transition-colors tactile-btn"
            >
              <span>Explore Full Methodology</span>
              <ArrowRight className="w-3.5 h-3.5 text-terracotta" />
            </button>
          )}
        </div>

        {/* Five-Stage Compact Flow */}
        <RecommendationMethodology isCompact={true} />
      </section>
    </div>
  );
}
