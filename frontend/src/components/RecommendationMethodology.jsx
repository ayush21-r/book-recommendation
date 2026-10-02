import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Layers, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  Cpu
} from 'lucide-react';

export default function RecommendationMethodology({ isCompact = false }) {
  const pipelineSteps = [
    {
      num: '01',
      tag: 'Raw Corpus',
      title: 'Text Preprocessing',
      badgeColor: 'bg-terracotta text-white',
      accentBorder: 'border-terracotta',
      icon: BookOpen,
      desc: 'Title, authors, and plot synopses are extracted, sanitized, lowercased, and fused into a single unified textual representation for each of the 4,763 unique books.',
      techNote: '4,763 unique volumes • Zero missing values'
    },
    {
      num: '02',
      tag: 'Vector Space',
      title: 'TF-IDF Vectorization',
      badgeColor: 'bg-emerald text-white',
      accentBorder: 'border-emerald',
      icon: FileText,
      desc: 'Converts unstructured narrative text into a 10,000-dimensional numerical vector space using unigrams and bigrams with English stop-word filtering.',
      techNote: '10,000 features • (1, 2) N-Grams'
    },
    {
      num: '03',
      tag: 'Search Partitioning',
      title: 'K-Means Clustering',
      badgeColor: 'bg-saffron text-white',
      accentBorder: 'border-saffron',
      icon: Layers,
      desc: 'Partitions the library into 15 distinct thematic clusters. When a user selects a book, its assigned cluster immediately prunes candidate search space by ~93%.',
      techNote: 'K = 15 Selected Clusters • Partitioned Search'
    },
    {
      num: '04',
      tag: 'Geometric Scoring',
      title: 'Cosine Similarity',
      badgeColor: 'bg-carbon text-white',
      accentBorder: 'border-carbon',
      icon: Compass,
      desc: 'Computes the cosine angle between the query book and all candidate vectors in the target cluster to assess stylistic and thematic similarity.',
      techNote: 'Angle-based similarity • Range: [0, 1]'
    },
    {
      num: '05',
      tag: 'Inference Output',
      title: 'Ranked Recommendations',
      badgeColor: 'bg-terracotta text-white',
      accentBorder: 'border-terracotta',
      icon: Sparkles,
      desc: 'Excludes the query book, eliminates duplicates, and returns top companion books ordered strictly by descending similarity score.',
      techNote: 'Top-N companions • Real-time retrieval'
    }
  ];

  if (isCompact) {
    return (
      <div className="space-y-6">
        {/* Compact Flow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="p-4 bg-vellum rounded-md border-folio shadow-folio flex flex-col justify-between space-y-3 relative group hover:bg-manilla/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${step.badgeColor}`}>
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-carbon/60">
                      {step.tag}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-carbon flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                    <span>{step.title}</span>
                  </h4>
                  <p className="text-xs text-carbon/75 font-sans leading-relaxed mt-1.5">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-carbon/10 text-[10px] font-mono text-carbon/60">
                  {step.techNote}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="bg-vellum border-folio rounded-lg p-6 sm:p-10 shadow-folio space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-manilla/40 -rotate-45 translate-x-16 -translate-y-16 pointer-events-none border-b border-carbon/10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-manilla rounded-full border border-carbon/25 text-xs font-semibold uppercase tracking-widest text-carbon/80">
          <Cpu className="w-3.5 h-3.5 text-terracotta" />
          <span>Machine Learning Architecture</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-carbon tracking-tight">
          How Folio & Ink Recommends
        </h1>

        <p className="text-base sm:text-lg text-carbon/80 leading-relaxed font-sans max-w-3xl">
          Folio & Ink uses an unsupervised, content-based recommendation pipeline. Rather than tracking personal reading habits or relying on collaborative user profiles, our system analyzes the literary metadata of 4,763 books to discover natural thematic companions.
        </p>
      </div>

      {/* Visual Pipeline Flowchart */}
      <div className="bg-parchment border-folio rounded-lg p-6 sm:p-8 shadow-folio space-y-6">
        <div className="flex items-center justify-between border-b border-carbon/15 pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
              End-to-End Inference Pipeline
            </span>
            <h2 className="font-serif text-2xl font-bold text-carbon mt-0.5">
              Five-Stage Recommendation Workflow
            </h2>
          </div>
          <span className="hidden sm:inline-flex text-xs font-mono bg-manilla border border-carbon/20 px-2.5 py-1 rounded text-carbon/70">
            Content-Based Filtering
          </span>
        </div>

        {/* Step-by-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-vellum border-folio rounded-md p-4 shadow-folio flex flex-col justify-between space-y-3 relative group hover:bg-manilla/50 transition-all tactile-btn"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs ${step.badgeColor}`}>
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono text-carbon/50 uppercase tracking-widest">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-carbon flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-carbon/80" />
                    <span>{step.title}</span>
                  </h3>

                  <p className="text-xs text-carbon/75 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-carbon/10">
                  <span className="text-[10px] font-mono text-carbon/60 block truncate">
                    {step.techNote}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Feature Representation & Search Pruning */}
        <div className="bg-vellum border-folio rounded-lg p-6 shadow-folio space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-emerald text-white font-mono text-xs flex items-center justify-center font-bold">A</span>
            <h3 className="font-serif text-lg font-bold text-carbon">
              Feature Extraction & Candidate Pruning
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-carbon/80 font-sans leading-relaxed">
            <p>
              <strong>TF-IDF Representation:</strong> Titles, author names, and synopses are vectorized into a 10,000-dimensional sparse numerical matrix. The algorithm balances term frequency with document rarity to highlight discriminative literary keywords.
            </p>
            <p>
              <strong>K-Means Search Pruning:</strong> With $K=15$ clusters, the catalog is partitioned into coherent thematic subsets. Querying within the selected book's cluster prunes the search space by ~93%, accelerating cosine similarity ranking.
            </p>
          </div>

          <div className="p-3 bg-parchment rounded border border-carbon/20 font-mono text-xs text-carbon/80 space-y-1">
            <div className="font-bold text-carbon">Configuration Snapshot:</div>
            <div>• TF-IDF: 10,000 features, Unigram & Bigram (1, 2)</div>
            <div>• K-Means: K = 15 Selected Clusters (Random State 42)</div>
          </div>
        </div>

        {/* Card 2: Ranking & Dimensionality Reduction Context */}
        <div className="bg-vellum border-folio rounded-lg p-6 shadow-folio space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-saffron text-white font-mono text-xs flex items-center justify-center font-bold">B</span>
            <h3 className="font-serif text-lg font-bold text-carbon">
              Cosine Similarity & Academic Visualization
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-carbon/80 font-sans leading-relaxed">
            <p>
              <strong>Cosine Similarity Ranking:</strong> Candidate books in the same cluster are compared against the query vector using angular cosine distance. Books with the highest alignment are returned in descending order.
            </p>
            <p>
              <strong>PCA in Academic Analysis:</strong> Principal Component Analysis (PCA) is utilized strictly for 2D exploratory visualization in the research notebook. The live recommendation engine operates on the complete 10,000-feature TF-IDF representation.
            </p>
          </div>

          <div className="p-3 bg-parchment rounded border border-carbon/20 font-mono text-xs text-carbon/80 space-y-1">
            <div className="font-bold text-carbon">Inference Logic:</div>
            <div>• Ranking Metric: Cosine Similarity on TF-IDF Vectors</div>
            <div>• PCA Role: Offline 2D Projection & Visualization Only</div>
          </div>
        </div>
      </div>
    </div>
  );
}
