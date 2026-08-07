"use client";
import React from 'react';
import { useNavigate } from '@/utils/router-mock';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import LegalPage from './LegalPage';
import ContactPage from './ContactPage';
import LucideIcon from './LucideIcon';

interface StaticPageClientProps {
  pageType: 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'retention' | 'how' | 'about' | 'contact';
  initialLang?: string;
}

function StaticPageContent({ pageType }: StaticPageClientProps) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(lang === 'en' ? '/' : `/${lang}`);
  };

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
              <p className="text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t('how.intro.text') }} />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-1">
                <h3 className="font-bold text-on-surface text-lg">{t(`how.step${i}.title`)}</h3>
                <p className="text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`how.step${i}.text`) }} />
              </div>
            ))}
            <div>
              <h2 className="text-xl font-bold text-on-surface mt-6 mb-4">{t('how.benefits.title')}</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-1">
                    <h3 className="font-bold text-on-surface text-lg">{t(`how.benefit${i}.title`)}</h3>
                    <p className="text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`how.benefit${i}.text`) }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
            {/* Left Sidebar: Photo & Socials Box */}
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4 bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/50 shadow-sm sticky top-24 shrink-0">
              <img 
                src="/profile.webp" 
                alt="Founder" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-surface"
              />
              <div className="flex items-center justify-center gap-4 mt-2">
                <a href="https://facebook.com/baylightyear04/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors" title="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/bay.lightyear/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-600/10 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* Right Content: Article */}
            <div className="w-full md:w-2/3 space-y-8 md:space-y-10">
              {/* Founder Welcome Text */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary-container">{t('about.founder.title', 'Creator & Founder')}</h3>
                <p 
                  className="text-on-surface-variant leading-relaxed text-sm md:text-base" 
                  dangerouslySetInnerHTML={{ 
                    __html: t('about.founder.text', 'Welcome to TacoPDF! I built this platform to provide a fast, completely free, and highly secure way to manage your PDF files. Since all processing happens locally on your device, your privacy is always guaranteed.') 
                  }} 
                />
              </div>

              {/* The rest of the article sections */}
              <div className="space-y-6 md:space-y-8">
                {[1, 2, 3, 4, 5].map(i => {
                  const titleKey = `about.p${i}.title`;
                  const title = t(titleKey, '');
                  if (!title || title === titleKey) return null;
                  return (
                    <div key={i} className="space-y-2 md:space-y-3">
                      <h3 className="font-bold text-on-surface text-lg md:text-xl">{title}</h3>
                      <p className="text-on-surface-variant leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: t(`about.p${i}.text1`, '') }} />
                      {t(`about.p${i}.text2`, '') !== `about.p${i}.text2` && <p className="text-on-surface-variant leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: t(`about.p${i}.text2`, '') }} />}
                      {t(`about.p${i}.text3`, '') !== `about.p${i}.text3` && <p className="text-on-surface-variant leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: t(`about.p${i}.text3`, '') }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'retention':
        return (
          <div className="space-y-4 md:space-y-5">
            <p className="text-sm md:text-base text-on-surface-variant">{t('retention.intro')}</p>
            <div className="space-y-1 md:space-y-1.5"><h3 className="font-bold text-on-surface text-base md:text-lg">{t('retention.p1.title')}</h3><p className="text-sm md:text-base text-on-surface-variant">{t('retention.p1.text')}</p></div>
            <div className="space-y-1 md:space-y-1.5"><h3 className="font-bold text-on-surface text-base md:text-lg">{t('retention.p2.title')}</h3><p className="text-sm md:text-base text-on-surface-variant">{t('retention.p2.text')}</p></div>
            <div className="space-y-1 md:space-y-1.5"><h3 className="font-bold text-on-surface text-base md:text-lg">{t('retention.p3.title')}</h3><p className="text-sm md:text-base text-on-surface-variant">{t('retention.p3.text')}</p></div>
            <div className="space-y-1 md:space-y-1.5"><h3 className="font-bold text-on-surface text-base md:text-lg">{t('retention.p4.title')}</h3><p className="text-sm md:text-base text-on-surface-variant">{t('retention.p4.text')}</p></div>
          </div>
        );
      case 'privacy':
      case 'terms':
      case 'cookie':
      case 'disclaimer': {
        const prefix = pageType === 'terms' ? 'tos' : pageType;
        return (
          <div className="space-y-4 md:space-y-6">
            <p className="text-on-surface-variant font-medium text-sm md:text-base" dangerouslySetInnerHTML={{ __html: t(`${prefix}.intro`) }} />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
              const titleKey = `${prefix}.p${i}.title`;
              const textKey = `${prefix}.p${i}.text`;
              const title = t(titleKey, '');
              const text = t(textKey, '');
              if (!title || title === titleKey) return null;
              return (
                <div key={i} className="space-y-1.5 md:space-y-2">
                  <h3 className="font-bold text-on-surface text-base md:text-lg">{title}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              );
            })}
          </div>
        );
      }
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

export default function StaticPageClient(props: StaticPageClientProps) {
  return (
    <LanguageProvider initialLang={props.initialLang || 'en'}>
      <StaticPageContent {...props} />
    </LanguageProvider>
  );
}
