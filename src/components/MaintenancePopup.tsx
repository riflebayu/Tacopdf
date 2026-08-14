import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { X, AlertTriangle } from 'lucide-react';

function MaintenancePopupContent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('maintenance-dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('maintenance-dismissed', 'true');
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm w-[calc(100%-2rem)] md:w-full animate-fade-in">
      <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
        {/* Subtle warning glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error/50 via-warning/80 to-error/50" />
        
        <div className="flex gap-4 items-start">
          <div className="shrink-0 mt-1 p-2 bg-warning-container/20 text-warning rounded-full">
            <AlertTriangle size={20} className="text-warning" />
          </div>
          
          <div className="flex-1 min-w-0 pr-6">
            <p className="text-sm text-on-surface leading-relaxed">
              {t('maintenance.message', '🛠️ System Maintenance: Some PDF tools are temporarily unstable. Full service will be restored today at 22:00 (GMT+7).')}
            </p>
          </div>
        </div>

        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-highest transition-colors"
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
      <MaintenancePopupContent />
    </LanguageProvider>
  );
}
