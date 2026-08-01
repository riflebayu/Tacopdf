"use client";
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LanguageProvider } from '../context/LanguageContext';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const handleSelectTool = (_id: string) => {
    // Navigation handled natively by LocalizedLink
  };

  const handleGoHome = (scrollToId?: string) => {
    if (scrollToId && typeof document !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <LanguageProvider>
      {/* Full-height flex column for sticky footer */}
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Navbar
          onSelectTool={handleSelectTool}
          onGoHome={handleGoHome}
          activeToolId={null}
        />

        {/* Page content grows to fill remaining space */}
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>

        <Footer
          onSelectTool={handleSelectTool}
          onGoHome={handleGoHome}
        />
      </div>
    </LanguageProvider>
  );
}

