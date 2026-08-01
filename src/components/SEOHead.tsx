// @ts-nocheck
"use client";
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from '@/utils/router-mock';
import { LANGUAGES } from '../context/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  faqData?: { question: string; answer: string }[];
}

export default function SEOHead({ title, description, faqData }: SEOHeadProps) {
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

      {faqData && faqData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
    </Helmet>
  );
}
