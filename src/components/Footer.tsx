import React from 'react';
import { Zap, CloudOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LocalizedLink from './LocalizedLink';

interface FooterProps {
  onSelectTool: (id: string) => void;
  onGoHome: (scrollToId?: string) => void;
  onSelectPage?: (pageId: string) => void;
}

export default function Footer({ onSelectTool, onGoHome, onSelectPage }: FooterProps) {
  const { t } = useLanguage();

  const handleGoFAQ = (e: React.MouseEvent) => {
    e.preventDefault();
    onGoHome('faq');
  };
  return (
    <footer className="bg-surface-container full-width border-t border-outline-variant mt-auto">
      {/* 5-Column Grid */}
      <div className="w-full py-16 px-4 md:px-8 max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Support */}
        <div>
          <h3 className="font-bold text-sm text-on-surface uppercase mb-4 tracking-wider">{t('footer.support')}</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <LocalizedLink to="/faq" onClick={handleGoFAQ} className="text-on-surface-variant hover:underline hover:text-primary transition-colors cursor-pointer">
                {t('nav.faq')}
              </LocalizedLink>
            </li>
            <li>
              <button onClick={() => onSelectPage ? onSelectPage('sitemap') : onGoHome()} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.sitemap')}
              </button>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-bold text-sm text-on-surface uppercase mb-4 tracking-wider">{t('footer.features')}</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => onGoHome('manipulation')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.manipulation')}
              </button>
            </li>
            <li>
              <button onClick={() => onGoHome('security')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.security')}
              </button>
            </li>
            <li>
              <button onClick={() => onGoHome('conversion')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.conversion')}
              </button>
            </li>
            <li>
              <button onClick={() => onGoHome('editing')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.editing')}
              </button>
            </li>
          </ul>
        </div>

        {/* Popular Tools */}
        <div>
          <h3 className="font-bold text-sm text-on-surface uppercase mb-4 tracking-wider">{t('footer.popular')}</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => onSelectTool('merge')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.merge.name')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTool('image-to-pdf')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.image-to-pdf.name')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTool('delete-pages')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.delete-pages.name')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTool('split')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.split.name')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTool('protect')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.protect.name')}
              </button>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-sm text-on-surface uppercase mb-4 tracking-wider">{t('footer.company')}</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => onSelectPage && onSelectPage('how-it-works')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('page.how.title') || 'How It Works'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage && onSelectPage('about')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.about')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTool('blog')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('nav.blog')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage && onSelectPage('contact')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.contact')}
              </button>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-sm text-on-surface uppercase mb-4 tracking-wider">{t('footer.legal')}</h3>
          <ul className="space-y-3 text-sm flex flex-col items-start">
            <li>
              <button onClick={() => onSelectPage && onSelectPage('privacy')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.privacy')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage && onSelectPage('terms')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.terms')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage && onSelectPage('cookie')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.cookie')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage && onSelectPage('disclaimer')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.disclaimer')}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage && onSelectPage('retention')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors flex flex-col leading-tight text-left cursor-pointer">
                <span>{t('footer.retention').split(' / ')[0]} /</span>
                <span>{t('footer.retention').split(' / ')[1] || 'File Deletion'}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-outline-variant w-full">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-on-surface-variant text-center md:text-left">
            {t('footer.desc')}
          </p>
          <div className="flex gap-4">
            <span className="inline-flex items-center gap-1.5 bg-surface-container-high border border-outline-variant/50 px-3 py-1 rounded-full text-xs font-semibold text-primary">
              <Zap size={12} className="text-primary-container" /> {t('footer.local')}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface-container-high border border-outline-variant/50 px-3 py-1 rounded-full text-xs font-semibold text-primary">
              <CloudOff size={12} className="text-primary-container" /> {t('footer.storage')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
