import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { X, CheckCircle2 } from 'lucide-react';

// Hardcoded expiration timestamp: exactly 24 hours from announcement (2026-08-16T12:00:00+07:00)
const EXPIRATION_TIMESTAMP = 1786856400000;

function RestoredPopupContent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Auto-expire after 24 hours
    if (Date.now() > EXPIRATION_TIMESTAMP) {
      return;
    }

    // 2. Show once per user (persistent in localStorage)
    const isDismissed = localStorage.getItem('tacopdf_restored_notice_dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('tacopdf_restored_notice_dismissed', 'true');
  };

  return (
    <div className="fixed z-[9999] inset-0 pointer-events-none flex flex-col items-center justify-end pb-4 md:justify-center md:pb-0 animate-fade-in px-4">
      <div className="pointer-events-auto w-full max-w-sm bg-[#061e14] border border-emerald-500/40 rounded-2xl p-5 shadow-[0_0_25px_rgba(16,185,129,0.25)] relative overflow-hidden ring-1 ring-emerald-500/20 backdrop-blur-md">
        {/* Animated glowing top line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 animate-pulse" />
        {/* Subtle radial glow inside */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex gap-3.5 items-start relative z-10">
          <div className="shrink-0 mt-0.5 p-2 bg-emerald-500/10 text-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500/30">
            <CheckCircle2 size={22} className="text-emerald-400" />
          </div>
          
          <div className="flex-1 min-w-0 pr-5">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
              {t('restored.title', '🎉 System Restored!')}
            </h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
              {t('restored.message', 'All PDF tools are fully functional, faster, and running smoothly. Thank you for your patience!')}
            </p>
          </div>
        </div>

        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-emerald-200/50 hover:text-emerald-100 p-1 rounded-full hover:bg-emerald-500/10 transition-colors z-20 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default function MaintenancePopup({ initialLang = 'en' }: { initialLang?: string }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <RestoredPopupContent />
    </LanguageProvider>
  );
}
