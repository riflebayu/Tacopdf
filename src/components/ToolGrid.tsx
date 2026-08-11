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
        className={`tool-card w-full text-left cursor-pointer flex flex-row md:flex-col items-center md:items-start p-3 md:p-5 rounded-xl md:rounded-2xl border relative h-full transition-all group ${
          isFavoriteSection
            ? 'bg-amber-950/30 border-amber-500/30 hover:bg-amber-900/50 hover:border-amber-500/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]'
            : isPopular
              ? 'popular-glow-card'
              : 'bg-[#2A2824]/50 border-white/10 hover:bg-[#2A2824]/80'
        }`}
      >
        {setting.badge ? (
          <span className="absolute -top-2.5 left-3 bg-error text-on-error text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm z-10">
            {setting.badge.toUpperCase()}
          </span>
        ) : isPopular ? (
          <span className="absolute -top-3 left-4 bg-amber-500 text-amber-950 border border-amber-400 text-[10px] md:text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-1.5 uppercase tracking-wide">
            🔥 {t('badge.popular', 'Popular Tool')}
          </span>
        ) : null}
        <div className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center p-2 md:p-4 lg:p-5 flex-shrink-0 mb-0 md:mb-5 text-primary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-200">
          <TacoIcon name={tool.icon} className="!w-full !h-full object-contain drop-shadow-sm" />
        </div>
        <div className="flex-grow flex flex-col mt-0 ml-3 md:ml-0 mr-8 md:mr-0">
          <h3 className="text-sm md:text-base font-bold text-white group-hover:text-primary-container transition-colors duration-150">
            {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}
          </h3>
          <p className="text-xs md:text-sm text-white/70 leading-snug mt-1 md:mt-2">
            {t(`seo.features.${tool.id.replace(/-/g, '_')}`, tool.description)}
          </p>
        </div>
        <div 
          onClick={(e) => toggleFavorite(e, tool.id)}
          className={`absolute right-3 top-3 md:right-5 md:top-5 p-1.5 rounded-full cursor-pointer transition-colors ${isFav ? 'text-yellow-500' : 'text-white/30 hover:text-yellow-500 group-hover:text-yellow-500 hover:bg-surface-container-high'}`}
          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Star size={16} className={isFav ? "fill-yellow-500" : ""} />
        </div>
      </LocalizedLink>
    );
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 space-y-8">
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 mb-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 mb-10">
          {getToolsByCategory('manipulation').map(t => renderToolCard(t, false))}
        </div>
      </div>

      {/* Security */}
      <div id="security" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.security')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 mb-10">
          {getToolsByCategory('security').map(t => renderToolCard(t, false))}
        </div>
      </div>

      {/* Format Conversion */}
      <div id="conversion" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.conversion')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 mb-10">
          {getToolsByCategory('conversion').map(t => renderToolCard(t, false))}
        </div>
      </div>

      {/* Editing */}
      <div id="editing" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
          {t('cat.editing')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 mb-10">
          {getToolsByCategory('editing').map(t => renderToolCard(t, false))}
        </div>
      </div>
    </section>
  );
}
