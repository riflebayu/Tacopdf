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
      
      {/* E-E-A-T Author & Trust Signals */}
      <meta name="author" content="Muhammad Bayu Edi" />
      <meta name="creator" content="Muhammad Bayu Edi" />
      <meta name="publisher" content="TacoPDF" />
      
      <link rel="canonical" href={canonicalUrl} />

      {LANGUAGES.map((l) => {
        const href = l.code === 'en' 
          ? `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`
          : `${BASE_URL}/${l.code}${cleanPath === '/' ? '' : cleanPath}`;
          
        return <link key={l.code} rel="alternate" hrefLang={l.code} href={href} />;
      })}
      
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`} />

      {/* SoftwareApplication Schema (Web App) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "TacoPDF",
          "url": BASE_URL,
          "description": "Secure, fast, and 100% free client-side PDF utility tool. Merge, split, compress, and edit PDF files directly in your browser without uploading to any server.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Works best on modern browsers supporting WebAssembly.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Person",
            "name": "Muhammad Bayu Edi",
            "url": "https://github.com/riflebayu"
          },
          "publisher": {
            "@type": "Organization",
            "name": "TacoPDF",
            "url": BASE_URL
          }
        })}
      </script>

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
