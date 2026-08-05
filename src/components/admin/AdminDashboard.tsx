import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, X, Search, FileText, Globe2, LayoutDashboard, ChevronRight, LogOut, Lock, Trash2, Edit3, Settings, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

const LANGUAGES = [
  { id: 'en', label: 'English (EN)', flag: '🇺🇸' },
  { id: 'id', label: 'Indonesian (ID)', flag: '🇮🇩' },
  { id: 'ja', label: 'Japanese (JA)', flag: '🇯🇵' },
  { id: 'es', label: 'Spanish (ES)', flag: '🇪🇸' },
  { id: 'pt', label: 'Portuguese (PT)', flag: '🇵🇹' },
  { id: 'fr', label: 'French (FR)', flag: '🇫🇷' },
  { id: 'de', label: 'German (DE)', flag: '🇩🇪' },
];

export default function AdminDashboard() {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'generate' | 'manage'>('generate');
  const [topic, setTopic] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en']);
  
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);
  
  const [titlesLoading, setTitlesLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);

  const [generating, setGenerating] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, 'pending' | 'loading' | 'success' | 'error'>>({});

  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState<string | null>(null);

  // API Key Pool State
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loadingApiKeys, setLoadingApiKeys] = useState(false);

  const fetchApiKeys = async () => {
    setLoadingApiKeys(true);
    try {
      const res = await fetch('/api/api-status');
      const data = await res.json();
      if (data.keys) setApiKeys(data.keys);
    } catch (err) {
      console.error('Failed to fetch API key status', err);
    } finally {
      setLoadingApiKeys(false);
    }
  };

  const resetApiKeys = async () => {
    setLoadingApiKeys(true);
    try {
      const res = await fetch('/api/api-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' })
      });
      const data = await res.json();
      if (data.keys) setApiKeys(data.keys);
    } catch (err) {
      console.error('Failed to reset API keys', err);
    } finally {
      setLoadingApiKeys(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchApiKeys();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setLoginError(err.message || 'Failed to sign in');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Failed to log out', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSuggestIdeas = async () => {
    setIdeasLoading(true);
    setIdeas([]);
    try {
      const res = await fetch('/api/suggest-ideas', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch ideas');
      if (data.ideas) setIdeas(data.ideas);
    } catch (err: any) {
      console.error(err);
      alert('Failed to fetch ideas: ' + err.message);
    } finally {
      setIdeasLoading(false);
    }
  };

  const handleGenerateTitle = async () => {
    if (!topic) return alert('Please enter a topic first');
    setTitlesLoading(true);
    setTitles([]);
    try {
      const res = await fetch('/api/generate-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch titles');
      if (data.titles) setTitles(data.titles);
    } catch (err: any) {
      console.error(err);
      alert('Failed to fetch titles: ' + err.message);
    } finally {
      setTitlesLoading(false);
    }
  };

  const toggleLanguage = (langId: string) => {
    setSelectedLanguages(prev => 
      prev.includes(langId) ? prev.filter(id => id !== langId) : [...prev, langId]
    );
  };

  const handleGenerateArticles = async () => {
    if (!topic) return alert('Please enter a topic');
    if (!image) return alert('Please upload an image');
    if (selectedLanguages.length === 0) return alert('Please select at least one language');

    setGenerating(true);
    
    const initialStatus: Record<string, 'pending'> = {};
    selectedLanguages.forEach(lang => {
      initialStatus[lang] = 'pending';
    });
    setStatusMap(initialStatus);

    for (const lang of selectedLanguages) {
      setStatusMap(prev => ({ ...prev, [lang]: 'loading' }));
      
      const formData = new FormData();
      formData.append('topic', topic);
      formData.append('image', image);
      formData.append('prompt', prompt);
      formData.append('language', lang);

      try {
        const res = await fetch('/api/generate-blog', {
          method: 'POST',
          body: formData,
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to generate');
        }
        
        setStatusMap(prev => ({ ...prev, [lang]: 'success' }));
      } catch (err: any) {
        console.error(`Error generating for ${lang}:`, err);
        alert(`Error for ${lang}: ` + err.message);
        setStatusMap(prev => ({ ...prev, [lang]: 'error' }));
      }
    }
    
    setGenerating(false);
  };

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const res = await fetch('/api/list-articles');
      const data = await res.json();
      if (res.ok && data.articles) {
        setArticles(data.articles);
      }
    } catch (e) {
      console.error('Failed to fetch articles', e);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchArticles();
    }
  }, [activeTab]);

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    setDeletingArticle(id);
    try {
      const res = await fetch('/api/delete-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
      } else {
        const err = await res.json();
        alert('Failed to delete: ' + err.error);
      }
    } catch (e: any) {
      alert('Failed to delete: ' + e.message);
    } finally {
      setDeletingArticle(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-surface-container-low border border-outline-variant rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
              <Lock className="w-6 h-6 text-on-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Admin Login</h1>
            <p className="text-sm text-on-surface-variant mt-2 text-center">Sign in to access the TacoPDF AI CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@tacopdf.com"
                className="w-full bg-surface-container border border-outline rounded-xl px-4 py-3 text-on-surface placeholder-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container border border-outline rounded-xl px-4 py-3 text-on-surface placeholder-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            
            <AnimatePresence>
              {loginError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{loginError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={isLoggingIn || !email || !password}
              className="w-full bg-primary hover:opacity-90 text-on-primary px-6 py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-4 active:scale-[0.98]"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30 overflow-x-hidden pb-20 relative">
      
      {/* Header */}
      <header className="relative z-10 border-b border-outline-variant bg-surface-container-low/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-on-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-on-surface">TacoPDF AI CMS</h1>
              <p className="text-xs text-primary font-medium tracking-wide uppercase">Content Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-surface-container-high border border-outline px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {user.email}
            </div>
            
            <div className="flex bg-surface-container border border-outline rounded-xl p-1">
              <button 
                onClick={() => setActiveTab('generate')}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'generate' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}
              >
                <Edit3 className="w-4 h-4" />
                Generate
              </button>
              <button 
                onClick={() => setActiveTab('manage')}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'manage' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}
              >
                <Settings className="w-4 h-4" />
                Manage
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-surface-container border border-outline hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all text-on-surface-variant"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 mt-8">
        {/* Gemini API Key Pool Health Widget */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-5 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-on-surface">Gemini API Pool Manager</h3>
                  <span className="bg-primary text-on-primary font-black text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                    {apiKeys.length} API Keys Total
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">Automated rotation & failover system active</p>
              </div>
            </div>

            {/* Quick Status Badges & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant px-3 py-1.5 rounded-xl text-xs font-semibold">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {apiKeys.filter(k => k.status === 'ACTIVE').length} Active
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-on-surface-variant">
                  {apiKeys.filter(k => k.status === 'STANDBY').length} Standby
                </span>
                {apiKeys.filter(k => k.status === 'LIMIT').length > 0 && (
                  <>
                    <span className="text-outline-variant">•</span>
                    <span className="text-red-400 font-bold">
                      {apiKeys.filter(k => k.status === 'LIMIT').length} Limit
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  onClick={fetchApiKeys}
                  disabled={loadingApiKeys}
                  className="text-xs px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant transition-all flex items-center gap-1.5 font-medium border border-outline-variant"
                  title="Refresh Status"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingApiKeys ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button 
                  onClick={resetApiKeys}
                  disabled={loadingApiKeys}
                  className="text-xs px-3 py-1.5 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary transition-all font-semibold border border-primary/30"
                  title="Reset Limit Flags"
                >
                  Reset Limits
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {apiKeys.length > 0 ? (
              apiKeys.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                    item.status === 'ACTIVE'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : item.status === 'LIMIT'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>API #{item.id}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      item.status === 'ACTIVE'
                        ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                        : item.status === 'LIMIT'
                        ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                        : 'bg-zinc-500'
                    }`} />
                  </div>
                  <div className="text-[10px] opacity-75 font-mono truncate mb-1">
                    {item.maskedKey}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider">
                    {item.status === 'ACTIVE' ? '🟢 Active' : item.status === 'LIMIT' ? '🔴 Limit' : '⚪ Standby'}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-xs text-on-surface-variant py-3 bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
                Standard single API Key mode active. Set <code className="text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">GEMINI_API_KEYS="key1,key2,key3..."</code> in <code className="text-primary font-mono">.env</code> to activate 6-Key Pool.
              </div>
            )}
          </div>
        </div>

        {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Topic Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-on-surface">
                  <FileText className="w-5 h-5 text-primary" />
                  Content Subject
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Target Keyword / Main Topic</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline transition-colors group-focus-within:text-primary" />
                      <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Benefits of Paperless Office"
                        className="w-full bg-surface-container-highest border border-outline rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-inner"
                      />
                    </div>
                    <button 
                      onClick={handleGenerateTitle}
                      disabled={titlesLoading || !topic}
                      className="bg-primary hover:opacity-90 text-on-primary px-6 py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
                    >
                      {titlesLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Auto Title
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleSuggestIdeas}
                  disabled={ideasLoading}
                  className="w-full flex justify-center items-center gap-2 bg-surface-container-high border border-outline hover:border-primary text-on-surface py-3.5 rounded-xl transition-all disabled:opacity-50 font-medium active:scale-[0.98]"
                >
                  {ideasLoading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Globe2 className="w-5 h-5 text-primary" />}
                  Scrape Viral Topics from Web
                </button>

                <AnimatePresence>
                  {(titles.length > 0 || ideas.length > 0) && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-surface-container-highest border border-outline rounded-xl p-5 space-y-5">
                        {titles.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Suggested Titles</h3>
                            <div className="space-y-2">
                              {titles.map((t, i) => (
                                <div key={i} onClick={() => setTopic(t)} className="group flex items-start gap-3 p-3 rounded-lg bg-surface-container hover:bg-primary-container border border-outline hover:border-primary cursor-pointer transition-all">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-outline group-hover:text-on-primary-container" />
                                  <span className="text-sm text-on-surface group-hover:text-on-primary-container flex-1 leading-snug">{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {ideas.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Trending Ideas</h3>
                            <div className="space-y-2">
                              {ideas.map((t, i) => (
                                <div key={i} onClick={() => setTopic(t)} className="group flex items-start gap-3 p-3 rounded-lg bg-surface-container hover:bg-primary-container border border-outline hover:border-primary cursor-pointer transition-all">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-outline group-hover:text-on-primary-container" />
                                  <span className="text-sm text-on-surface group-hover:text-on-primary-container flex-1 leading-snug">{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Custom Prompt & Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 text-on-surface mb-5">
                <LayoutDashboard className="w-5 h-5 text-primary" />
                Additional Assets
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Custom Prompt (Optional)</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Provide specific instructions, tone of voice, or keywords to include..."
                    rows={4}
                    className="w-full bg-surface-container-highest border border-outline rounded-xl px-4 py-3 text-on-surface placeholder-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Featured Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative overflow-hidden group border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 
                      ${imagePreview ? 'border-primary bg-primary/5' : 'border-outline hover:border-primary hover:bg-surface-container-high'}`}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    
                    {imagePreview ? (
                      <div className="w-full relative z-10 flex flex-col items-center">
                        <img src={imagePreview} alt="Preview" className="max-h-48 object-contain rounded-lg shadow-xl" />
                        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setImage(null); setImagePreview(null); }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all"
                          >
                            <X className="w-4 h-4" /> Remove Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center relative z-10">
                        <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary-container transition-all duration-500">
                          <ImageIcon className="w-8 h-8 text-outline-variant group-hover:text-on-primary-container transition-colors" />
                        </div>
                        <p className="text-base font-semibold text-on-surface">Click to upload image</p>
                        <p className="text-xs text-on-surface-variant mt-2">PNG or JPG up to 5MB (Auto WebP)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Execution */}
          <div className="lg:col-span-5 space-y-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-md sticky top-28"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 text-on-surface mb-5">
                <Globe2 className="w-5 h-5 text-primary" />
                Target Languages
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {LANGUAGES.map(lang => {
                  const isSelected = selectedLanguages.includes(lang.id);
                  return (
                    <label 
                      key={lang.id} 
                      className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border
                        ${isSelected ? 'bg-primary-container border-primary' : 'bg-surface-container-high border-outline hover:border-outline-variant'}`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleLanguage(lang.id)}
                        disabled={generating}
                      />
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-primary border-primary text-on-primary' : 'border-outline bg-surface-container'}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-sm font-semibold flex-1 ${isSelected ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>{lang.label}</span>
                      <span className="text-lg opacity-80">{lang.flag}</span>
                    </label>
                  );
                })}
              </div>

              {/* Action Button */}
              <button 
                onClick={handleGenerateArticles}
                disabled={generating || selectedLanguages.length === 0 || !topic || !image}
                className="group relative w-full overflow-hidden rounded-xl font-bold text-on-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 bg-primary hover:opacity-90 active:scale-95"
              >
                <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-on-primary" />
                      <span className="tracking-wide">Synthesizing Articles...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-on-primary group-hover:scale-110 transition-transform" />
                      <span className="tracking-wide">Generate & Deploy locally</span>
                    </>
                  )}
                </div>
              </button>

              {/* Status Map */}
              <AnimatePresence>
                {Object.keys(statusMap).length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-3"
                  >
                    <div className="h-px w-full bg-outline mb-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Live Progress</h3>
                    
                    {selectedLanguages.map(lang => {
                      const status = statusMap[lang];
                      const language = LANGUAGES.find(l => l.id === lang);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={lang} 
                          className="flex items-center justify-between p-3 rounded-xl bg-surface-container-highest border border-outline"
                        >
                          <div className="flex items-center gap-2">
                            <span className="opacity-80">{language?.flag}</span>
                            <span className="text-sm font-semibold text-on-surface">{language?.label}</span>
                          </div>
                          
                          <div className="flex items-center">
                            {status === 'pending' && <span className="text-xs px-2 py-1 rounded bg-surface-container text-outline-variant font-bold">Queued</span>}
                            {status === 'loading' && (
                              <span className="text-xs px-2 py-1 rounded bg-primary-container text-on-primary-container font-bold flex items-center gap-1.5">
                                <Loader2 className="w-3.5 h-3.5 animate-spin"/> Processing
                              </span>
                            )}
                            {status === 'success' && (
                              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-500 font-bold flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5"/> Completed
                              </span>
                            )}
                            {status === 'error' && (
                              <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-500 font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5"/> Failed
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </div>
        )}

        {activeTab === 'manage' && (
          <div className="bg-surface-container border border-outline-variant rounded-2xl shadow-md overflow-hidden pb-10">
            <div className="p-6 border-b border-outline bg-surface-container-low flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Manage Articles</h2>
                <p className="text-sm text-on-surface-variant">View and delete generated articles</p>
              </div>
              <button onClick={fetchArticles} className="px-4 py-2 rounded-xl text-sm font-semibold bg-surface-container-high border border-outline hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                <Loader2 className={`w-4 h-4 ${loadingArticles ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="p-6">
              {loadingArticles && articles.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                  <p>Loading articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant bg-surface-container-high rounded-xl border border-outline-variant border-dashed">
                  <FileText className="w-10 h-10 mb-4 opacity-50" />
                  <p className="font-semibold text-lg text-on-surface">No articles found</p>
                  <p className="text-sm mt-1">Start generating articles from the 'Generate' tab.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Group articles by language */}
                  {Object.entries(
                    articles.reduce((acc, article) => {
                      if (!acc[article.lang]) acc[article.lang] = [];
                      acc[article.lang].push(article);
                      return acc;
                    }, {} as Record<string, any[]>)
                  ).map(([lang, langArticles]) => {
                    const language = LANGUAGES.find(l => l.id === lang) || { label: lang.toUpperCase(), flag: '🌐' };
                    return (
                      <div key={lang} className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-bold text-on-surface border-b border-outline pb-2">
                          <span>{language.flag}</span>
                          <h3>{language.label}</h3>
                          <span className="ml-2 text-xs font-semibold px-2 py-1 bg-surface-container-high rounded-full text-on-surface-variant">
                            {(langArticles as any[]).length}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(langArticles as any[]).map(article => (
                            <div key={article.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-highest border border-outline hover:border-outline-variant transition-all">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-on-surface truncate" title={article.title}>{article.title}</h4>
                                <p className="text-xs text-on-surface-variant truncate font-mono mt-1">/{article.id}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                disabled={deletingArticle === article.id}
                                className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                              >
                                {deletingArticle === article.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
