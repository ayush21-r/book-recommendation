import React from 'react';
import { ArrowLeft } from 'lucide-react';
import RecommendationMethodology from '../components/RecommendationMethodology';

export default function AboutView({ onBack }) {
  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Back to Discovery Navigation */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-carbon/80 hover:text-terracotta transition-colors px-3 py-1.5 bg-vellum rounded border border-carbon/20 shadow-sm tactile-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discovery</span>
        </button>
      </div>

      {/* Main Recommendation Methodology Presentation */}
      <RecommendationMethodology />
    </div>
  );
}
