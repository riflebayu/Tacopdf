// @ts-nocheck
"use client";
import React, { useEffect, useState } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getPageContent } from '../services/cmsService';

interface LegalPageProps {
  pageId: string;
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
  onBack: () => void;
}

export default function LegalPage({ pageId, title, lastUpdated, content, onBack }: LegalPageProps) {
  const { t, currentLanguage } = useLanguage();
  const [cmsContent, setCmsContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchCms = async () => {
      try {
        const data = await getPageContent(pageId);
        if (data && data.trim() !== '') {
          setCmsContent(data);
        } else {
          setCmsContent(null);
        }
      } catch {
        setCmsContent(null);
      }
    };
    fetchCms();
  }, [pageId]);

  // Parse the ISO date string (e.g. "2026-07-18") and format it according to current language
  let formattedDate = lastUpdated;
  try {
    const dateObj = new Date(lastUpdated);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = new Intl.DateTimeFormat(currentLanguage.code, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    }
  } catch (e) {
    // fallback to string if invalid
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-[800px] mx-auto px-4 py-12 md:py-20"
    >
      <button 
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> {t('contact.back') || 'Back to Home'}
      </button>

      <div className="bg-surface-container border border-outline-variant rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-primary" size={28} />
          <h1 className="text-3xl font-extrabold text-on-surface">{title}</h1>
        </div>
        <p className="text-sm text-on-surface-variant mb-10 pb-6 border-b border-outline-variant/50">
          {t('legal.last_updated') || 'Last updated:'} {formattedDate}
        </p>

        <div className="prose prose-sm md:prose-base prose-invert prose-p:text-on-surface-variant prose-headings:text-on-surface prose-a:text-primary max-w-none space-y-6">
          {cmsContent ? (
            <div dangerouslySetInnerHTML={{ __html: cmsContent }} />
          ) : (
            content
          )}
        </div>
      </div>
    </motion.div>
  );
}
