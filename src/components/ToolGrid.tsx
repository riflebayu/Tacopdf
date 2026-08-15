// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { TOOLS, CATEGORIES, getToolSeoPath } from '../data/tools';
import LocalizedLink from './LocalizedLink';
import TacoIcon from './TacoIcon';


import { useLanguage } from '../context/LanguageContext';

interface ToolGridProps {
  onSelectTool?: (id: string) => void;
  toolSettings?: Record<string, { enabled: boolean; badge: string }>;
}

export default function ToolGrid({ onSelectTool, toolSettings }: ToolGridProps) {
  const { t } = useLanguage();
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tacopdf-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    let newFavs;
    if (favorites.includes(id)) {
      newFavs = favorites.filter(f => f !== id);
    } else {
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
    try {
      localStorage.setItem('tacopdf-favorites', JSON.stringify(newFavs));
    } catch (_) {}
  };

  const getToolsByCategory = (catId: string) => {
    return TOOLS.filter((t) => t.category === catId).filter(t => toolSettings?.[t.id]?.enabled !== false);
  };

  const POPULAR_TOOL_IDS = ['merge'];

  const renderToolCard = (tool: typeof TOOLS[0], isFavoriteSection: boolean = false) => {
    const isFav = favorites.includes(tool.id);
    const setting = toolSettings?.[tool.id] || { enabled: true, badge: '' };
    const isPopular = POPULAR_TOOL_IDS.includes(tool.id);
    
    return (
      <LocalizedLink
        key={tool.id}
        to={getToolSeoPath(tool.id)}
        onClick={() => { if (onSelectTool) onSelectTool(tool.id); }}
        className={`tool-card w-full cursor-pointer relative flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border transition-all duration-150 active:scale-[0.97] group last:odd:col-span-2 md:last:odd:col-span-1 last:odd:flex-row last:odd:justify-start last:odd:text-left last:odd:p-4 last:odd:gap-3.5 md:last:odd:flex-col md:last:odd:justify-center md:last:odd:text-center md:last:odd:p-5 md:last:odd:gap-0 ${
          isFavoriteSection
            ? 'bg-amber-950/30 border-amber-500/30 hover:bg-amber-900/50 hover:border-amber-500/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]'
            : isPopular
              ? 'popular-glow-card'
              : 'bg-[#2A2824]/50 border-white/10 hover:bg-[#2A2824]/80'
        }`}
      >
        {setting.badge ? (
          <span className="absolute -top-2.5 left-2.5 sm:-top-3 sm:left-3 flex items-center gap-1 bg-red-500 text-white border border-red-400 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md z-20">
            {setting.badge.toUpperCase()}
          </span>
        ) : isPopular ? (
          <span className="absolute -top-2.5 left-2.5 sm:-top-3 sm:left-3 bg-amber-500 text-amber-950 border border-amber-400 text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md z-20 flex items-center gap-1 uppercase tracking-wide">
            🔥 {t('badge.popular', 'Popular Tools')}
          </span>
        ) : null}
        
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center p-2 sm:p-2.5 md:p-3 object-contain mb-2 group-last:odd:mb-0 md:group-last:odd:mb-2 flex-shrink-0 text-primary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-200">
          <TacoIcon name={tool.icon} className="!w-full !h-full object-contain drop-shadow-sm" />
        </div>
        
        <div className="w-full flex flex-col items-center group-last:odd:items-start group-last:odd:text-left md:group-last:odd:items-center md:group-last:odd:text-center">
          <h3 className="text-xs sm:text-sm md:text-base font-medium md:font-bold text-slate-100 group-hover:text-primary-container leading-snug line-clamp-2 px-1 text-center group-last:odd:text-left md:group-last:odd:text-center transition-colors duration-150">
            {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}
          </h3>
          <p className="hidden md:block group-last:odd:block text-xs text-white/70 leading-snug mt-1 md:mt-2 text-center group-last:odd:text-left md:group-last:odd:text-center">
            {t(`seo.features.${tool.id.replace(/-/g, '_')}`, tool.description)}
          </p>
        </div>

        <div 
          onClick={(e) => toggleFavorite(e, tool.id)}
          className={`absolute top-2 right-2 p-1.5 rounded-full cursor-pointer transition-colors z-10 ${isFav ? 'text-yellow-500' : 'text-zinc-500 hover:text-amber-400'}`}
          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Star size={16} className={isFav ? "fill-yellow-500" : ""} />
        </div>
      </LocalizedLink>
    );
  };

  return (
    <section className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-8 py-6 space-y-8">
      
      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2">
            <h2 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
              <Star className="fill-yellow-500" size={24} /> {t('favorites.title', 'Favorite Tools')}
            </h2>
            <button
              onClick={() => {
                if (window.confirm(t('favorites.confirm_reset', 'Are you sure you want to clear all your favorite tools?'))) {
                  localStorage.removeItem('tacopdf-favorites');
                  setFavorites([]);
                }
              }}
              className="text-xs font-semibold text-on-surface-variant hover:text-error transition-colors flex items-center gap-1.5 bg-surface-container-lowest hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-outline-variant/60 shadow-sm cursor-pointer"
            >
              <Trash2 size={14} /> {t('favorites.reset', 'Reset Favorites')}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mt-4 mb-10">
            {favorites.map(favId => {
              const tool = TOOLS.find(t => t.id === favId);
              return tool ? renderToolCard(tool, true) : null;
            })}
          </div>
        </div>
      )}


      {/* Page Manipulation */}
      <div id="manipulation" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.manipulation')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mt-4 mb-10">
          {getToolsByCategory('manipulation').map(t => renderToolCard(t, false))}
        </div>
      </div>

      {/* Security */}
      <div id="security" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.security')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mt-4 mb-10">
          {getToolsByCategory('security').map(t => renderToolCard(t, false))}
        </div>
      </div>

      {/* Format Conversion */}
      <div id="conversion" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.conversion')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mt-4 mb-10">
          {getToolsByCategory('conversion').map(t => renderToolCard(t, false))}
        </div>
      </div>

      {/* Editing */}
      <div id="editing" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.editing')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mt-4 mb-10">
          {getToolsByCategory('editing').map(t => renderToolCard(t, false))}
        </div>
      </div>
    </section>
  );
}
