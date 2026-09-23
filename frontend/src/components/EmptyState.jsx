import React from 'react';
import { BookOpen, Search } from 'lucide-react';

export default function EmptyState({
  title = 'No Books Found',
  description = 'No books were found matching your query. Try searching for a different title or author.',
  onAction,
  actionLabel = 'Explore Featured Books'
}) {
  return (
    <div className="card-folio p-10 bg-vellum text-center max-w-lg mx-auto my-10 border-folio">
      <div className="w-14 h-14 rounded-full bg-manilla text-carbon/60 flex items-center justify-center mx-auto mb-4 border border-carbon/20 shadow-inner">
        <BookOpen className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-carbon mb-2">
        {title}
      </h3>
      <p className="text-sm text-carbon/75 font-sans mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white font-sans text-sm font-semibold rounded-md border-folio shadow-folio hover:shadow-folio-hover tactile-btn"
        >
          <Search className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
