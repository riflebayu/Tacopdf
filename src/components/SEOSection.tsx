// @ts-nocheck
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Shield, Zap, Lock, Cpu, EyeOff, Globe } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { TOOLS } from '../data/tools';
import TacoIcon from './TacoIcon';

function useScrollIndicator(itemCount: number) {
  const containerRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      const progress = container.scrollLeft / maxScroll;
      let index = Math.round(progress * (itemCount - 1));
      if (index < 0) index = 0;
      if (index >= itemCount) index = itemCount - 1;
      setActiveIndex(index);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [itemCount]);

  return { containerRef, activeIndex };
}

interface SEOSectionProps {
  onSelectTool?: (id: string) => void;
}

export default function SEOSection({ onSelectTool }: SEOSectionProps) {
  const { t, lang } = useLanguage();
  const { containerRef: bentoRef, activeIndex: bentoIndex } = useScrollIndicator(3);
  const { containerRef: toolsRef, activeIndex: toolsIndex } = useScrollIndicator(TOOLS.length);
  
  return (
    <section className="bg-surface-container-low border-y border-outline-variant py-6 md:py-8 mt-4">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-5 md:space-y-8">
        
        {/* SEO Header */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 md:space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-snug md:leading-tight">
            {t('seo.header.title')}
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-primary-container font-medium leading-relaxed">
            {t('seo.header.subtitle')}
          </p>
        </div>

        {/* SEO Bento Grid for Keywords & Features */}
        <div className="relative">
          <div ref={bentoRef} className="flex overflow-x-auto scroll-smooth overscroll-x-contain snap-x snap-mandatory gap-3 pb-3 pt-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex-none w-[75%] sm:w-[70%] snap-center snap-always bg-surface-container/50 p-3.5 md:p-5 rounded-xl md:rounded-2xl border border-outline-variant/60 md:w-auto space-y-2 md:space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
              <div className="bg-primary-container/10 border border-primary-container/30 w-9 h-9 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-primary-container">
                <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-on-surface">{t('seo.box1.title')}</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {t('seo.box1.desc')}
              </p>
            </div>

            <div className="flex-none w-[75%] sm:w-[70%] snap-center snap-always bg-surface-container/50 p-3.5 md:p-5 rounded-xl md:rounded-2xl border border-outline-variant/60 md:w-auto space-y-2 md:space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
              <div className="bg-primary-container/10 border border-primary-container/30 w-9 h-9 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-primary-container">
                <Zap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-on-surface">{t('seo.box2.title')}</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {t('seo.box2.desc')}
              </p>
            </div>

            <div className="flex-none w-[75%] sm:w-[70%] snap-center snap-always bg-surface-container/50 p-3.5 md:p-5 rounded-xl md:rounded-2xl border border-outline-variant/60 md:w-auto space-y-2 md:space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
              <div className="bg-primary-container/10 border border-primary-container/30 w-9 h-9 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-primary-container">
                <Globe className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-on-surface">{t('seo.box3.title')}</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {t('seo.box3.desc')}
              </p>
            </div>
          </div>
          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-1 md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === bentoIndex ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'}`} />
            ))}
          </div>
        </div>

        {/* Detailed SEO Column with targeted keywords for search indexing */}
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant text-sm md:text-base leading-relaxed border-t border-outline-variant/40 pt-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-on-surface">{t('seo.secure.title')}</h3>
            <p>{t('seo.secure.p1')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('seo.secure.p2') }} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-on-surface">{t('seo.features.title')}</h3>
            <div className="relative">
              <ul ref={toolsRef} className="flex overflow-x-auto scroll-smooth overscroll-x-contain snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 md:gap-3 md:pl-2 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {TOOLS.map((tool) => (
                  <li key={tool.id} className="flex-none w-[85%] snap-center snap-always bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/60 md:w-auto md:bg-transparent md:border-transparent md:p-0 md:rounded-none flex flex-col md:flex-row items-start gap-3 md:gap-2">
                    <span className="hidden md:inline-block text-primary-container shrink-0 mt-0.5">✓</span>
                    <div className="flex flex-col md:block w-full">
                      {/* Mobile icon row */}
                      <div className="md:hidden flex items-center justify-between w-full mb-3">
                        <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container shrink-0">
                          <TacoIcon name={tool.icon} size={24} className="text-primary" />
                        </div>
                        <span className="text-primary-container font-bold text-xl">✓</span>
                      </div>

                      <a 
                        href={lang === 'en' ? `/${tool.id}` : `/${lang}/${tool.id}`}
                        className="text-primary md:text-on-surface flex items-center gap-1.5 mb-2 md:mb-1 hover:text-primary-container transition-colors cursor-pointer text-left font-bold text-lg md:text-base w-full"
                      >
                        <span className="hidden md:inline-block">
                          <TacoIcon name={tool.icon} size={24} className="text-primary" />
                        </span>
                        {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}:
                      </a> 
                      <p className="text-sm text-on-surface-variant md:text-on-surface leading-relaxed">
                        {t(`seo.features.${tool.id.replace(/-/g, '_')}`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Dots Indicator for Tools */}
              <div className="flex justify-center gap-1.5 mt-1 md:hidden flex-wrap px-4">
                {TOOLS.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === toolsIndex ? 'w-4 bg-primary' : 'w-1.5 bg-outline-variant'}`} />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
