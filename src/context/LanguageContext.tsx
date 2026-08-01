// @ts-nocheck
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from '@/utils/router-mock';
import { TRANSLATIONS } from '../data/translations';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

interface LanguageContextType {
  lang: string;
  setLang: (code: string) => void;
  t: (key: string, fallback?: string) => string;
  currentLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current language from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];

  let lang = 'en';
  if (firstSegment && LANGUAGES.some(l => l.code === firstSegment && l.code !== 'en')) {
    lang = firstSegment;
  }

  // Handle redirect if user visits /en/... manually (English should be at root)
  useEffect(() => {
    if (firstSegment === 'en') {
      const newPath = '/' + pathParts.slice(1).join('/') + location.search + location.hash;
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, navigate, firstSegment, pathParts]);

  const setLang = (code: string) => {
    if (code === lang) return;
    
    try {
      localStorage.setItem('tacopdf-language', code);
    } catch (_) {}

    let newPath = location.pathname;
    
    // Strip current lang prefix if exists
    if (lang !== 'en') {
      newPath = newPath.replace(new RegExp(`^/${lang}`), '') || '/';
    }
    

    // Prepend new lang prefix if it's not English
    if (code !== 'en') {
      newPath = `/${code}${newPath === '/' ? '' : newPath}`;
    }
    
    navigate(newPath + location.search + location.hash);
  };

  const t = (key: string, fallback?: string): string => {
    const dictionary = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    return dictionary[key] || TRANSLATIONS['en'][key] || fallback || key;
  };

  const currentLanguage = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
