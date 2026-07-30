import React from 'react';
import { Zap, CloudOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LocalizedLink from './LocalizedLink';
import { getToolSeoPath } from '../data/tools';

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
      <div className="w-full py-8 md:py-16 px-4 md:px-8 max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
        {/* Support */}
        <div>
          <h3 className="font-bold text-[11px] md:text-sm text-on-surface uppercase mb-2 md:mb-4 tracking-wider">{t('footer.support')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-xs md:text-sm">
            <li>
              <LocalizedLink to="/faq" onClick={handleGoFAQ} className="text-on-surface-variant hover:underline hover:text-primary transition-colors cursor-pointer">
                {t('nav.faq')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/sitemap" onClick={() => onSelectPage ? onSelectPage('sitemap') : onGoHome()} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.sitemap')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-bold text-[11px] md:text-sm text-on-surface uppercase mb-2 md:mb-4 tracking-wider">{t('footer.features')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-xs md:text-sm">
            <li>
              <LocalizedLink to="/#manipulation" onClick={() => onGoHome('manipulation')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.manipulation')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/#security" onClick={() => onGoHome('security')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.security')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/#conversion" onClick={() => onGoHome('conversion')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.conversion')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/#editing" onClick={() => onGoHome('editing')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('cat.editing')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Popular Tools */}
        <div>
          <h3 className="font-bold text-[11px] md:text-sm text-on-surface uppercase mb-2 md:mb-4 tracking-wider">{t('footer.popular')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-xs md:text-sm">
            <li>
              <LocalizedLink to={getToolSeoPath('merge')} onClick={() => onSelectTool('merge')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.merge.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('image-to-pdf')} onClick={() => onSelectTool('image-to-pdf')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.image-to-pdf.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('delete-pages')} onClick={() => onSelectTool('delete-pages')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.delete-pages.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('split')} onClick={() => onSelectTool('split')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.split.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('protect')} onClick={() => onSelectTool('protect')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.protect.name')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-[11px] md:text-sm text-on-surface uppercase mb-2 md:mb-4 tracking-wider">{t('footer.company')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-xs md:text-sm">
            <li>
              <LocalizedLink to="/how-it-works" onClick={() => onSelectPage && onSelectPage('how-it-works')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('page.how.title') || 'How It Works'}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/about" onClick={() => onSelectPage && onSelectPage('about')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.about')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/blog" onClick={() => onSelectTool('blog')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('nav.blog')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/contact" onClick={() => onSelectPage && onSelectPage('contact')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.contact')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-[11px] md:text-sm text-on-surface uppercase mb-2 md:mb-4 tracking-wider">{t('footer.legal')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-xs md:text-sm flex flex-col items-start">
            <li>
              <LocalizedLink to="/privacy" onClick={() => onSelectPage && onSelectPage('privacy')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.privacy')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/terms" onClick={() => onSelectPage && onSelectPage('terms')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.terms')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/cookie" onClick={() => onSelectPage && onSelectPage('cookie')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.cookie')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/disclaimer" onClick={() => onSelectPage && onSelectPage('disclaimer')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.disclaimer')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/retention" onClick={() => onSelectPage && onSelectPage('retention')} className="text-on-surface-variant hover:underline hover:text-primary transition-colors flex flex-col leading-tight text-left cursor-pointer">
                <span>{t('footer.retention').split(' / ')[0]} /</span>
                <span>{t('footer.retention').split(' / ')[1] || 'File Deletion'}</span>
              </LocalizedLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-outline-variant w-full">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm text-on-surface-variant text-center md:text-left">
            {t('footer.desc')}
          </p>
          <div className="flex gap-3 md:gap-4">
            <span className="inline-flex items-center gap-1 md:gap-1.5 bg-surface-container-high border border-outline-variant/50 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold text-primary">
              <Zap size={10} className="text-primary-container md:w-3 md:h-3" /> {t('footer.local')}
            </span>
            <span className="inline-flex items-center gap-1 md:gap-1.5 bg-surface-container-high border border-outline-variant/50 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold text-primary">
              <CloudOff size={10} className="text-primary-container md:w-3 md:h-3" /> {t('footer.storage')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
