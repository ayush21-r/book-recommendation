import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Sparkles, BookOpen, Calendar, Globe, Bookmark, Layers, AlertCircle } from 'lucide-react';
import BookCard from '../components/BookCard';
import { BookDetailsSkeleton, BookGridSkeleton } from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import { api } from '../services/api';

export default function BookDetailsView({ bookId, onSelectBook, onBack }) {
  const [book, setBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [bookError, setBookError] = useState(null);
  const [recsError, setRecsError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (bookId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchBookDetails(bookId);
      fetchRecommendations(bookId);
    }
  }, [bookId]);

  const fetchBookDetails = async (id) => {
    setLoadingBook(true);
    setBookError(null);
    setImgError(false);
    try {
      const data = await api.getBook(id);
      setBook(data);
    } catch (err) {
      setBookError(err.message || 'Unable to retrieve book details.');
    } finally {
      setLoadingBook(false);
    }
  };

  const fetchRecommendations = async (id) => {
    setLoadingRecs(true);
    setRecsError(null);
    try {
      const data = await api.getRecommendations(id, { limit: 10 });
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setRecsError(err.message || 'Unable to generate recommendations.');
    } finally {
      setLoadingRecs(false);
    }
  };

  if (loadingBook) {
    return (
      <div className="space-y-8 pb-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-carbon/70 hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
        <BookDetailsSkeleton />
      </div>
    );
  }

  if (bookError) {
    return (
      <div className="space-y-6 pb-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-carbon/70 hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <ErrorMessage
          message={bookError}
          onRetry={() => fetchBookDetails(bookId)}
        />
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="space-y-12 pb-16">
      {/* Top Navigation */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-carbon/70 hover:text-terracotta transition-colors px-3 py-1.5 bg-vellum rounded border border-carbon/20 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Book Hero Presentation */}
      <section className="bg-vellum border-folio rounded-lg p-6 sm:p-8 md:p-10 shadow-folio relative overflow-hidden">
        {/* Bookmark Ribbon */}
        <div className="bookmark-ribbon" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Cover Art Column */}
          <div className="md:col-span-4 lg:col-span-4 max-w-[280px] mx-auto md:mx-0 w-full">
            <div className="aspect-[2/3] w-full bg-manilla rounded border-folio overflow-hidden shadow-folio relative flex items-center justify-center">
              {!imgError && book.image_url ? (
                <img
                  src={book.image_url}
                  alt={`Cover of ${book.title}`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center h-full w-full bg-gradient-to-b from-manilla/80 to-parchment">
                  <BookOpen className="w-12 h-12 text-carbon/40 mb-3" />
                  <span className="font-serif text-lg font-bold text-carbon">
                    {book.title}
                  </span>
                  <span className="text-xs text-carbon/70 font-sans mt-2">
                    {book.authors}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Book Information Column */}
          <div className="md:col-span-8 lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center flex-wrap gap-2">
                <span className="bg-manilla text-carbon/80 px-2.5 py-0.5 rounded border border-carbon/25 text-xs font-mono font-semibold">
                  Cluster {book.cluster}
                </span>
                <span className="text-xs text-carbon/50 font-mono">
                  Catalog ID: #{book.book_id}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-carbon leading-tight">
                {book.title}
              </h1>

              <p className="text-base sm:text-lg font-sans font-medium text-terracotta">
                By {book.authors}
              </p>
            </div>

            {/* Metadata Pill Row */}
            <div className="flex items-center flex-wrap gap-4 py-3 border-y border-carbon/15 text-xs text-carbon/80">
              <div className="flex items-center gap-1.5 font-semibold">
                <Star className="w-4 h-4 fill-saffron text-saffron" />
                <span className="text-sm">
                  {typeof book.average_rating === 'number'
                    ? book.average_rating.toFixed(2)
                    : book.average_rating}
                </span>
                <span className="text-carbon/50 font-normal">/ 5.0 Rating</span>
              </div>

              {book.original_publication_year && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-carbon/50" />
                  <span>First Published {Math.round(book.original_publication_year)}</span>
                </div>
              )}

              {book.language_code && (
                <div className="flex items-center gap-1.5 uppercase font-mono">
                  <Globe className="w-3.5 h-3.5 text-carbon/50" />
                  <span>{book.language_code}</span>
                </div>
              )}
            </div>

            {/* Synopsis / Description Block with Pull-Quote Treatment */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-carbon flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald" />
                <span>Synopsis & Marginalia</span>
              </h3>
              <div className="quote-block p-4 rounded-r-md text-carbon/85 text-sm sm:text-base leading-relaxed">
                {book.description || 'No archival synopsis is available for this catalog entry.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE RECOMMENDATION SECTION */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-carbon/20 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-terracotta mb-1">
            <Sparkles className="w-4 h-4" /> Machine Learning Companions
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon">
            Books that belong on the same shelf
          </h2>
          <p className="text-xs sm:text-sm text-carbon/70 font-sans mt-1">
            Calculated in real-time by computing cosine similarity within Cluster {book.cluster} based on vocabulary, plot motifs, and author affinity.
          </p>
        </div>

        {loadingRecs && <BookGridSkeleton count={5} />}

        {recsError && (
          <div className="p-6 bg-vellum border-folio rounded-md text-center space-y-3">
            <AlertCircle className="w-6 h-6 text-terracotta mx-auto" />
            <p className="text-sm text-carbon/80">{recsError}</p>
            <button
              onClick={() => fetchRecommendations(bookId)}
              className="px-4 py-2 bg-carbon text-white text-xs font-semibold rounded tactile-btn"
            >
              Retry Recommendations
            </button>
          </div>
        )}

        {!loadingRecs && !recsError && recommendations.length === 0 && (
          <div className="p-8 bg-vellum border-folio rounded-md text-center text-sm text-carbon/70">
            No companion books found in this cluster partition.
          </div>
        )}

        {!loadingRecs && !recsError && recommendations.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {recommendations.map((rec) => (
              <BookCard
                key={rec.book_id}
                book={rec}
                similarityScore={rec.similarity_score}
                onSelect={onSelectBook}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
