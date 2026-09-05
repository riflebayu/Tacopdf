import React, { useState, useEffect } from 'react';
import { Building2, X, ArrowRight } from 'lucide-react';

interface LanguageContent {
  badge: string;
  title: string;
  message: string;
  cta: string;
}

const SALE_TRANSLATIONS: Record<string, LanguageContent> = {
  en: {
    badge: "Acquisition Opportunity",
    title: "TacoPDF is Open for Acquisition",
    message: "This website and platform are currently available for acquisition. For business inquiries, domain transfer, or serious partnership proposals, please reach out via our About page.",
    cta: "Contact Us"
  },
  id: {
    badge: "Peluang Akuisisi",
    title: "TacoPDF Tersedia untuk Diakuisisi",
    message: "Website dan platform TacoPDF saat ini terbuka untuk diakuisisi (dijual). Untuk penawaran resmi dan pertanyaan bisnis, silakan hubungi kami melalui halaman Tentang Kami.",
    cta: "Hubungi Kami"
  },
  es: {
    badge: "Oportunidad de Adquisición",
    title: "TacoPDF está Disponible para Adquisición",
    message: "Este sitio web y plataforma están disponibles para su adquisición. Para consultas comerciales y propuestas formales, contáctenos a través de nuestra página Sobre Nosotros.",
    cta: "Contáctenos"
  },
  fr: {
    badge: "Opportunité d'Acquisition",
    title: "TacoPDF est Ouvert à l'Acquisition",
    message: "Le site web et la plateforme TacoPDF sont actuellement ouverts à l'acquisition. Pour toute proposition commerciale ou renseignement, contactez-nous via notre page À Propos.",
    cta: "Nous Contacter"
  },
  de: {
    badge: "Möglichkeit zur Übernahme",
    title: "TacoPDF steht zur Übernahme bereit",
    message: "Die Website und Plattform TacoPDF steht derzeit zur Übernahme (Verkauf) bereit. Für geschäftliche Anfragen und Angebote kontaktieren Sie uns bitte über unsere Über Uns-Seite.",
    cta: "Kontakt Aufnehmen"
  },
  pt: {
    badge: "Oportunidade de Aquisição",
    title: "TacoPDF está Disponível para Aquisição",
    message: "O website e a plataforma TacoPDF estão disponíveis para aquisição. Para propostas comerciais e consultas formais, entre em contato pela nossa página Sobre Nós.",
    cta: "Fale Conosco"
  },
  ja: {
    badge: "事業譲渡・買収のご案内",
    title: "TacoPDF 買収・事業譲渡の受付中",
    message: "TacoPDFのウェブサイトおよびプラットフォームは現在、事業譲渡・買収の受付を行っております。ビジネスに関するお問い合わせは会社概要ページよりご連絡ください。",
    cta: "お問い合わせ"
  }
};

const STORAGE_KEY = 'tacopdf_sale_notice_dismissed';

export default function SiteSalePopup({ initialLang = 'en' }: { initialLang?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  const langKey = SALE_TRANSLATIONS[initialLang] ? initialLang : 'en';
  const content = SALE_TRANSLATIONS[langKey];
  const aboutUrl = langKey === 'en' ? '/about' : `/${langKey}/about`;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY);
      if (!isDismissed) {
        // Slight delay for smooth entrance without blocking initial render
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (_) {
      // Fallback in case localStorage is restricted
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch (_) {}
    }
  };

  return (
    <aside
      aria-label={content.title}
      className="fixed z-[9990] bottom-4 right-4 left-4 sm:left-auto sm:max-w-md w-auto pointer-events-none animate-fade-in"
    >
      <div className="pointer-events-auto bg-[#1c1812] border border-amber-500/30 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-md ring-1 ring-amber-500/10">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
        
        {/* Close Button (min 44x44px touch target) */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-amber-200/60 hover:text-amber-100 hover:bg-amber-500/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>

        <div className="flex gap-3.5 items-start pr-8">
          <div className="shrink-0 mt-0.5 p-2 bg-amber-500/15 text-amber-400 rounded-xl border border-amber-500/30">
            <Building2 size={20} className="text-amber-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/30">
              {content.badge}
            </div>
            <h2 className="text-sm font-bold text-amber-100 mb-1 leading-snug">
              {content.title}
            </h2>
            <p className="text-xs text-amber-100/75 leading-relaxed font-normal mb-3.5">
              {content.message}
            </p>

            <div className="flex items-center gap-2">
              <a
                href={aboutUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#181510] bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg shadow-sm"
              >
                <span>{content.cta}</span>
                <ArrowRight size={14} />
              </a>
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-2 text-xs font-medium text-amber-200/70 hover:text-amber-100 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
