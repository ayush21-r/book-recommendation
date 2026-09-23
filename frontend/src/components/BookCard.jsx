import React, { useState } from 'react';
import { Star, Sparkles, BookOpen } from 'lucide-react';

export default function BookCard({ book, onSelect, similarityScore = null, showCluster = true }) {
  const [imgError, setImgError] = useState(false);

  if (!book) return null;

  const {
    book_id,
    title,
    authors,
    average_rating,
    original_publication_year,
    image_url,
    cluster
  } = book;

  // Format human-friendly similarity percentage if present
  const similarityPct = similarityScore !== null && similarityScore !== undefined
    ? Math.round(similarityScore * 100)
    : null;

  return (
    <article
      onClick={() => onSelect && onSelect(book_id)}
      className="card-folio card-folio-interactive group relative flex flex-col cursor-pointer overflow-hidden p-3.5 bg-vellum text-carbon transition-all duration-200 select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(book_id);
        }
      }}
      aria-label={`View details for ${title} by ${authors}`}
    >
      {/* Antique Saffron Ribbon Accent */}
      <div className="bookmark-ribbon opacity-85 group-hover:opacity-100 transition-opacity" />

      {/* Book Cover Container with Upright Aspect Ratio */}
      <div className="relative w-full aspect-[2/3] bg-manilla/60 rounded border border-carbon/25 overflow-hidden flex items-center justify-center mb-3 shadow-inner">
        {!imgError && image_url ? (
          <img
            src={image_url}
            alt={`Cover of ${title}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center h-full w-full bg-gradient-to-b from-manilla/80 to-parchment">
            <BookOpen className="w-8 h-8 text-carbon/40 mb-2 stroke-[1.5]" />
            <span className="font-serif text-sm font-semibold text-carbon line-clamp-3 leading-snug">
              {title}
            </span>
            <span className="text-[11px] text-carbon/60 font-sans mt-1 line-clamp-1">
              {authors}
            </span>
          </div>
        )}

        {/* Similarity Score Pill (For Recommendations) */}
        {similarityPct !== null && (
          <div className="absolute top-2 left-2 bg-emerald text-white px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-folio border border-carbon">
            <Sparkles className="w-3 h-3 text-saffron" />
            <span>{similarityPct}% Match</span>
          </div>
        )}
      </div>

      {/* Book Content / Metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-semibold text-base leading-snug text-carbon group-hover:text-terracotta line-clamp-2 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-carbon/75 font-sans mt-1 line-clamp-1">
            {authors}
          </p>
        </div>

        {/* Card Footer: Rating, Year, Cluster */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-carbon/10 text-xs text-carbon/80">
          <div className="flex items-center gap-1 font-semibold">
            <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
            <span>{typeof average_rating === 'number' ? average_rating.toFixed(2) : average_rating}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-carbon/60">
            {original_publication_year && (
              <span>{Math.round(original_publication_year)}</span>
            )}
            {showCluster && cluster !== undefined && cluster !== null && (
              <span className="bg-manilla/70 text-carbon/80 px-1.5 py-0.5 rounded border border-carbon/20 font-mono text-[10px]">
                C-{cluster}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
