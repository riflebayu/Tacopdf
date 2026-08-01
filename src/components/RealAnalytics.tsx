// @ts-nocheck
"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Users, Globe, Wrench, RefreshCw } from 'lucide-react';
import { TOOLS } from '../data/tools';

export function RealAnalytics() {
  const [totalVisits, setTotalVisits] = useState(0);
  const [countries, setCountries] = useState<[string, number][]>([]);
  const [toolStats, setToolStats] = useState<[string, number][]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnalytics = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
      const fetchWithTimeout = (ref: any) => Promise.race([getDoc(ref), timeout(3000)]) as Promise<any>;

      // Fetch daily stats (visits and countries)
      const statsRef = doc(db, 'analytics', 'daily_stats');
      const statsSnap = await fetchWithTimeout(statsRef);
      
      if (statsSnap && statsSnap.exists && statsSnap.exists()) {
        const data = statsSnap.data();
        setTotalVisits(data.total_visits || 0);
        
        if (data.countries) {
          const countryArray = Object.entries(data.countries) as [string, number][];
          countryArray.sort((a, b) => b[1] - a[1]);
          setCountries(countryArray.slice(0, 5));
        }
      }

      // Fetch tool usage stats
      const toolsRef = doc(db, 'analytics', 'tool_stats');
      const toolsSnap = await fetchWithTimeout(toolsRef);
      
      if (toolsSnap && toolsSnap.exists && toolsSnap.exists()) {
        const data = toolsSnap.data();
        const toolsArray = Object.entries(data) as [string, number][];
        toolsArray.sort((a, b) => b[1] - a[1]);
        setToolStats(toolsArray.slice(0, 5));
      }
    } catch (error) {
      console.warn("Analytics fetch error (Firebase might be empty/offline):", error);
      // If it fails, fallback to zero/empty instead of fake data
      setTotalVisits(0);
      setCountries([]);
      setToolStats([]);
    } finally {
      setLoading(false);
      if (manual) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const intervalId = setInterval(fetchAnalytics, 3600000); // 1 hour

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-primary">
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Memuat Data Analitik...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {/* Global Refresh Overlay Spinner (Optional) or just per-button */}
      
      {/* Visitors Card */}
      <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
        <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-on-surface">Total Pengunjung</h3>
          </div>
          <button onClick={() => fetchAnalytics(true)} disabled={isRefreshing} className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Refresh">
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        <p className="text-4xl font-extrabold text-primary">{totalVisits}</p>
        <p className="text-sm text-on-surface-variant mt-2">Sepanjang Waktu (Unik)</p>
      </div>

      {/* Top Countries Card */}
      <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
        <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Globe size={20} />
            </div>
            <h3 className="font-bold text-on-surface">Asal Negara (Top 5)</h3>
          </div>
          <button onClick={() => fetchAnalytics(true)} disabled={isRefreshing} className="text-on-surface-variant hover:text-secondary transition-colors p-1" title="Refresh">
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        <div className="space-y-3">
          {countries.length > 0 ? countries.map(([country, count], index) => (
            <div key={country} className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                <span className="text-on-surface-variant text-xs">{index + 1}.</span> {country}
              </span>
              <span className="text-sm font-bold text-secondary">{count}</span>
            </div>
          )) : <p className="text-sm text-on-surface-variant">Belum ada data negara.</p>}
        </div>
      </div>

      {/* Top Tools Card */}
      <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
        <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <Wrench size={20} />
            </div>
            <h3 className="font-bold text-on-surface">Alat Populer (Top 5)</h3>
          </div>
          <button onClick={() => fetchAnalytics(true)} disabled={isRefreshing} className="text-on-surface-variant hover:text-tertiary transition-colors p-1" title="Refresh">
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        <div className="space-y-3">
          {toolStats.length > 0 ? toolStats.map(([toolId, count], index) => {
            const toolName = TOOLS.find(t => t.id === toolId)?.name || toolId;
            return (
              <div key={toolId} className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface flex items-center gap-2 truncate max-w-[150px]">
                  <span className="text-on-surface-variant text-xs">{index + 1}.</span> {toolName}
                </span>
                <span className="text-sm font-bold text-tertiary">{count}x</span>
              </div>
            );
          }) : <p className="text-sm text-on-surface-variant">Belum ada alat yang digunakan.</p>}
        </div>
      </div>
    </div>
  );
}
