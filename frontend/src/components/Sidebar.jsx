import React, { useState } from 'react';
import { Compass, Search, Sparkles, Layers, ChevronDown, ChevronUp, X } from 'lucide-react';
import { CLUSTERS } from '../constants/clusters';

export default function Sidebar({
  currentView,
  onNavigate,
  selectedCluster,
  onSelectCluster,
  onOpenStatus,
  isOpen = false,
  onClose
}) {
  const [showAllClusters, setShowAllClusters] = useState(false);

  const navItems = [
    { id: 'home', label: 'Discover & Featured', icon: Compass },
    { id: 'search', label: 'Search Books', icon: Search },
    { id: 'about', label: 'How the ML Engine Works', icon: Sparkles },
  ];

  // Display top 5 default or all 15 when expanded
  const displayedClusters = showAllClusters ? CLUSTERS : CLUSTERS.slice(0, 5);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-carbon/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Masthead */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[280px] bg-parchment border-r-hairline border-carbon z-50 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-4">
          {/* Masthead Header */}
          <div className="flex items-start justify-between pb-3.5 border-b border-carbon/15">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-terracotta rounded flex items-center justify-center text-white font-serif font-bold text-xs shadow-folio border border-carbon">
                  F
                </div>
                <h1 className="font-serif text-xl font-bold tracking-tight text-carbon">
                  Folio & Ink
                </h1>
              </div>
              <p className="text-[10px] text-carbon/60 uppercase tracking-widest font-semibold mt-0.5">
                Literary Sanctum
              </p>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded text-carbon hover:bg-manilla transition-colors border border-carbon/20"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id && (item.id !== 'search' || selectedCluster === null);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose && onClose();
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded font-sans text-xs sm:text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'bg-carbon text-vellum shadow-folio font-semibold'
                      : 'text-carbon/80 hover:bg-manilla hover:text-carbon'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-saffron' : 'text-carbon/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* All 15 Semantic Cluster Shelves */}
          <div className="pt-3 border-t border-carbon/15">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-carbon/50 mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Topic Shelves (15)</span>
              </div>
              <button
                onClick={() => setShowAllClusters(!showAllClusters)}
                className="text-[10px] font-sans font-bold text-terracotta hover:underline flex items-center gap-0.5 normal-case cursor-pointer"
              >
                <span>{showAllClusters ? 'Show Top 5' : 'View All (15)'}</span>
                {showAllClusters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            <div className={`space-y-1 ${showAllClusters ? 'max-h-56 overflow-y-auto pr-1' : ''}`}>
              {displayedClusters.map((shelf) => {
                const isSelected = selectedCluster === shelf.id;
                return (
                  <button
                    key={shelf.id}
                    onClick={() => {
                      onSelectCluster(shelf.id);
                      onClose && onClose();
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-terracotta text-white font-semibold shadow-folio border border-carbon'
                        : 'text-carbon/75 hover:bg-manilla/70 hover:text-carbon'
                    }`}
                  >
                    <span className="truncate pr-1">{shelf.name}</span>
                    <span className={`text-[10px] font-mono px-1 rounded flex-shrink-0 ${isSelected ? 'bg-black/20' : 'bg-manilla border border-carbon/15'}`}>
                      C-{shelf.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer / Interactive System Status Card */}
        <div className="pt-3 mt-3 border-t border-carbon/15 text-xs text-carbon/70 space-y-2">
          <button
            onClick={() => {
              onOpenStatus && onOpenStatus();
              onClose && onClose();
            }}
            className="w-full p-2.5 bg-vellum hover:bg-manilla rounded-md border-folio-subtle text-left transition-all group tactile-btn"
            aria-label="View system status report"
          >
            <div className="flex items-center justify-between font-semibold text-carbon">
              <span className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse flex-shrink-0" />
                System Status
              </span>
              <span className="font-mono text-[10px] text-emerald font-bold tracking-wider">
                ● LIVE
              </span>
            </div>
            <p className="text-[10px] text-carbon/60 mt-0.5">
              All systems operational
            </p>
          </button>

          <p className="text-[9px] text-carbon/50 text-center">
            Folio & Ink © 2026. Tactile literary discovery.
          </p>
        </div>
      </aside>
    </>
  );
}
