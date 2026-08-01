// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@/utils/router-mock';
import LocalizedLink from './LocalizedLink';
import { Menu, X, ChevronDown } from 'lucide-react';
import { TOOLS, CATEGORIES, getToolSeoPath } from '../data/tools';
import TacoIcon from './TacoIcon';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

interface NavbarProps {
  onSelectTool: (id: string) => void;
  onGoHome: (scrollToId?: string) => void;
  activeToolId: string | null;
}

export default function Navbar({ onSelectTool, onGoHome, activeToolId }: NavbarProps) {
  const { lang, t, setLang, currentLanguage } = useLanguage();
  const location = useLocation();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Build proper <a> href for each language (for SEO crawlability)
  const getLanguageHref = (targetLangCode: string) => {
    let currentPath = location.pathname;
    // Strip current language prefix if present
    if (lang !== 'en') {
      currentPath = currentPath.replace(new RegExp(`^/${lang}`), '') || '/';
    }
    // Prepend target language prefix
    if (targetLangCode === 'en') {
      return currentPath || '/';
    }
    return `/${targetLangCode}${currentPath === '/' ? '' : currentPath}`;
  };

  // Close dropdowns only on significant scroll (mobile UX fix for touch wobble)
  useEffect(() => {
    if (!isLangOpen && !isMobileMenuOpen && !isToolsOpen) return;
    
    let isStable = false;
    const timer = setTimeout(() => {
      isStable = true;
    }, 300); // Wait 300ms before allowing scroll to close the menus
    
    const startScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (!isStable) return; // Ignore layout shifts or momentum scrolls immediately after opening
      if (Math.abs(window.scrollY - startScrollY) > 30) {
        setIsLangOpen(false);
        setIsMobileMenuOpen(false);
        setIsToolsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLangOpen, isMobileMenuOpen, isToolsOpen]);

  // Close on route change
  useEffect(() => {
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    setIsToolsOpen(false);
  }, [location.pathname]);

  const handleToolClick = (id: string) => {
    onSelectTool(id);
    setIsToolsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleGoFAQ = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onGoHome('faq');
  };

  const handleAllToolsClick = () => {
    setIsMobileMenuOpen(false);
    setIsToolsOpen(false);
    onGoHome(); // Without arg, this goes to top (beranda atas)
  };

  return (
    <header className="bg-background border-b border-outline-variant docked full-width top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-20">
        {/* Logo */}
        <LocalizedLink to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group hover:opacity-90 transition-opacity" onClick={() => onGoHome()}>
          <img src="/logo.webp" alt="TacoPDF Logo" width="48" height="48" className="w-9 h-9 md:w-12 md:h-12 drop-shadow-sm rounded-lg" />
          <span className="font-extrabold text-xl md:text-2xl tracking-tight text-on-surface">TacoPDF</span>
        </LocalizedLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 h-full">
          {/* Tools Mega Dropdown */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button 
              onClick={handleAllToolsClick}
              className={`text-primary border-b-2 pb-1 font-semibold text-sm flex items-center gap-1 hover:text-primary-container transition-all cursor-pointer ${
                isToolsOpen || activeToolId ? 'border-primary' : 'border-transparent'
              }`}
            >
              {t('nav.tools')}
              <ChevronDown size={14} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Invisible bridge prevents gap between button and dropdown from firing onMouseLeave */}
            <div className="absolute top-[60%] left-0 right-0 h-[50%]" />

            {/* Mega Menu Dropdown — always in DOM for SEO crawlability */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 z-50 w-[520px] bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-4 transition-all duration-150 ${
              isToolsOpen ? 'opacity-100 pointer-events-auto visible scale-100' : 'opacity-0 pointer-events-none invisible scale-95'
            }`}>
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                {CATEGORIES.map((cat) => {
                  const catTools = TOOLS.filter((t) => t.category === cat.id);
                  return (
                    <div key={cat.id} className="space-y-1.5">
                      <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/35 pb-1">
                        {t('cat.' + cat.id, cat.name)}
                      </h3>
                      <ul className="space-y-0.5">
                        {catTools.map((tool) => (
                          <li key={tool.id}>
                            <LocalizedLink
                              to={getToolSeoPath(tool.id)}
                              onClick={() => handleToolClick(tool.id)}
                              className="w-full text-left font-medium text-xs text-primary hover:text-primary-container hover:underline flex items-center gap-1.5 py-0.5 cursor-pointer group"
                            >
                              <span className="text-on-surface-variant group-hover:text-primary-container transition-colors flex-shrink-0">
                                <TacoIcon name={tool.icon} size={20} />
                              </span>
                              {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}
                            </LocalizedLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <LocalizedLink 
            to="/"
            onClick={handleAllToolsClick}
            className="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer"
          >
            {t('nav.all_tools')}
          </LocalizedLink>


          <LocalizedLink to="/faq" className="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer" onClick={handleGoFAQ}>
            {t('nav.faq')}
          </LocalizedLink>


          {/* Language Dropdown — always in DOM with <a> links for SEO */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <button 
              className="text-on-surface-variant hover:text-primary-container font-semibold text-sm flex items-center gap-1.5 transition-all cursor-pointer border border-outline-variant/30 px-3 py-1.5 rounded-full bg-surface-container/30 hover:bg-surface-container/70"
            >
              <span className="text-base leading-none">{currentLanguage.flag}</span>
              <span className="uppercase text-xs tracking-wider">{currentLanguage.code}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Invisible bridge prevents gap from firing onMouseLeave */}
            <div className="absolute top-[60%] left-0 right-0 h-[50%]" />
            
            <div className={`absolute top-full right-0 z-50 w-44 bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-2 transition-all duration-150 ${
              isLangOpen ? 'opacity-100 pointer-events-auto visible scale-100' : 'opacity-0 pointer-events-none invisible scale-95'
            }`}>
              <ul className="space-y-0.5">
                {LANGUAGES.map((langItem) => (
                  <li key={langItem.code}>
                    <Link
                      to={getLanguageHref(langItem.code)}
                      onClick={(e) => {
                        e.preventDefault();
                        setLang(langItem.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left font-semibold text-xs flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ${
                        langItem.code === currentLanguage.code 
                          ? 'bg-primary-container text-on-primary-container' 
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                      }`}
                    >
                      <span className="text-base leading-none">{langItem.flag}</span>
                      <span>{langItem.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-1 md:hidden">
          {/* Mobile Language Dropdown — fixed position to escape overflow:hidden parent */}
          <div className="relative flex items-center">
            <button 
              onClick={() => { setIsLangOpen(!isLangOpen); setIsMobileMenuOpen(false); }}
              className="text-on-surface-variant p-1.5 rounded-lg hover:bg-surface-container transition-all flex items-center gap-0.5 cursor-pointer"
            >
              <span className="text-lg leading-none">{currentLanguage.flag}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`fixed top-14 right-2 z-[200] w-40 bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-1.5 transition-all duration-150 ${
              isLangOpen ? 'opacity-100 pointer-events-auto visible scale-100' : 'opacity-0 pointer-events-none invisible scale-95'
            }`}>
              <ul className="space-y-0.5">
                {LANGUAGES.map((langItem) => (
                  <li key={langItem.code}>
                    <Link
                      to={getLanguageHref(langItem.code)}
                      onClick={(e) => {
                        e.preventDefault();
                        setLang(langItem.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left font-semibold text-[11px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-150 ${
                        langItem.code === currentLanguage.code 
                          ? 'bg-primary-container text-on-primary-container' 
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                      }`}
                    >
                      <span className="text-sm leading-none">{langItem.flag}</span>
                      <span>{langItem.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsLangOpen(false); }}
            className="text-on-surface-variant p-1.5 rounded-lg hover:bg-surface-container transition-all"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — always in DOM for SEO crawlability */}
      <div className={`md:hidden bg-surface-container-low overflow-hidden transition-all duration-200 ${
        isMobileMenuOpen ? 'max-h-[80vh] opacity-100 border-t border-outline-variant' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-3 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-1.5 border-b border-outline-variant/50">
              <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">{t('nav.tools')}</span>
              <div className="flex gap-2">

                <LocalizedLink 
                  to="/"
                  onClick={handleAllToolsClick}
                  className="text-[11px] font-semibold text-primary-container underline cursor-pointer"
                >
                  {t('nav.all_tools')}
                </LocalizedLink>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    {t('cat.' + cat.id, cat.name)}
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TOOLS.filter((t) => t.category === cat.id).map((tool) => (
                      <LocalizedLink
                        key={tool.id}
                        to={getToolSeoPath(tool.id)}
                        onClick={() => handleToolClick(tool.id)}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-surface-container/50 border border-outline-variant/30 text-[11px] text-primary hover:bg-surface-container text-left"
                      >
                        <TacoIcon name={tool.icon} size={18} />
                        <span className="truncate">{t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}</span>
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
