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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-surface-container border border-outline-variant/60 p-6 rounded-xl space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
            <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container">
              <EyeOff size={24} />
            </div>
            <h3 className="text-lg font-bold text-on-surface">{t('seo.box1.title')}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t('seo.box1.desc')}
            </p>
          </div>

          <div className="bg-surface-container border border-outline-variant/60 p-6 rounded-xl space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
            <div className="bg-primary-container/10 border border-primary-container/30 w-12 h-12 rounded-lg flex items-center justify-center text-primary-container">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-on-surface">{t('seo.box2.title')}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t('seo.box2.desc')}
            </p>
          </div>

          <div className="bg-surface-container border border-outline-variant/60 p-6 rounded-xl space-y-3 shadow-sm hover:border-primary-container/35 transition-all">
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
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
              {TOOLS.map((tool) => (
                <li key={tool.id} className="flex items-start gap-2">
                  <span className="text-primary-container shrink-0 mt-0.5">✓</span>
                  <span className="leading-tight">
                    <button 
                      onClick={() => onSelectTool && onSelectTool(tool.id)}
                      className="text-on-surface flex items-center gap-1.5 mb-1 hover:text-primary-container transition-colors cursor-pointer text-left font-bold"
                    >
                      <TacoIcon name={tool.icon} size={24} className="text-primary" />
                      {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}:
                    </button> 
                    <span className="text-sm">
                      {t(`seo.features.${tool.id.replace(/-/g, '_')}`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy & AdSense Transparency Policy - Essential for AdSense Approval */}
          <div className="bg-surface-container/30 border border-outline-variant rounded-xl p-6 space-y-4">
            <h4 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Shield size={18} className="text-primary-container" />
              {t('seo.privacy.title')}
            </h4>
            <div className="text-xs space-y-3 leading-relaxed text-on-surface-variant/80">
              <p>{t('seo.privacy.p1')}</p>
              <p dangerouslySetInnerHTML={{ __html: t('seo.privacy.p2') }} />
              <p>{t('seo.privacy.p3')}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
