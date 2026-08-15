"use client";
import React from 'react';
import { UserCheck, ImageOff, CloudOff, ShieldCheck } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import Banner from './Banner';
import ToolGrid from './ToolGrid';
import SEOSection from './SEOSection';
import { FAQSectionContent } from './FAQSection';

function HomePageContent() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col w-full bg-background">
      <Banner />

      {/* Hero Section — uses useLanguage() so all 7 languages render correctly */}
      <section
        className="relative pt-10 pb-10 md:pt-16 md:pb-20 px-4 text-center w-full flex flex-col items-center justify-center overflow-hidden max-md:bg-gradient-to-b max-md:from-primary/10 max-md:to-background max-md:border-b max-md:border-outline-variant/30"
        id="beranda-atas"
      >
        {/* Subtle Radial Glow */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-[#fbbf24] opacity-15 blur-[80px] rounded-full pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-balance text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-on-surface mb-3 md:mb-6 leading-tight tracking-tight">
            {t('home.title', 'Manage PDF Files Fast, Free & Secure')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto">
            {t('home.subtitle', 'Process documents directly in your browser. Total privacy with zero file storage.')}
          </p>

          {/* Feature Badges under Subtitle (Responsive 2x2 Grid on Mobile, Flex Row on Desktop) */}
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap items-center justify-center gap-2 md:gap-3 max-w-sm sm:max-w-md md:max-w-none mx-auto mt-5 md:mt-6 text-[11px] md:text-xs font-semibold text-primary">
            <span className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/25 shadow-sm text-center">
              <UserCheck size={14} className="text-primary-container shrink-0" />
              <span className="truncate md:overflow-visible">{t('header.badge.noRegistration', 'No Registration')}</span>
            </span>
            <span className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/25 shadow-sm text-center">
              <ImageOff size={14} className="text-primary-container shrink-0" />
              <span className="truncate md:overflow-visible">{t('header.badge.noWatermark', 'No Watermark')}</span>
            </span>
            <span className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/25 shadow-sm text-center">
              <CloudOff size={14} className="text-primary-container shrink-0" />
              <span className="truncate md:overflow-visible">{t('header.badge.offline', '100% Offline')}</span>
            </span>
            <span className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/25 shadow-sm text-center">
              <ShieldCheck size={14} className="text-primary-container shrink-0" />
              <span className="truncate md:overflow-visible">{t('header.badge.fastSecure', 'Fast & Highly Secure')}</span>
            </span>
          </div>
        </div>
      </section>

      <ToolGrid />
      <SEOSection />
      <FAQSectionContent />
    </main>
  );
}

export default function HomePageClient({ lang }: { lang: string }) {
  return (
    <LanguageProvider initialLang={lang}>
      <HomePageContent />
    </LanguageProvider>
  );
}
