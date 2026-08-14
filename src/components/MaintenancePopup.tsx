import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { X, AlertTriangle, Clock } from 'lucide-react';

function MaintenancePopupContent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('maintenance-dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      // Current UTC time
      const nowUtc = now.getTime() + now.getTimezoneOffset() * 60000;
      // Convert to GMT+7 (WIB)
      const nowGmt7 = new Date(nowUtc + 3600000 * 7);
      
      const targetGmt7 = new Date(nowGmt7);
      targetGmt7.setHours(22, 0, 0, 0); // Target: Today at 22:00:00 GMT+7
      
      const diff = targetGmt7.getTime() - nowGmt7.getTime();
      
      if (diff <= 0) return '00:00:00';
      
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('maintenance-dismissed', 'true');
  };

  return (
    <div className="fixed z-[9999] inset-0 pointer-events-none flex flex-col items-center justify-end pb-4 md:justify-center md:pb-0 animate-fade-in px-4">
      <div className="pointer-events-auto w-full max-w-sm bg-[#1f1807] border border-yellow-500/50 rounded-2xl p-5 shadow-[0_0_30px_rgba(234,179,8,0.25)] relative overflow-hidden ring-1 ring-yellow-500/20 backdrop-blur-md">
        {/* Animated glowing top line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 animate-pulse" />
        {/* Subtle radial glow inside */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-600/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 mt-1 p-2 bg-yellow-500/10 text-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)] border border-yellow-500/30">
            <AlertTriangle size={20} className="text-yellow-400 animate-pulse" />
          </div>
          
          <div className="flex-1 min-w-0 pr-6">
            <p className="text-sm text-yellow-100/90 leading-relaxed font-medium">
              {t('maintenance.message', '🛠️ System Maintenance: Some PDF tools are temporarily unstable. Full service will be restored today at 22:00 (GMT+7).')}
            </p>
            
            <div className="mt-4 flex items-center gap-2 bg-black/40 border border-yellow-500/20 px-3 py-2 rounded-lg w-fit shadow-inner">
              <Clock size={14} className="text-yellow-400" />
              <span className="text-sm font-mono font-bold text-yellow-400 tracking-wider">
                {timeLeft}
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-yellow-200/50 hover:text-yellow-200 p-1 rounded-full hover:bg-yellow-500/10 transition-colors z-20"
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
