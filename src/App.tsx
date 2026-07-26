import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Shield, Zap, Lock, Upload, FileText, X, Linkedin, Github, Mail, Facebook, Instagram } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ToolGrid from './components/ToolGrid';
import SEOSection from './components/SEOSection';
import FAQSection from './components/FAQSection';
import Banner from './components/Banner';
import SeoArticle from './components/SeoArticle';

const Workspace = React.lazy(() => import('./components/Workspace'));
const ArticleTemplate = React.lazy(() => import('./components/ArticleTemplate'));
const BlogIndex = React.lazy(() => import('./components/BlogIndex'));
import ContactPage from './components/ContactPage';
import { TOOLS, TOOL_ALIASES, getToolSeoPath } from './data/tools';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import PageSEO from './components/PageSEO';
import LegalPage from './components/LegalPage';
import TacoIcon from './components/TacoIcon';
const AdminContainer = React.lazy(() => import('./components/AdminContainer'));
import LocalizedLink from './components/LocalizedLink';
import type { GlobalSettings } from './services/settingsService';


export default function App() {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Normalize path by stripping the language prefix
  let path = location.pathname;
  if (lang !== 'en' && path.startsWith(`/${lang}`)) {
    path = path.replace(`/${lang}`, '') || '/';
  }

  let activeToolId: string | null = null;
  let activePage: string | null = null;
  let activeSlug: string | null = null;
  

  const rawPath = path.replace('/', '');

  if (TOOL_ALIASES[rawPath]) {
    activeToolId = TOOL_ALIASES[rawPath];
  } else if (path.startsWith('/tools/')) {
    activeToolId = path.replace('/tools/', '');
  } else if (path.startsWith('/blog/') && path !== '/blog') {
    activePage = 'article';
    activeSlug = path.replace('/blog/', '');
  } else if (path !== '/') {
    activePage = rawPath;
  }

  
  // Global Drag and Drop State
  const [isGlobalDragging, setIsGlobalDragging] = useState(false);
  const [globalDroppedFiles, setGlobalDroppedFiles] = useState<File[]>([]);
  const [workspaceFiles, setWorkspaceFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  useEffect(() => {
    let unsubscribeSettings: (() => void) | undefined;
    let initiated = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const initServices = () => {
      if (initiated) return;
      initiated = true;
      import('./services/settingsService').then(({ subscribeToSettings }) => {
        unsubscribeSettings = subscribeToSettings((data) => {
          setSettings(data);
        });
      });
      import('./services/analyticsService').then(({ trackPageView }) => {
        trackPageView();
      });
      
      window.removeEventListener('scroll', initServices);
      window.removeEventListener('mousemove', initServices);
      window.removeEventListener('touchstart', initServices);
      clearTimeout(timeoutId);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', initServices, { passive: true, once: true });
      window.addEventListener('mousemove', initServices, { passive: true, once: true });
      window.addEventListener('touchstart', initServices, { passive: true, once: true });
      // Fallback init after 5 seconds to stay completely out of PageSpeed metrics
      timeoutId = setTimeout(initServices, 5000);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', initServices);
        window.removeEventListener('mousemove', initServices);
        window.removeEventListener('touchstart', initServices);
        clearTimeout(timeoutId);
      }
      if (unsubscribeSettings) unsubscribeSettings();
    };
  }, []);


  const toolGridRef = useRef<HTMLDivElement>(null);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);



  const getPrefixedPath = (targetPath: string) => {
    if (lang === 'en') return targetPath;
    return targetPath === '/' ? `/${lang}` : `/${lang}${targetPath}`;
  };


  const handleSelectTool = (id: string, withFiles?: File[]) => {
    navigate(getPrefixedPath(getToolSeoPath(id)));
    setWorkspaceFiles(withFiles || []);
    import('./services/analyticsService').then(({ trackToolUsage }) => trackToolUsage(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = (scrollToId?: string | unknown) => {
    navigate(getPrefixedPath('/'));
    
    if (typeof scrollToId === 'string' && scrollToId) {
      const checkAndScroll = (attempts = 0) => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 15) {
          setTimeout(() => checkAndScroll(attempts + 1), 50);
        }
      };
      
      // Start polling after a tiny delay to let React process the navigation
      setTimeout(() => checkAndScroll(), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPage = (pageId: string) => {
    navigate(getPrefixedPath(`/${pageId}`));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    if (activeToolId || activePage) {
      setActiveToolId(null);
      setActivePage(null);
    }
    setTimeout(() => {
      toolGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleGlobalDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (!activeToolId && !activePage) {
      setIsGlobalDragging(true);
    }
  };

  const handleGlobalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsGlobalDragging(false);
    if (!activeToolId && !activePage && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setGlobalDroppedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const getPageTitle = (page: string) => {
    const key = `page.${page}.title`;
    const translation = t(key);
    if (translation !== key) return translation;
    const fallbacks: Record<string, string> = {
      'sitemap': 'Sitemap',
      'about': 'About Us'
    };
    return fallbacks[page] || page.charAt(0).toUpperCase() + page.slice(1);
  };

  // Redirect old blog URLs (catch-all for /tools/blog and any subpaths)
  if (path === '/tools/blog' || path.startsWith('/tools/blog/')) {
    return <Navigate replace to={getPrefixedPath('/blog')} />;
  }


  // Compute global SEO
  let seoTitle = settings?.seo?.title || t('hero.title') || "TacoPDF - Free & Secure Online PDF Tools";
  let seoDesc = settings?.seo?.description || t('hero.subtitle') || "Process PDFs locally in your browser. Maximum privacy and security.";

  if (activeToolId) {
    const act = TOOLS.find(t => t.id === activeToolId);
    if (act) {
      seoTitle = t(`tool_name.${act.id.replace(/-/g, '_')}`, act.name);
      seoDesc = t(`seo.features.${act.id.replace(/-/g, '_')}`, act.description);
    }
  } else if (activePage === 'contact') {
    seoTitle = t(`page.contact.title`) || "Contact Us";
  } else if (activePage === 'admin') {
    seoTitle = "Admin Dashboard | TacoPDF";
  } else if (activePage === 'how-it-works') {
    seoTitle = t('page.how.title') || 'How It Works';
  } else if (activePage === 'blog') {
    seoTitle = t('nav.blog') || "Blog";
  } else if (activePage) {
    seoTitle = getPageTitle(activePage);
  }

  return (
    <div 
      onDragEnter={handleGlobalDragEnter}
      onDragOver={(e) => e.preventDefault()}
      className="bg-background text-on-surface min-h-screen flex flex-col font-sans selection:bg-primary-container/35 selection:text-primary relative"
    >
      <PageSEO title={seoTitle} description={seoDesc} activeToolId={activeToolId} currentSlug={path} />

      {settings?.banner?.enabled && (
        <div className={`${settings.banner.color || 'bg-primary'} text-on-primary text-center py-2 text-sm font-bold shadow-sm`}>
          {settings.banner.text}
        </div>
      )}

      {/* Navbar Section */}
      <Navbar 
        onSelectTool={handleSelectTool} 
        onGoHome={handleGoHome} 
        activeToolId={activeToolId} 
      />

      <main className="flex-grow">


        <React.Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <AnimatePresence mode="wait">
            {!activeToolId && !activePage ? (
            /* HOME STATE */
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero Section */}
              <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-semibold text-primary mb-4 shadow-sm select-none">
                  <Shield size={12} className="text-primary-container" /> {t('hero.badge')}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4 max-w-4xl mx-auto leading-tight">
                  {t('hero.title')}
                </h1>
                
                <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-6 leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button 
                    onClick={handleGetStarted}
                    className="bg-primary-container text-on-primary-container font-bold px-8 py-4 rounded-full hover:bg-primary transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-primary-container/20 active:scale-[0.98] cursor-pointer"
                  >
                    {t('hero.cta')}
                    <ArrowRight size={18} />
                  </button>
                  
                  <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                    <Zap size={11} /> {t('hero.speed')}
                  </span>
                </div>
              </section>

              {/* Tools Dashboard Grid */}
              <div ref={toolGridRef} className="scroll-mt-24">
                <ToolGrid onSelectTool={handleSelectTool} toolSettings={settings?.tools} />
              </div>

              {/* SEO and Marketing Column */}
              <SEOSection onSelectTool={handleSelectTool} />

              {/* FAQ Accordions */}
              <FAQSection />

              {/* SEO Long Form Article */}
              <SeoArticle />
            </motion.div>
          ) : activePage === 'contact' ? (
            /* CONTACT PAGE STATE */
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ContactPage onBack={handleGoHome} />
            </motion.div>
          ) : activePage === 'admin' ? (
            /* ADMIN PAGE STATE */
            <motion.div
              key="admin-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <AdminContainer onBack={handleGoHome} />
            </motion.div>
          ) : activePage === 'blog' ? (
            /* BLOG INDEX STATE */
            <motion.div
              key="blog-index"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <BlogIndex />
            </motion.div>
          ) : activePage === 'article' && activeSlug ? (
            /* BLOG ARTICLE STATE */
            <motion.div
              key="article-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ArticleTemplate slug={activeSlug} />
            </motion.div>
          ) : activePage === 'how-it-works' ? (
            /* HOW IT WORKS PAGE STATE */
            <motion.div
              key="how-it-works-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-w-[1000px] mx-auto px-4 py-12 md:py-20"
            >
              <button 
                onClick={handleGoHome}
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} /> {t('contact.back') || 'Back to Home'}
              </button>
              
              <div className="space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-2">
                    <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-on-surface">{t('how.intro.title')}</h2>
                  <p className="text-on-surface-variant text-lg max-w-3xl mx-auto leading-relaxed">
                    {t('how.intro.text')}
                  </p>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/50 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-24 h-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{t('how.step1.title')}</h3>
                    <p className="text-on-surface-variant leading-relaxed relative z-10">{t('how.step1.text')}</p>
                  </div>

                  <div className="bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/50 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-24 h-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{t('how.step2.title')}</h3>
                    <p className="text-on-surface-variant leading-relaxed relative z-10">{t('how.step2.text')}</p>
                  </div>

                  <div className="bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/50 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-24 h-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{t('how.step3.title')}</h3>
                    <p className="text-on-surface-variant leading-relaxed relative z-10">{t('how.step3.text')}</p>
                  </div>

                  <div className="bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/50 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-24 h-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{t('how.step4.title')}</h3>
                    <p className="text-on-surface-variant leading-relaxed relative z-10">{t('how.step4.text')}</p>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-16 border-t border-outline-variant/50 pt-12">
                  <h2 className="text-2xl font-bold text-on-surface mb-8 text-center">{t('how.benefits.title')}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6">
                      <h4 className="text-lg font-bold text-on-surface mb-2">{t('how.benefit1.title')}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{t('how.benefit1.text')}</p>
                    </div>
                    <div className="text-center p-6 border-y md:border-y-0 md:border-x border-outline-variant/50">
                      <h4 className="text-lg font-bold text-on-surface mb-2">{t('how.benefit2.title')}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{t('how.benefit2.text')}</p>
                    </div>
                    <div className="text-center p-6">
                      <h4 className="text-lg font-bold text-on-surface mb-2">{t('how.benefit3.title')}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{t('how.benefit3.text')}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button onClick={handleGoHome} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40">
                    Try Our Tools Now &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activePage ? (
            /* LEGAL/STATIC PAGE STATE */
            <motion.div
              key="static-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <LegalPage 
                pageId={activePage}
                title={getPageTitle(activePage)} 
                lastUpdated="2026-07-18"
                onBack={handleGoHome}
                content={
                  activePage === 'about' ? (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-surface-variant/30 p-6 rounded-2xl border border-outline-variant/30 mb-2">
                        <img 
                          src="/profile.jpg" 
                          alt="Muhammad Bayu Edi" 
                          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-surface shadow-lg"
                        />
                        <div className="flex-1 text-center md:text-left">
                          <h2 className="text-2xl font-bold text-on-surface mb-1">Muhammad Bayu Edi</h2>
                          <p className="text-primary font-medium mb-3">Creator & Lead Developer</p>
                          <p className="text-on-surface-variant text-sm leading-relaxed mb-4 max-w-xl">
                            Passionate software developer from Central Java, Indonesia. Building secure, privacy-first tools to make digital life easier for everyone.
                          </p>
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <a href="https://web.facebook.com/baylightyear04/" target="_blank" rel="noopener noreferrer" className="p-2 bg-surface hover:bg-surface-variant rounded-full text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/50 shadow-sm" aria-label="Facebook">
                              <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/bay.lightyear/" target="_blank" rel="noopener noreferrer" className="p-2 bg-surface hover:bg-surface-variant rounded-full text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/50 shadow-sm" aria-label="Instagram">
                              <Instagram className="w-4 h-4" />
                            </a>
                            <a href="mailto:mbayuedi@gmail.com" className="p-2 bg-surface hover:bg-surface-variant rounded-full text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/50 shadow-sm" aria-label="Email">
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('about.p1.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p1.text1')}</p>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p1.text2')}</p>
                        <p className="text-on-surface-variant leading-relaxed">{t('about.p1.text3')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('about.p2.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p2.text1')}</p>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p2.text2')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('about.p3.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p3.text1')}</p>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p3.text2')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('about.p4.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p4.text1')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('about.p5.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-2">{t('about.p5.text1')}</p>
                        <p className="text-on-surface-variant leading-relaxed font-semibold">{t('about.p5.text2')}</p>
                      </section>
                    </div>
                  ) : activePage === 'privacy' ? (
                    <div className="space-y-8">
                      <section>
                        <p className="text-on-surface-variant leading-relaxed text-lg mb-6">{t('privacy.intro')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('privacy.p1.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('privacy.p1.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('privacy.p2.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('privacy.p2.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('privacy.p3.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('privacy.p3.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('privacy.p4.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">
                          {t('privacy.p4.text')}
                          <br/><br/>
                          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium mr-4">
                            Google Ads Settings &rarr;
                          </a>
                          <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                            AboutAds.info &rarr;
                          </a>
                        </p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('privacy.p5.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('privacy.p5.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('privacy.p6.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">
                          {t('privacy.p6.text')}
                        </p>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleSelectPage('contact'); }} className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">
                          {t('contact.title') || 'Contact Support'}
                        </a>
                      </section>
                    </div>
                  ) : activePage === 'terms' ? (
                    <div className="space-y-8">
                      <section>
                        <p className="text-on-surface-variant leading-relaxed text-lg mb-6">{t('tos.intro')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('tos.p1.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('tos.p1.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('tos.p2.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('tos.p2.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('tos.p3.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('tos.p3.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('tos.p4.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('tos.p4.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('tos.p5.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('tos.p5.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('tos.p6.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('tos.p6.text')}</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleSelectPage('contact'); }} className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">
                          {t('contact.title') || 'Contact Support'}
                        </a>
                      </section>
                    </div>
                  ) : activePage === 'cookie' ? (
                    <div className="space-y-8">
                      <section>
                        <p className="text-on-surface-variant leading-relaxed text-lg mb-6">{t('cookie.intro')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('cookie.p1.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('cookie.p1.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('cookie.p2.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('cookie.p2.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('cookie.p3.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('cookie.p3.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('cookie.p4.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('cookie.p4.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('cookie.p5.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">
                          {t('cookie.p5.text')}
                          <br/><br/>
                          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium mr-4">
                            Google Ads Settings &rarr;
                          </a>
                          <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                            AboutAds.info &rarr;
                          </a>
                        </p>
                      </section>
                    </div>
                  ) : activePage === 'retention' ? (
                    <div className="space-y-8">
                      <section>
                        <p className="text-on-surface-variant leading-relaxed text-lg mb-6">{t('retention.intro')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('retention.p1.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4 font-semibold uppercase">{t('retention.p1.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('retention.p2.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('retention.p2.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('retention.p3.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('retention.p3.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('retention.p4.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('retention.p4.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('retention.p5.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('retention.p5.text')}</p>
                      </section>
                    </div>
                  ) : activePage === 'disclaimer' ? (
                    <div className="space-y-8">
                      <section>
                        <p className="text-on-surface-variant leading-relaxed text-lg mb-6">{t('disclaimer.intro')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('disclaimer.p1.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('disclaimer.p1.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('disclaimer.p2.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4 uppercase font-semibold">{t('disclaimer.p2.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('disclaimer.p3.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('disclaimer.p3.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('disclaimer.p4.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('disclaimer.p4.text')}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-bold text-primary mb-3">{t('disclaimer.p5.title')}</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-4">{t('disclaimer.p5.text')}</p>
                      </section>
                    </div>
                  ) : activePage === 'sitemap' ? (
                    <div className="space-y-8">
                      <section>
                        <p className="text-on-surface-variant leading-relaxed text-lg mb-6">
                          {t('sitemap.intro', 'Welcome to the TacoPDF Sitemap. Here you can find a structured list of all the pages and tools available on our website.')}
                        </p>
                      </section>
                      <div className="grid md:grid-cols-2 gap-8">
                        <section>
                          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                            <Zap size={20} /> {t('nav.tools')}
                          </h3>
                          <ul className="space-y-2">
                            {TOOLS.map((tool) => (
                              <li key={tool.id}>
                                <LocalizedLink to={getToolSeoPath(tool.id)} onClick={(e) => { e.preventDefault(); handleSelectTool(tool.id); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                  {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}
                                </LocalizedLink>
                              </li>
                            ))}
                          </ul>
                        </section>
                        <section className="space-y-8">
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                              <Shield size={20} /> {t('footer.legal')}
                            </h3>
                            <ul className="space-y-2">
                              <li><LocalizedLink to="/privacy" onClick={(e) => { e.preventDefault(); handleSelectPage('privacy'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.privacy')}</LocalizedLink></li>
                              <li><LocalizedLink to="/terms" onClick={(e) => { e.preventDefault(); handleSelectPage('terms'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.terms')}</LocalizedLink></li>
                              <li><LocalizedLink to="/cookie" onClick={(e) => { e.preventDefault(); handleSelectPage('cookie'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.cookie')}</LocalizedLink></li>
                              <li><LocalizedLink to="/retention" onClick={(e) => { e.preventDefault(); handleSelectPage('retention'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.retention')}</LocalizedLink></li>
                              <li><LocalizedLink to="/disclaimer" onClick={(e) => { e.preventDefault(); handleSelectPage('disclaimer'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.disclaimer')}</LocalizedLink></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                              <FileText size={20} /> {t('footer.company')}
                            </h3>
                            <ul className="space-y-2">
                              <li><LocalizedLink to="/how-it-works" onClick={(e) => { e.preventDefault(); handleSelectPage('how-it-works'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.works')}</LocalizedLink></li>
                              <li><LocalizedLink to="/about" onClick={(e) => { e.preventDefault(); handleSelectPage('about'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.about')}</LocalizedLink></li>
                              <li><LocalizedLink to="/blog" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('nav.blog')}</LocalizedLink></li>
                              <li><LocalizedLink to="/contact" onClick={(e) => { e.preventDefault(); handleSelectPage('contact'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('footer.contact')}</LocalizedLink></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                              <Shield size={20} /> {t('footer.support')}
                            </h3>
                            <ul className="space-y-2">
                              <li><LocalizedLink to="/#faq" onClick={(e) => { e.preventDefault(); handleGoHome('faq'); }} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{t('nav.faq')}</LocalizedLink></li>
                            </ul>
                          </div>
                        </section>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-on-surface mb-4">{getPageTitle(activePage)}</h2>
                      <p className="text-on-surface-variant leading-relaxed">
                        {t('legal.placeholder') || `This is a placeholder for the ${activePage} page. The content will be updated soon.`}
                      </p>
                    </div>
                  )
                }
              />
            </motion.div>
          ) : (
            /* ACTIVE TOOL WORKSPACE STATE */
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTool ? (
                <Workspace 
                  tool={activeTool} 
                  onBack={handleGoHome} 
                  initialFiles={workspaceFiles}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
        </React.Suspense>
      </main>

      {/* Footer Section */}
      <Footer 
        onSelectTool={handleSelectTool} 
        onGoHome={handleGoHome} 
        onSelectPage={handleSelectPage}
      />



      {/* Global Drag Overlay */}
      <AnimatePresence>
        {isGlobalDragging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragLeave={() => setIsGlobalDragging(false)}
            onDrop={handleGlobalDrop}
            onDragOver={(e) => e.preventDefault()}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md border-[6px] border-dashed border-primary-container m-4 md:m-8 rounded-[3rem] flex flex-col items-center justify-center pointer-events-auto shadow-2xl shadow-primary-container/10"
          >
            <div className="bg-surface-container p-6 rounded-full text-primary-container mb-6 shadow-2xl shadow-primary-container/20 animate-bounce">
              <Upload size={64} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface">Drop PDF to Start</h2>
            <p className="text-on-surface-variant mt-3 text-lg font-medium tracking-wide">We will magically ask you what to do next!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Dropped Files Action Modal */}
      <AnimatePresence>
        {globalDroppedFiles.length > 0 && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGlobalDroppedFiles([])}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-container border border-outline-variant w-full max-w-3xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                    <FileText className="text-primary" size={20} />
                    You dropped {globalDroppedFiles.length} file{globalDroppedFiles.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">What would you like to do with them?</p>
                </div>
                <button
                  onClick={() => setGlobalDroppedFiles([])}
                  className="p-2 hover:bg-surface-container-highest rounded-full text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {TOOLS.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        handleSelectTool(tool.id, globalDroppedFiles);
                        setGlobalDroppedFiles([]);
                      }}
                      className="bg-surface-container-low border border-outline-variant/60 p-4 rounded-xl flex flex-col items-center text-center gap-3 hover:bg-surface-container hover:border-primary/50 group cursor-pointer transition-all"
                    >
                      <div className="bg-surface-container-highest p-3 rounded-lg text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                        <TacoIcon name={tool.icon} size={72} />
                      </div>
                      <span className="font-bold text-sm text-on-surface group-hover:text-primary-container">
                        {t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
