import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { LANGUAGES } from '../context/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export default function SEOHead({ title, description }: SEOHeadProps) {
  const location = useLocation();
  const BASE_URL = 'https://tacopdf.com';
  
  // Extract path and identify current lang from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];
  
  let currentLang = 'en';
  if (firstSegment && LANGUAGES.some(l => l.code === firstSegment && l.code !== 'en')) {
    currentLang = firstSegment;
  }

  // Determine the clean path (without language prefix)
  let cleanPath = location.pathname;
  if (currentLang !== 'en') {
    cleanPath = cleanPath.replace(new RegExp(`^/${currentLang}`), '') || '/';
  }
  
  // Clean path should always start with / and remove trailing slash for consistency
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Determine Canonical URL
  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      
      <link rel="canonical" href={canonicalUrl} />

      {LANGUAGES.map((l) => {
        const href = l.code === 'en' 
          ? `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`
          : `${BASE_URL}/${l.code}${cleanPath === '/' ? '' : cleanPath}`;
          
        return <link key={l.code} rel="alternate" hrefLang={l.code} href={href} />;
      })}
      
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`} />
    </Helmet>
  );
}
