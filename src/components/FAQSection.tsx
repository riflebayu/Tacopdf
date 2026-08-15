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
    },
    {
      id: 'premium',
      question: t('faq.6.q'),
      answer: t('faq.6.a'),
      icon: <Coins className="text-primary shrink-0" size={20} />,
    },
    {
      id: 'payment',
      question: t('faq.7.q'),
      answer: t('faq.7.a'),
      icon: <ShieldCheck className="text-primary shrink-0" size={20} />,
    }
  ];

  return (
    <section id="faq" className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 scroll-mt-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-6 text-center tracking-tight">
        {t('faq.title')}
      </h2>
      <div className="max-w-4xl mx-auto flex flex-col border border-outline-variant/60 rounded-2xl overflow-hidden divide-y divide-outline-variant/60 bg-[#2A2824]/30 shadow-sm">
        {faqs.map((faq, index) => (
          <motion.details
            key={faq.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
            className="group"
          >
            <summary className="list-none cursor-pointer">
              <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-surface-container/50 transition-colors">
                <div className="flex items-center gap-3 font-semibold text-primary text-sm sm:text-base md:text-lg text-left">
                  {faq.icon}
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className="text-on-surface-variant shrink-0 ml-2 transition-transform duration-200 group-open:rotate-180" size={18} />
              </div>
              
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 hidden group-open:block cursor-text">
                <div className="pl-8 sm:pl-9 text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-sans pt-1">
                  {faq.answer}
                </div>
              </div>
            </summary>
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
