import React, { useState, useEffect } from 'react';

const injectScripts = () => {
  // Check if already injected to prevent duplicates during hot reloads or double calls
  if (document.getElementById('ga-script')) return;

  // 1. Google Analytics 4
  const gaScript = document.createElement('script');
  gaScript.id = 'ga-script';
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-F2QL8LGSM3';
  document.head.appendChild(gaScript);

  const gaInline = document.createElement('script');
  gaInline.id = 'ga-inline-script';
  gaInline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-F2QL8LGSM3');
  `;
  document.head.appendChild(gaInline);

  // 2. Google AdSense
  const adScript = document.createElement('script');
  adScript.id = 'adsense-script';
  adScript.async = true;
  adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9178424383165717';
  adScript.crossOrigin = 'anonymous';
  document.head.appendChild(adScript);
};

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tacopdf_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      injectScripts();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tacopdf_cookie_consent', 'accepted');
    setShowBanner(false);
    injectScripts();
  };

  const handleDecline = () => {
    localStorage.setItem('tacopdf_cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full z-50 p-4 bg-surface-container border-t border-outline-variant shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-on-surface-variant max-w-4xl leading-relaxed">
        We use cookies to analyze traffic and serve personalized ads. By clicking Accept, you consent to our use of cookies.
      </p>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-sm font-bold rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-md cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
