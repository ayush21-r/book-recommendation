import React, { useState, useEffect } from 'react';
import { Menu, Search, Activity } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SystemStatusModal from './components/SystemStatusModal';
import HomeView from './views/HomeView';
import SearchResultsView from './views/SearchResultsView';
import BookDetailsView from './views/BookDetailsView';
import AboutView from './views/AboutView';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'search' | 'details' | 'about'
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedBookId]);

  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId);
    setCurrentView('details');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCluster(null);
    setCurrentView('search');
  };

  const handleSelectCluster = (clusterId) => {
    setSelectedCluster(clusterId);
    setSearchQuery('');
    setCurrentView('search');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleBackToHome = () => {
    setSearchQuery('');
    setSelectedCluster(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-parchment text-carbon flex flex-col antialiased selection:bg-terracotta-light selection:text-terracotta-dark">
      {/* Persistent Desktop Sidebar & Mobile Drawer */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        selectedCluster={selectedCluster}
        onSelectCluster={handleSelectCluster}
        onOpenStatus={() => setStatusModalOpen(true)}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Live System Diagnostics Modal */}
      <SystemStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />

      {/* Main Content Area (Offset by 280px on desktop) */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-w-0">
        {/* Mobile / Tablet Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-parchment/95 backdrop-blur-md border-b-hairline border-carbon px-4 py-3 flex items-center justify-between shadow-sm">
          <div
            onClick={handleBackToHome}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-6 h-6 bg-terracotta rounded flex items-center justify-center text-white font-serif font-bold text-xs shadow-folio border border-carbon">
              F
            </div>
            <span className="font-serif font-bold text-lg text-carbon">Folio & Ink</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusModalOpen(true)}
              className="p-2 rounded bg-vellum border border-carbon/25 text-carbon hover:bg-manilla transition-colors shadow-sm flex items-center gap-1.5 text-xs font-mono"
              aria-label="Open System Status"
              title="System Status"
            >
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <Activity className="w-3.5 h-3.5 text-carbon/70" />
            </button>
            <button
              onClick={() => handleNavigate('search')}
              className="p-2 rounded bg-vellum border border-carbon/25 text-carbon hover:bg-manilla transition-colors shadow-sm"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded bg-vellum border border-carbon/25 text-carbon hover:bg-manilla transition-colors shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Canvas with Responsive Editorial Margins */}
        <main className="flex-1 px-4 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-10 max-w-7xl w-full mx-auto">
          {currentView === 'home' && (
            <HomeView
              onSelectBook={handleSelectBook}
              onSearch={handleSearch}
              onSelectCluster={handleSelectCluster}
            />
          )}

          {currentView === 'search' && (
            <SearchResultsView
              searchQuery={searchQuery}
              selectedCluster={selectedCluster}
              onSelectBook={handleSelectBook}
              onSearch={handleSearch}
              onSelectCluster={handleSelectCluster}
              onClearFilter={() => setSelectedCluster(null)}
              onBackToHome={handleBackToHome}
            />
          )}

          {currentView === 'details' && selectedBookId && (
            <BookDetailsView
              bookId={selectedBookId}
              onSelectBook={handleSelectBook}
              onBack={handleBackToHome}
            />
          )}

          {currentView === 'about' && (
            <AboutView onBack={handleBackToHome} />
          )}
        </main>
      </div>
    </div>
  );
}
