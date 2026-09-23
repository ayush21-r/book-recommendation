import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle2, AlertTriangle, Database, Cpu, Server, Globe, Layers, BookOpen, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function SystemStatusModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState(null);
  const [bookTotal, setBookTotal] = useState(null);
  const [latency, setLatency] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const [error, setError] = useState(null);

  const checkStatus = async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      // Call real backend /api/health and query catalog count
      const [health, catalog] = await Promise.all([
        api.getHealth(),
        api.getBooks({ page: 1, limit: 1 }).catch(() => null)
      ]);

      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      setHealthData(health);
      if (catalog && typeof catalog.total === 'number') {
        setBookTotal(catalog.total);
      }
      setLastChecked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      setError(err.message || 'Unable to reach the library engine.');
      setHealthData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isHealthy = healthData && healthData.status === 'ok' && healthData.database === 'connected' && healthData.ml_model === 'loaded';
  const isBackendUp = !!healthData;
  const isDbUp = healthData?.database === 'connected';
  const isMlUp = healthData?.ml_model === 'loaded';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-xs">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="system-status-title"
        className="relative w-full max-w-lg bg-parchment border-2 border-carbon rounded-lg shadow-folio p-6 sm:p-8 space-y-6 z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-carbon/15 pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-mono font-semibold text-carbon/60 block">
              Diagnostic Report
            </span>
            <h2 id="system-status-title" className="font-serif text-2xl font-bold text-carbon mt-0.5">
              System Status
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-carbon/70 hover:text-carbon hover:bg-manilla border border-carbon/20 transition-colors"
            aria-label="Close status dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Overall Status Banner */}
        {loading ? (
          <div className="p-4 bg-vellum border border-carbon/20 rounded-md flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-terracotta animate-spin flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-carbon">Checking library systems...</p>
              <p className="text-xs text-carbon/60">Querying FastAPI health & Supabase metrics</p>
            </div>
          </div>
        ) : error || !isHealthy ? (
          <div className="p-4 bg-terracotta-light/30 border border-terracotta/40 rounded-md flex items-center gap-3 text-terracotta-dark">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">
                {error ? 'System Unavailable' : 'Attention Required'}
              </p>
              <p className="text-xs text-carbon/80 mt-0.5">
                {error || 'One or more subsystem components reported degraded performance.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald/10 border border-emerald/30 rounded-md flex items-center gap-3 text-emerald">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald">
                All Systems Operational
              </p>
              <p className="text-xs text-carbon/80 mt-0.5">
                FastAPI, Supabase PostgreSQL, and the ML Engine are online.
              </p>
            </div>
          </div>
        )}

        {/* Subsystem Health Matrix */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-carbon/50 font-mono">
            Core Subsystems
          </h3>

          <div className="bg-vellum border border-carbon/15 rounded-md divide-y divide-carbon/10 text-xs">
            {/* Frontend */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-carbon/60" />
                <div>
                  <span className="font-semibold text-carbon">Frontend UI</span>
                  <span className="text-[10px] text-carbon/50 block">React 18 + Vite SPA</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono font-medium px-2 py-0.5 rounded bg-emerald/15 text-emerald border border-emerald/30 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                Running
              </span>
            </div>

            {/* Backend */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-carbon/60" />
                <div>
                  <span className="font-semibold text-carbon">Backend API</span>
                  <span className="text-[10px] text-carbon/50 block">
                    {latency ? `${latency}ms roundtrip latency` : 'FastAPI REST Service'}
                  </span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 font-mono font-medium px-2 py-0.5 rounded text-[11px] border ${
                isBackendUp 
                  ? 'bg-emerald/15 text-emerald border-emerald/30' 
                  : 'bg-terracotta/15 text-terracotta border-terracotta/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isBackendUp ? 'bg-emerald' : 'bg-terracotta'}`} />
                {isBackendUp ? 'Connected' : 'Unavailable'}
              </span>
            </div>

            {/* Database */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-carbon/60" />
                <div>
                  <span className="font-semibold text-carbon">Database</span>
                  <span className="text-[10px] text-carbon/50 block">Supabase PostgreSQL</span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 font-mono font-medium px-2 py-0.5 rounded text-[11px] border ${
                isDbUp 
                  ? 'bg-emerald/15 text-emerald border-emerald/30' 
                  : 'bg-terracotta/15 text-terracotta border-terracotta/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isDbUp ? 'bg-emerald' : 'bg-terracotta'}`} />
                {isDbUp ? 'Connected' : 'Unavailable'}
              </span>
            </div>

            {/* ML Recommendation Engine */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-carbon/60" />
                <div>
                  <span className="font-semibold text-carbon">ML Recommendation Engine</span>
                  <span className="text-[10px] text-carbon/50 block">TF-IDF + K-Means + Cosine Similarity</span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 font-mono font-medium px-2 py-0.5 rounded text-[11px] border ${
                isMlUp 
                  ? 'bg-emerald/15 text-emerald border-emerald/30' 
                  : 'bg-terracotta/15 text-terracotta border-terracotta/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isMlUp ? 'bg-emerald' : 'bg-terracotta'}`} />
                {isMlUp ? 'Loaded' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* Dataset & Architecture Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-vellum border border-carbon/15 rounded-md">
            <div className="flex items-center gap-1.5 text-carbon/60 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Library</span>
            </div>
            <p className="font-serif text-lg font-bold text-carbon">
              {bookTotal ? `${bookTotal.toLocaleString()} Books` : '4,763 Books'}
            </p>
          </div>

          <div className="p-3 bg-vellum border border-carbon/15 rounded-md">
            <div className="flex items-center gap-1.5 text-carbon/60 mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Semantic Clusters</span>
            </div>
            <p className="font-serif text-lg font-bold text-carbon">
              15 Clusters
            </p>
          </div>
        </div>

        {/* Footer with Timestamp and Action */}
        <div className="pt-2 border-t border-carbon/15 flex items-center justify-between text-xs text-carbon/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Last checked: {lastChecked || 'Just now'}</span>
          </div>

          <button
            onClick={checkStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-manilla hover:bg-manilla-dark rounded border border-carbon/25 text-carbon font-medium transition-colors tactile-btn disabled:opacity-50 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{error ? 'Try Again' : 'Refresh Status'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
