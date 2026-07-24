import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_ARTICLES } from '../data/blogData';
import LocalizedLink from './LocalizedLink';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogIndex() {
  const { lang, t } = useLanguage();
  const BASE_URL = 'https://tacopdf.com';

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
      <Helmet>
        <title>{t('nav.blog')} - TacoPDF</title>
        <meta name="description" content="Read the latest news, updates, and insights about PDF processing, privacy, and WebAssembly on the TacoPDF Blog." />
        <link rel="canonical" href={`${BASE_URL}${lang === 'en' ? '' : `/${lang}`}/blog`} />
      </Helmet>

      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-6">
          TacoPDF <span className="text-primary">Blog</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          Insights, updates, and guides on privacy-first PDF processing, client-side WebAssembly, and secure document management.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_ARTICLES.map((article) => {
          const translation = article.translations[lang] || article.translations['en'];
          const dateObj = new Date(article.lastUpdated);
          const formattedDate = dateObj.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });

          return (
            <article key={article.id} className="group bg-surface rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col h-full">
              <LocalizedLink to={`/blog/${translation.slug}`} className="block overflow-hidden relative aspect-video">
                <img 
                  src={article.featuredImage} 
                  alt={translation.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </LocalizedLink>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant mb-4">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-primary" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    <time dateTime={article.lastUpdated}>{formattedDate}</time>
                  </div>
                </div>

                <LocalizedLink to={`/blog/${translation.slug}`} className="block mb-4">
                  <h2 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {translation.title}
                  </h2>
                </LocalizedLink>
                
                <p className="text-sm text-on-surface-variant line-clamp-3 mb-6 flex-grow">
                  {translation.metaDescription}
                </p>

                <LocalizedLink to={`/blog/${translation.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:text-primary-container transition-colors mt-auto w-fit">
                  Read More <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </LocalizedLink>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
