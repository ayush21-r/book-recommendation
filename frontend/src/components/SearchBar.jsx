import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'The Hobbit',
  'Harry Potter',
  'The Hunger Games',
  'The Great Gatsby',
  'Pride and Prejudice',
  'Da Vinci Code'
];

export default function SearchBar({ onSearch, initialQuery = '', className = '', autoFocus = false }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    onSearch(term);
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-carbon/50">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by book title, author, or keyword (e.g. Hobbit, Tolkien)..."
            autoFocus={autoFocus}
            className="w-full pl-11 pr-4 py-3 bg-vellum text-carbon font-sans text-sm md:text-base border-folio rounded-md shadow-folio focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta placeholder:text-carbon/45 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!query.trim()}
          className="ml-2.5 px-5 py-3 bg-terracotta text-white font-sans text-sm font-semibold rounded-md border-folio shadow-folio hover:shadow-folio-hover tactile-btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
        >
          <span>Find Books</span>
        </button>
      </form>

      {/* Suggested Quick Tags */}
      <div className="flex items-center flex-wrap gap-1.5 mt-2.5 text-xs text-carbon/70">
        <span className="flex items-center gap-1 text-carbon/50 font-medium mr-1">
          <Sparkles className="w-3 h-3 text-saffron" /> Popular:
        </span>
        {SUGGESTIONS.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => handleSuggestionClick(term)}
            className="px-2.5 py-1 bg-manilla/50 hover:bg-manilla text-carbon rounded-full border border-carbon/25 text-[11px] font-sans transition-colors cursor-pointer"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
