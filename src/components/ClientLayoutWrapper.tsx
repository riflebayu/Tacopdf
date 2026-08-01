"use client";
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LanguageProvider } from '../context/LanguageContext';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const handleSelectTool = (id: string) => {
    // Navigation is handled natively by LocalizedLink in Navbar
  };

  const handleGoHome = (scrollToId?: string) => {
    // Navigation is handled natively by LocalizedLink
    if (scrollToId) {
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          onSelectTool={handleSelectTool} 
          onGoHome={handleGoHome} 
          activeToolId={null} 
        />
        
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        
        <Footer 
          onSelectTool={handleSelectTool} 
          onGoHome={handleGoHome} 
        />
      </div>
    </LanguageProvider>
  );
}
