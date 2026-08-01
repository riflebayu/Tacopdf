// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { TOOLS, CATEGORIES, getToolSeoPath } from '../data/tools';
import LocalizedLink from './LocalizedLink';
import TacoIcon from './TacoIcon';


import { useLanguage } from '../context/LanguageContext';

interface ToolGridProps {
  onSelectTool: (id: string) => void;
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

  const renderToolCard = (tool: typeof TOOLS[0]) => {
    const isFav = favorites.includes(tool.id);
    const setting = toolSettings?.[tool.id] || { enabled: true, badge: '' };
    
    return (
      <LocalizedLink
        key={tool.id}
        to={getToolSeoPath(tool.id)}
        onClick={(e) => { e.preventDefault(); onSelectTool(tool.id); }}
        className="tool-card w-full text-left bg-surface-container border border-outline-variant rounded-xl p-6 flex gap-4 group cursor-pointer relative hover:border-primary/50 transition-colors block"
      >
        {setting.badge && (
          <span className="absolute -top-2 right-2 bg-error text-on-error text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm z-10">
            {setting.badge.toUpperCase()}
          </span>
        )}
        <div className="bg-surface-container-highest border border-outline-variant/30 p-3 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-200 shrink-0 self-start">
          <TacoIcon name={tool.icon} size={72} />
        </div>
        <div className="flex-grow pr-8">
          <h3 className="font-bold text-base text-on-surface group-hover:text-primary-container transition-colors duration-150">
            {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}
          </h3>
          <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
            {t(`seo.features.${tool.id.replace(/-/g, '_')}`, tool.description)}
          </p>
        </div>
        <div 
          onClick={(e) => toggleFavorite(e, tool.id)}
          className={`absolute top-4 right-4 p-2 rounded-full cursor-pointer transition-colors ${isFav ? 'text-yellow-500' : 'text-outline-variant hover:text-yellow-500 hover:bg-surface-container-high'}`}
          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Star size={18} className={isFav ? "fill-yellow-500" : ""} />
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
              <Star className="fill-yellow-500" size={24} /> Favorite Tools
            </h2>
            <button
              onClick={() => {
                if (window.confirm(t('favorites.confirm_reset') || 'Are you sure you want to clear all your favorite tools?')) {
                  localStorage.removeItem('tacopdf-favorites');
                  setFavorites([]);
                }
              }}
              className="text-xs font-semibold text-on-surface-variant hover:text-error transition-colors flex items-center gap-1.5 bg-surface-container-lowest hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-outline-variant/60 shadow-sm cursor-pointer"
            >
              <Trash2 size={14} /> {t('favorites.reset') || 'Reset Favorites'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(favId => {
              const tool = TOOLS.find(t => t.id === favId);
              return tool ? renderToolCard(tool) : null;
            })}
          </div>
        </div>
      )}


      {/* Row 1: Page Manipulation & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Page Manipulation Column */}
        <div id="manipulation" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
            {t('cat.manipulation')}
          </h2>
          <div className="grid gap-4">
            {getToolsByCategory('manipulation').map(renderToolCard)}
          </div>
        </div>

        {/* Security Column */}
        <div id="security" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
            {t('cat.security')}
          </h2>
          <div className="grid gap-4">
            {getToolsByCategory('security').map(renderToolCard)}
          </div>
        </div>
      </div>

      {/* Row 2: Format Conversion & Editing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Format Conversion Column */}
        <div id="conversion" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
            {t('cat.conversion')}
          </h2>
          <div className="grid gap-4">
            {getToolsByCategory('conversion').map(renderToolCard)}
          </div>
        </div>

        {/* Editing Column */}
        <div id="editing" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
            {t('cat.editing')}
          </h2>
          <div className="grid gap-4">
            {getToolsByCategory('editing').map(renderToolCard)}
          </div>
        </div>
      </div>
    </section>
  );
}
