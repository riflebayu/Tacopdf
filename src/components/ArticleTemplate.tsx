import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { getArticleByAnySlug } from '../data/blogData';
import LocalizedLink from './LocalizedLink';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface ArticleTemplateProps {
  slug: string;
}

// Simple Markdown Parser to convert string content to React nodes
const renderMarkdown = (content: string) => {
  const blocks = content.split('\n\n');
  
  return blocks.map((block, index) => {
    // Handle h3
    if (block.startsWith('### ')) {
      return (
        <h3 key={index} className="text-xl font-bold text-on-surface mt-8 mb-4">
          {block.replace('### ', '')}
        </h3>
      );
    }
    // Handle h2
    if (block.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-bold text-primary mt-10 mb-5 border-b border-outline-variant/30 pb-2">
          {block.replace('## ', '')}
        </h2>
      );
    }
    // Handle Images ![alt](url)
    const imgMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      return (
        <figure key={index} className="my-8">
          <img 
            src={imgMatch[2]} 
            alt={imgMatch[1]} 
            loading="lazy" 
            className="w-full h-auto rounded-2xl shadow-md border border-outline-variant/30"
          />
          {imgMatch[1] && (
            <figcaption className="text-center text-sm text-on-surface-variant mt-3 italic">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
    }
    
    // Parse inline bold (**text**) and links ([text](url)) within paragraphs
    const parseInline = (text: string, pIndex: number) => {
      // Very basic regex tokenization for inline elements
      const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-on-surface">{part.slice(2, -2)}</strong>;
        }
        
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];
          // Use LocalizedLink for internal tools routing
          if (linkUrl.startsWith('/')) {
            return (
              <LocalizedLink key={i} to={linkUrl} className="text-primary hover:text-primary-container underline font-medium transition-colors">
                {linkText}
              </LocalizedLink>
            );
          }
          // External links
          return (
            <a key={i} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-container underline font-medium transition-colors">
              {linkText}
            </a>
          );
        }
        
        return <React.Fragment key={i}>{part}</React.Fragment>;
      });
    };

    // Default to paragraph
    return (
      <p key={index} className="text-on-surface-variant leading-relaxed mb-6 text-lg">
        {parseInline(block, index)}
      </p>
    );
  });
};

export default function ArticleTemplate({ slug }: ArticleTemplateProps) {
  const { lang, t } = useLanguage();
  const article = getArticleByAnySlug(slug, lang);

  if (!article) {
    // Redirect to the blog index of the current language if the slug does not match
    return <Navigate replace to="/blog" />;
  }

  // Fallback to English if translation is missing
  const translation = article.translations[lang] || article.translations['en'];
  
  const BASE_URL = 'https://tacopdf.com';
  
  // Format Date for Display and JSON-LD
  const dateObj = new Date(article.lastUpdated);
  const formattedDate = dateObj.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const schemaJSON = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": translation.title,
    "image": [
      article.featuredImage
    ],
    "datePublished": article.lastUpdated,
    "dateModified": article.lastUpdated,
    "author": [{
      "@type": "Organization",
      "name": article.author,
      "url": BASE_URL
    }],
    "publisher": {
      "@type": "Organization",
      "name": "TacoPDF",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "description": translation.metaDescription
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
      <Helmet>
        <title>{translation.title} - TacoPDF Blog</title>
        <meta name="description" content={translation.metaDescription} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${translation.title} - TacoPDF Blog`} />
        <meta property="og:description" content={translation.metaDescription} />
        <meta property="og:image" content={article.featuredImage} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${translation.title} - TacoPDF Blog`} />
        <meta name="twitter:description" content={translation.metaDescription} />
        <meta name="twitter:image" content={article.featuredImage} />

        {/* E-E-A-T Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(schemaJSON)}
        </script>

        {/* Canonical and Hreflang logic for the specific article */}
        <link rel="canonical" href={`${BASE_URL}${lang === 'en' ? '' : `/${lang}`}/blog/${translation.slug}`} />
        
        {LANGUAGES.map((l) => {
          const lTranslation = article.translations[l.code] || article.translations['en'];
          return (
            <link 
              key={l.code} 
              rel="alternate" 
              hrefLang={l.code} 
              href={`${BASE_URL}${l.code === 'en' ? '' : `/${l.code}`}/blog/${lTranslation.slug}`} 
            />
          );
        })}
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/blog/${article.translations['en'].slug}`} />
      </Helmet>

      {/* Back Link */}
      <div className="mb-10">
        <LocalizedLink to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-medium transition-colors">
          <ArrowLeft size={18} /> {t('nav.blog') || 'Back to Blog'}
        </LocalizedLink>
      </div>

      {/* Header Anatomy */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight mb-6">
          {translation.title}
        </h1>
        
        {/* E-E-A-T Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-sm font-medium border-b border-outline-variant/30 pb-6">
          <div className="flex items-center gap-2">
            <User size={18} className="text-primary" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <time dateTime={article.lastUpdated}>{formattedDate}</time>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <figure className="mb-16">
        <img 
          src={article.featuredImage} 
          alt={translation.title}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-xl border border-outline-variant/20"
          fetchPriority="high"
        />
      </figure>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {renderMarkdown(translation.content)}
      </div>

      {/* Author Bio (E-E-A-T Enhancement) */}
      <footer className="mt-20 pt-10 border-t border-outline-variant/30">
        <div className="flex items-center gap-6 bg-surface-variant/30 p-8 rounded-3xl">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
            <User size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-on-surface mb-2">Written by {article.author}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              TacoPDF is dedicated to providing privacy-first, ultra-fast WebAssembly utilities directly inside your browser. Our engineering team shares insights on web technologies, client-side computing, and data privacy.
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}
