// @ts-nocheck
"use client";
import React from 'react';
import { Shield, Zap, Lock, Cpu, EyeOff, Globe } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { TOOLS } from '../data/tools';
import TacoIcon from './TacoIcon';
interface SEOSectionProps {
  onSelectTool?: (id: string) => void;
}

export default function SEOSection({ onSelectTool }: SEOSectionProps) {
  const { t } = useLanguage();
  
  return (
    <section className="bg-surface-container-low border-y border-outline-variant py-8 mt-4">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-8">
        
        {/* SEO Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
            {t('seo.header.title')}
          </h2>
          <p className="text-lg text-primary-container font-medium">
            {t('seo.header.subtitle')}
          </p>
        </div>

        {/* SEO Bento Grid for Keywords & Features */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="flex-none w-[85%] snap-center bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/60 md:w-auto space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
            <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container">
              <EyeOff size={24} />
            </div>
            <h3 className="text-lg font-bold text-on-surface">{t('seo.box1.title')}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t('seo.box1.desc')}
            </p>
          </div>

          <div className="flex-none w-[85%] snap-center bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/60 md:w-auto space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
            <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-on-surface">{t('seo.box2.title')}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t('seo.box2.desc')}
            </p>
          </div>

          <div className="flex-none w-[85%] snap-center bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/60 md:w-auto space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
            <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold text-on-surface">{t('seo.box3.title')}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t('seo.box3.desc')}
            </p>
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
            <ul className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 md:gap-3 md:pl-2 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {TOOLS.map((tool) => (
                <li key={tool.id} className="flex-none w-[85%] snap-center bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/60 md:w-auto md:bg-transparent md:border-transparent md:p-0 md:rounded-none flex flex-col md:flex-row items-start gap-3 md:gap-2">
                  <span className="hidden md:inline-block text-primary-container shrink-0 mt-0.5">✓</span>
                  <div className="flex flex-col md:block w-full">
                    {/* Mobile icon row */}
                    <div className="md:hidden flex items-center justify-between w-full mb-3">
                      <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container shrink-0">
                        <TacoIcon name={tool.icon} size={24} className="text-primary" />
                      </div>
                      <span className="text-primary-container font-bold text-xl">✓</span>
                    </div>

                    <button 
                      onClick={() => onSelectTool && onSelectTool(tool.id)}
                      className="text-on-surface flex items-center gap-1.5 mb-2 md:mb-1 hover:text-primary-container transition-colors cursor-pointer text-left font-bold text-lg md:text-base w-full"
                    >
                      <TacoIcon name={tool.icon} size={24} className="hidden md:inline-block text-primary" />
                      {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}:
                    </button> 
                    <p className="text-sm text-on-surface-variant md:text-on-surface leading-relaxed">
                      {t(`seo.features.${tool.id.replace(/-/g, '_')}`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
