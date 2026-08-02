// @ts-nocheck
"use client";
import React from 'react';
import { Zap, CloudOff } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import LocalizedLink from './LocalizedLink';
import { getToolSeoPath } from '../data/tools';

interface FooterProps {
  // Navigation is handled natively by LocalizedLink
}

function FooterContent(props: FooterProps) {
  const { t } = useLanguage();

  const handleGoFAQ = (e: React.MouseEvent) => {
    // Let LocalizedLink handle it
  };
  return (
    <footer className="bg-surface-container full-width border-t border-outline-variant mt-auto">
      {/* 5-Column Grid */}
      <div className="w-full py-4 md:py-16 px-4 md:px-8 max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-6 md:gap-8">
        {/* Support */}
        <div className="col-span-1 flex flex-col gap-1.5 md:gap-3">
          <h3 className="font-bold text-xs md:text-sm text-on-surface uppercase mb-0.5 md:mb-4 tracking-wider">{t('footer.support')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-[13px] md:text-sm">
            <li>
              <LocalizedLink to="/faq" onClick={handleGoFAQ} className="text-on-surface-variant hover:underline hover:text-primary transition-colors cursor-pointer">
                {t('nav.faq')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/sitemap" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.sitemap')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="col-span-1 flex flex-col gap-1.5 md:gap-3 items-end md:items-start">
          <h3 className="font-bold text-xs md:text-sm text-on-surface uppercase mb-0.5 md:mb-4 tracking-wider text-right md:text-left">{t('footer.features')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-[13px] md:text-sm text-right md:text-left flex flex-col items-end md:items-start">
            <li>
              <LocalizedLink to="/#manipulation" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('cat.manipulation')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/#security" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('cat.security')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/#conversion" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('cat.conversion')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/#editing" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('cat.editing')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Popular Tools */}
        <div className="col-span-1 flex flex-col gap-1.5 md:gap-3">
          <h3 className="font-bold text-xs md:text-sm text-on-surface uppercase mb-0.5 md:mb-4 tracking-wider">{t('footer.popular')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-[13px] md:text-sm">
            <li>
              <LocalizedLink to={getToolSeoPath('merge')} onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.merge.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('image-to-pdf')} onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.image-to-pdf.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('delete-pages')} onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.delete-pages.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('split')} onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.split.name')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to={getToolSeoPath('protect')} onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('tools.protect.name')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="col-span-1 flex flex-col gap-1.5 md:gap-3 items-end md:items-start">
          <h3 className="font-bold text-xs md:text-sm text-on-surface uppercase mb-0.5 md:mb-4 tracking-wider text-right md:text-left">{t('footer.company')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-[13px] md:text-sm text-right md:text-left flex flex-col items-end md:items-start">
            <li>
              <LocalizedLink to="/how-it-works" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('page.how.title') || 'How It Works'}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/about" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('footer.about')}
              </LocalizedLink>
            </li>

            <li>
              <LocalizedLink to="/contact" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-right md:text-left cursor-pointer inline-block">
                {t('footer.contact')}
              </LocalizedLink>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5 md:gap-3">
          <h3 className="font-bold text-xs md:text-sm text-on-surface uppercase mb-0.5 md:mb-4 tracking-wider">{t('footer.legal')}</h3>
          <ul className="space-y-1.5 md:space-y-3 text-[13px] md:text-sm flex flex-col items-start gap-y-1.5 md:gap-y-0">
            <li>
              <LocalizedLink to="/privacy" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.privacy')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/terms" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.terms')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/cookie" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.cookie')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/disclaimer" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors text-left cursor-pointer">
                {t('footer.disclaimer')}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink to="/retention" onClick={() => {}} className="text-on-surface-variant hover:underline hover:text-primary transition-colors flex flex-col leading-tight text-left cursor-pointer">
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

export default function Footer(props: FooterProps & { initialLang?: string }) {
  return (
    <LanguageProvider initialLang={props.initialLang || 'en'}>
      <FooterContent {...props} />
    </LanguageProvider>
  );
}
