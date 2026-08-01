// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Banner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if not dismissed in this session
    const isDismissed = sessionStorage.getItem('tacopdf_banner_dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('tacopdf_banner_dismissed', 'true');
  };

  return (
    <div className="bg-primary-container text-on-primary-container px-4 py-3 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold flex-1 justify-center">
          <Sparkles size={18} className="animate-pulse" />
          <span dangerouslySetInnerHTML={{ __html: t('banner.message') }} />
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-md hover:bg-black/10 transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
