import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorMessage({ message = 'Unable to reach the library. Please try again.', onRetry }) {
  return (
    <div className="card-folio p-8 bg-vellum border-terracotta text-center max-w-lg mx-auto my-8 shadow-folio">
      <div className="w-12 h-12 rounded-full bg-terracotta-light text-terracotta flex items-center justify-center mx-auto mb-4 border border-terracotta/40 shadow-inner">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-xl font-bold text-carbon mb-2">
        Library Communication Notice
      </h3>
      <p className="text-sm text-carbon/75 font-sans mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-carbon text-white font-sans text-sm font-semibold rounded-md border-folio shadow-folio hover:shadow-folio-hover tactile-btn"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
