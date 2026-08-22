"use client";
import React from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import ToolGrid from './ToolGrid';

function BetaPageContent() {
  const { t } = useLanguage();
  return (
    <main className="flex flex-col w-full bg-background min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
          {t('beta.title', 'Beta Tools Playground')}
        </h1>
        <p className="text-on-surface-variant font-medium max-w-2xl mx-auto">
          {t('beta.desc', 'Help us test these upcoming features! These tools are fully local but might still have some bugs. Do not use for highly sensitive production documents.')}
        </p>
      </div>
      
      <ToolGrid showBeta={true} />
    </main>
  );
}

export default function BetaPageClient({ lang }: { lang: string }) {
  return (
    <LanguageProvider initialLang={lang}>
      <BetaPageContent />
    </LanguageProvider>
  );
}
