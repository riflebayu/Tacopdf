import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

interface PageSEOProps {
  title?: string;
  description?: string;
  faqData?: { question: string; answer: string }[];
}

export default function PageSEO({ title, description, faqData }: PageSEOProps) {
  const { lang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Cleaned up manual DOM manipulation useEffect which doesn't work during SSG

  const defaultTitle = t('hero.title') || "TacoPDF - Free & Secure Online PDF Tools";
  const defaultDesc = t('hero.subtitle') || "Process PDFs locally in your browser. Maximum privacy and security.";
  
  const finalTitle = title ? `${title} - TacoPDF` : defaultTitle;
  const finalDesc = description || defaultDesc;

  // Canonical and Hreflang logic
  const BASE_URL = 'https://tacopdf.com';
  
  let cleanPath = location.pathname;
  if (lang !== 'en') {
    cleanPath = cleanPath.replace(new RegExp(`^/${lang}`), '') || '/';
  }
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      
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
