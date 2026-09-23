import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Layers, X, Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { BookGridSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import { api } from '../services/api';
import { CLUSTERS, getClusterById } from '../constants/clusters';

export default function SearchResultsView({
  searchQuery,
  selectedCluster,
  onSelectBook,
  onSearch,
  onSelectCluster,
  onClearFilter,
  onBackToHome
}) {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 20;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCluster]);

  useEffect(() => {
    fetchResults();
  }, [searchQuery, selectedCluster, page]);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (searchQuery && searchQuery.trim()) {
        data = await api.searchBooks(searchQuery, { page, limit });
      } else {
        data = await api.getBooks({ page, limit, cluster: selectedCluster });
      }

      setBooks(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message || 'Error fetching search results.');
    } finally {
      setLoading(false);
    }
  };

  const isClusterFilter = selectedCluster !== null && selectedCluster !== undefined && (!searchQuery || !searchQuery.trim());
  const activeCluster = isClusterFilter ? getClusterById(selectedCluster) : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header Bar */}
      <section className="bg-vellum border-folio rounded-lg p-5 sm:p-6 shadow-folio space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-carbon/70 hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Discovery</span>
          </button>

          {isClusterFilter && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-terracotta text-white border border-carbon px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-xs">
                <span>{activeCluster?.name || `Cluster ${selectedCluster}`}</span>
                <button
                  onClick={onClearFilter}
                  className="hover:opacity-80 transition-opacity"
                  title="Clear cluster filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-carbon">
            {searchQuery && searchQuery.trim()
              ? `Search Results for "${searchQuery}"`
              : isClusterFilter
              ? `${activeCluster?.fullName || `Cluster ${selectedCluster}`}`
              : 'Full Library Catalog'}
          </h1>
          <p className="text-xs text-carbon/60 font-sans mt-1">
            {isClusterFilter
              ? `${activeCluster?.desc} • ${total.toLocaleString()} volumes cataloged`
              : loading
              ? 'Querying library catalog...'
              : `Found ${total.toLocaleString()} volumes in library database`}
          </p>
        </div>

        {/* Search Input Refinement */}
        <SearchBar
          onSearch={onSearch}
          initialQuery={searchQuery || ''}
          className="pt-1"
        />

        {/* Semantic Cluster Selector Bar */}
        <div className="pt-3 border-t border-carbon/15">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase text-carbon/50 mb-2">
            <Filter className="w-3 h-3" />
            <span>Filter by All 15 Semantic Clusters:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={onClearFilter}
              className={`text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors border font-medium ${
                selectedCluster === null
                  ? 'bg-carbon text-white border-carbon'
                  : 'bg-parchment hover:bg-manilla text-carbon border-carbon/25'
              }`}
            >
              All Books
            </button>

            {CLUSTERS.map((c) => {
              const isSelected = selectedCluster === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCluster ? onSelectCluster(c.id) : null}
                  className={`text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors border font-medium flex items-center gap-1 ${
                    isSelected
                      ? 'bg-terracotta text-white border-carbon font-semibold shadow-xs'
                      : 'bg-parchment hover:bg-manilla text-carbon border-carbon/25'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">C-{c.id}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Results Grid */}
      <section className="space-y-6">
        {loading && <BookGridSkeleton count={limit} />}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={fetchResults}
          />
        )}

        {!loading && !error && books.length === 0 && (
          <EmptyState
            title="No Matching Volumes"
            description={`We could not find any books matching your query. Check the spelling or search for popular titles like "Hobbit", "Harry Potter", or "Gatsby".`}
            onAction={onBackToHome}
            actionLabel="Return to Discover"
          />
        )}

        {!loading && !error && books.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {books.map((book) => (
                <BookCard
                  key={book.book_id}
                  book={book}
                  onSelect={onSelectBook}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-carbon/15">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 bg-vellum border-folio rounded-md text-xs font-semibold shadow-folio hover:shadow-folio-hover tactile-btn disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <span className="font-mono text-xs text-carbon/70 px-3 py-1 bg-manilla rounded border border-carbon/20">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 bg-vellum border-folio rounded-md text-xs font-semibold shadow-folio hover:shadow-folio-hover tactile-btn disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
