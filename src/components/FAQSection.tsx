// @ts-nocheck
"use client";
import React from 'react';
import { ShieldCheck, Coins, Cpu, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export function FAQSectionContent() {
  const { t } = useLanguage();

  const faqs: FAQItem[] = [
    {
      id: 'safe',
      question: t('faq.1.q'),
      answer: t('faq.1.a'),
      icon: <ShieldCheck className="text-primary shrink-0" size={20} />,
    },
    {
      id: 'free',
      question: t('faq.2.q'),
      answer: t('faq.2.a'),
      icon: <Coins className="text-primary shrink-0" size={20} />,
    },
    {
      id: 'offline',
      question: t('faq.3.q'),
      answer: t('faq.3.a'),
      icon: <Cpu className="text-primary shrink-0" size={20} />,
    },
    {
      id: 'adsense',
      question: t('faq.4.q'),
      answer: t('faq.4.a'),
      icon: <ShieldCheck className="text-primary shrink-0" size={20} />,
    },
    {
      id: 'compatibility',
      question: t('faq.5.q'),
      answer: t('faq.5.a'),
      icon: <Cpu className="text-primary shrink-0" size={20} />,
    }
  ];

  return (
    <section id="faq" className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 scroll-mt-16">
      <h2 className="text-3xl font-bold text-on-surface mb-6 text-center tracking-tight">
        {t('faq.title')}
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.details
            key={faq.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
            className="group bg-surface-container border border-outline-variant rounded-xl overflow-hidden"
          >
            <summary className="list-none p-6 cursor-pointer flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3 font-semibold text-primary text-base md:text-lg">
                {faq.icon}
                <span>{faq.question}</span>
              </div>
              <ChevronDown className="text-on-surface-variant transition-transform group-open:rotate-180" size={20} />
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="pl-8 text-sm md:text-base text-on-surface-variant leading-relaxed font-sans border-t border-outline-variant pt-4">
                {faq.answer}
              </div>
            </div>
          </motion.details>
        ))}
      </div>
    </section>
  );
}

export default function FAQSection({ initialLang = 'en' }: { initialLang?: string }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <FAQSectionContent />
    </LanguageProvider>
  );
}
