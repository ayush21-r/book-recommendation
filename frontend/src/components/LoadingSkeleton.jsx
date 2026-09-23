import React from 'react';

export function BookCardSkeleton() {
  return (
    <div className="card-folio p-3.5 bg-vellum animate-pulse flex flex-col justify-between aspect-[2/3.5] opacity-75">
      <div className="w-full aspect-[2/3] bg-manilla rounded mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-manilla rounded w-3/4" />
        <div className="h-3 bg-manilla rounded w-1/2" />
      </div>
      <div className="pt-3 border-t border-carbon/10 flex justify-between">
        <div className="h-3 bg-manilla rounded w-1/4" />
        <div className="h-3 bg-manilla rounded w-1/4" />
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BookDetailsSkeleton() {
  return (
    <div className="bg-vellum border-folio rounded-lg p-6 md:p-8 animate-pulse shadow-folio space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="w-full aspect-[2/3] max-w-xs mx-auto bg-manilla rounded" />
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 bg-manilla rounded w-3/4" />
          <div className="h-5 bg-manilla rounded w-1/2" />
          <div className="h-24 bg-manilla/60 rounded w-full" />
          <div className="h-10 bg-manilla rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
