"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Banner from './Banner';
import ToolGrid from './ToolGrid';
import SEOSection from './SEOSection';
import FAQSection from './FAQSection';

export default function HomePageClient({ lang }: { lang: string }) {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col w-full bg-background">
      <Banner />

      {/* Hero Section — uses useLanguage() so all 7 languages render correctly */}
      <section
        className="pt-10 pb-10 md:pt-16 md:pb-20 px-4 text-center max-w-4xl mx-auto w-full"
        id="beranda-atas"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-on-surface mb-3 md:mb-6 leading-tight tracking-tight">
          {t('home.title', 'TacoPDF - Free & Secure Online PDF Tools')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto">
          {t('home.subtitle', 'Process PDFs locally in your browser. Maximum privacy and security.')}
        </p>
      </section>

      <ToolGrid />
      <SEOSection />
      <FAQSection />
    </main>
  );
}
