import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    onGoHome('manipulation');
  };

  return (
    <header className="bg-background border-b border-outline-variant docked full-width top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-20">
        {/* Logo */}
        <LocalizedLink to="/" className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity" onClick={() => onGoHome()}>
          <img src="/logo.webp" alt="TacoPDF Logo" width="48" height="48" className="w-12 h-12 drop-shadow-sm rounded-lg" />
          <span className="font-extrabold text-2xl tracking-tight text-on-surface">TacoPDF</span>
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

            {/* Mega Menu Dropdown — always in DOM for SEO crawlability */}
            <div className={`absolute top-[80%] right-1/2 translate-x-1/2 z-50 w-[520px] bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-4 mt-2 transition-all duration-150 ${
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
            to="/#manipulation"
            onClick={handleAllToolsClick}
            className="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer"
          >
            {t('nav.all_tools')}
          </LocalizedLink>

          <LocalizedLink 
            to="/blog"
            className="hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer text-on-surface-variant"
          >
            {t('nav.blog')}
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
            
            <div className={`absolute top-[80%] right-0 z-50 w-44 bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-2 mt-2 transition-all duration-150 ${
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
          {/* Mobile Language Dropdown — always in DOM with <a> links for SEO */}
          <div className="relative flex items-center">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-on-surface-variant p-2 rounded-lg hover:bg-surface-container transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="text-xl leading-none">{currentLanguage.flag}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-[100%] right-0 z-50 w-44 bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-2 mt-2 transition-all duration-150 ${
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


          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-on-surface-variant p-2 rounded-lg hover:bg-surface-container transition-all"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — always in DOM for SEO crawlability */}
      <div className={`md:hidden bg-surface-container-low overflow-hidden transition-all duration-200 ${
        isMobileMenuOpen ? 'max-h-[80vh] opacity-100 border-t border-outline-variant' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/50">
              <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">{t('nav.tools')}</span>
              <div className="flex gap-3">
                <LocalizedLink 
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-primary-container underline cursor-pointer"
                >
                  {t('nav.blog')}
                </LocalizedLink>
                <LocalizedLink 
                  to="/#manipulation"
                  onClick={handleAllToolsClick}
                  className="text-sm font-semibold text-primary-container underline cursor-pointer"
                >
                  {t('nav.all_tools')}
                </LocalizedLink>
              </div>
            </div>


            <div className="grid grid-cols-1 gap-6 max-h-[50vh] overflow-y-auto pr-2">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {t('cat.' + cat.id, cat.name)}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {TOOLS.filter((t) => t.category === cat.id).map((tool) => (
                      <LocalizedLink
                        key={tool.id}
                        to={getToolSeoPath(tool.id)}
                        onClick={() => handleToolClick(tool.id)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-surface-container/50 border border-outline-variant/30 text-xs text-primary hover:bg-surface-container text-left"
                      >
                        <TacoIcon name={tool.icon} size={32} />
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
