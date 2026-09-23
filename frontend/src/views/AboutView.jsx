import React from 'react';
import { Sparkles, Terminal, Layers, ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

export default function AboutView({ onBack }) {
  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-carbon/70 hover:text-terracotta transition-colors px-3 py-1.5 bg-vellum rounded border border-carbon/20"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Discovery</span>
      </button>

      <section className="bg-vellum border-folio rounded-lg p-6 sm:p-10 shadow-folio space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-manilla rounded-full border border-carbon/25 text-xs font-semibold uppercase tracking-widest text-carbon/80">
          <Terminal className="w-3.5 h-3.5 text-terracotta" />
          <span>System Specification</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-carbon">
          How the Folio & Ink Recommendation Engine Works
        </h1>

        <p className="text-base text-carbon/80 leading-relaxed font-sans">
          Folio & Ink operates on an unsupervised, content-based recommendation architecture designed for speed, privacy, and thematic resonance. Rather than relying on intrusive user surveillance or cold-start collaborative filtering, our system evaluates the pure literary DNA of each text.
        </p>

        <div className="space-y-6 pt-4">
          <div className="p-5 bg-parchment border-folio rounded-md space-y-2">
            <h3 className="font-serif text-lg font-bold text-carbon flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-terracotta text-white font-mono text-xs flex items-center justify-center">1</span>
              Text Feature Fusion & Tokenization
            </h3>
            <p className="text-sm text-carbon/75 font-sans leading-relaxed">
              Every book entry is represented by a concatenated document consisting of its cleaned <strong>title</strong>, <strong>authors</strong>, and full <strong>synopsis</strong>. We normalize the text by stripping noise characters, lowercasing, and vectorizing it into 10,000 distinct unigram and bigram features using <strong>TF-IDF</strong> (Term Frequency – Inverse Document Frequency).
            </p>
          </div>

          <div className="p-5 bg-parchment border-folio rounded-md space-y-2">
            <h3 className="font-serif text-lg font-bold text-carbon flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald text-white font-mono text-xs flex items-center justify-center">2</span>
              Unsupervised K-Means Clustering ($K=15$)
            </h3>
            <p className="text-sm text-carbon/75 font-sans leading-relaxed">
              Using the Elbow Method, we partitioned the entire 4,763-volume library into <strong>15 semantic clusters</strong>. This step prunes the candidate search space by over 93%, categorizing titles into distinct narrative domains such as high fantasy, crime thriller, or historical fiction.
            </p>
          </div>

          <div className="p-5 bg-parchment border-folio rounded-md space-y-2">
            <h3 className="font-serif text-lg font-bold text-carbon flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-saffron text-white font-mono text-xs flex items-center justify-center">3</span>
              Cluster-Restricted Cosine Similarity
            </h3>
            <p className="text-sm text-carbon/75 font-sans leading-relaxed">
              When you select a book, the FastAPI backend locates its cluster, calculates the cosine angle between the query vector and candidate volumes within that cluster partition, excludes the query book, and returns the highest similarity items in descending order.
            </p>
          </div>
        </div>

        <div className="p-4 bg-manilla/50 rounded border border-carbon/20 text-xs text-carbon/80 space-y-1">
          <div className="font-bold text-carbon flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald" />
            Backend Verification Complete
          </div>
          <p>
            Connected to Supabase PostgreSQL database storing 4,763 unique books and powered by pre-compiled Phase 1 ML artifacts.
          </p>
        </div>
      </section>
    </div>
  );
}
