"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LegalPage from './LegalPage';
import ContactPage from './ContactPage';

interface StaticPageClientProps {
  pageType: 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'retention' | 'how' | 'about' | 'contact';
}

export default function StaticPageClient({ pageType }: StaticPageClientProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const handleBack = () => router.back();

  if (pageType === 'contact') {
    return <ContactPage onBack={handleBack} />;
  }

  const lastUpdated = '2026-07-18';

  const getTitle = () => {
    switch (pageType) {
      case 'privacy':    return t('footer.privacy', 'Privacy Policy');
      case 'terms':      return t('footer.terms', 'Terms of Service');
      case 'cookie':     return t('footer.cookie', 'Cookie Policy');
      case 'disclaimer': return t('footer.disclaimer', 'Disclaimer');
      case 'retention':  return t('page.retention.title', 'Data Retention & File Deletion Policy');
      case 'how':        return t('page.how.title', 'How It Works');
      case 'about':      return t('page.about.title', 'About Us');
      default:           return 'Page';
    }
  };

  const getContent = () => {
    switch (pageType) {
      case 'how':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface mb-2">{t('how.intro.title')}</h2>
              <p>{t('how.intro.text')}</p>
            </div>
            <div><h3 className="font-bold text-on-surface">{t('how.step1.title')}</h3><p>{t('how.step1.text')}</p></div>
            <div><h3 className="font-bold text-on-surface">{t('how.step2.title')}</h3><p>{t('how.step2.text')}</p></div>
            <div><h3 className="font-bold text-on-surface">{t('how.step3.title')}</h3><p>{t('how.step3.text')}</p></div>
            <div><h3 className="font-bold text-on-surface">{t('how.step4.title')}</h3><p>{t('how.step4.text')}</p></div>
            <div>
              <h2 className="text-xl font-bold text-on-surface mt-4 mb-3">{t('how.benefits.title')}</h2>
              <div className="space-y-3">
                <div><h3 className="font-bold text-on-surface">{t('how.benefit1.title')}</h3><p>{t('how.benefit1.text')}</p></div>
                <div><h3 className="font-bold text-on-surface">{t('how.benefit2.title')}</h3><p>{t('how.benefit2.text')}</p></div>
                <div><h3 className="font-bold text-on-surface">{t('how.benefit3.title')}</h3><p>{t('how.benefit3.text')}</p></div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return <p>{t('legal.placeholder', 'Content will be updated soon.')}</p>;
      case 'retention':
        return (
          <div className="space-y-5">
            <p>{t('retention.intro')}</p>
            <div><h3 className="font-bold text-on-surface">{t('retention.p1.title')}</h3><p>{t('retention.p1.text')}</p></div>
            <div><h3 className="font-bold text-on-surface">{t('retention.p2.title')}</h3><p>{t('retention.p2.text')}</p></div>
            <div><h3 className="font-bold text-on-surface">{t('retention.p3.title')}</h3><p>{t('retention.p3.text')}</p></div>
            <div><h3 className="font-bold text-on-surface">{t('retention.p4.title')}</h3><p>{t('retention.p4.text')}</p></div>
          </div>
        );
      case 'privacy':
      case 'terms':
      case 'cookie':
      case 'disclaimer':
        return (
          <div className="space-y-6">
            <p className="text-on-surface-variant font-medium">{t(`${pageType}.intro`)}</p>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
              const titleKey = `${pageType}.p${i}.title`;
              const textKey = `${pageType}.p${i}.text`;
              const title = t(titleKey, '');
              const text = t(textKey, '');
              if (!title || title === titleKey) return null;
              return (
                <div key={i} className="space-y-2">
                  <h3 className="font-bold text-on-surface text-lg">{title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>
        );
      default:
        return <p>{t('legal.placeholder', 'This page content is being prepared.')}</p>;
    }
  };

  return (
    <LegalPage
      pageId={pageType}
      title={getTitle()}
      lastUpdated={lastUpdated}
      content={getContent()}
      onBack={handleBack}
    />
  );
}
