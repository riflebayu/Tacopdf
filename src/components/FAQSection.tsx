import React, { useState } from 'react';
import { ShieldCheck, Coins, Cpu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function FAQSection() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('safe');

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

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 scroll-mt-16">
      <h2 className="text-3xl font-bold text-on-surface mb-6 text-center tracking-tight">
        {t('faq.title')}
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id} 
              className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-surface-container-high transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3 font-semibold text-primary text-base md:text-lg">
                  {faq.icon}
                  <span>{faq.question}</span>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-primary-container' : ''}`} 
                />
              </button>
 
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base text-on-surface-variant leading-relaxed border-t border-outline-variant/30 font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
