import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, FileText, BarChart3, Shield, PenTool, Image as ImageIcon, Send, Trash2, Wand2 } from 'lucide-react';
import { auth } from '../firebaseAuth';
import { signOut } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { RealAnalytics } from './RealAnalytics';
import { useArticles, cachedArticles } from '../hooks/useArticles';
import { LANGUAGES } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import RevisionModal from './RevisionModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('workspace');
  
  // AI Auto-Blogging State
  const [useRawContent, setUseRawContent] = useState(true);
  const [useCustomPrompt, setUseCustomPrompt] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<{title: string, keyword: string}[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });
  const [targetLanguages, setTargetLanguages] = useState<string[]>(LANGUAGES.map(l => l.code));

  // Article Management State
  const { articles, loading: loadingArticles } = useArticles();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  // We use this local state to instantly hide deleted articles without full refetch
  const [localArticles, setLocalArticles] = useState(articles);

  React.useEffect(() => {
    setLocalArticles(articles);
  }, [articles]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'articles', id));
      
      // Update local cache and state
      if (cachedArticles) {
        const index = cachedArticles.findIndex(a => a.id === id);
        if (index > -1) cachedArticles.splice(index, 1);
      }
      setLocalArticles(prev => prev.filter(a => a.id !== id));
      
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article. Check console for details.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSuggestTitle = async () => {
    if (!title) {
      alert("Please type a rough topic in the Title field first.");
      return;
    }
    setIsSuggesting(true);
    setAiSuggestions([]);
    try {
      const response = await fetch('/api/suggestTitle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: title })
      });
      if (!response.ok) throw new Error("Failed to suggest title");
      const data = await response.json();
      if (data.suggestions) {
        setAiSuggestions(data.suggestions);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to get AI suggestions.");
    } finally {
      setIsSuggesting(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !keyword || (useRawContent && !content)) {
      setPublishStatus({ type: 'error', message: 'Title, Keyword, and (if enabled) Content are required.' });
      return;
    }
    if (targetLanguages.length === 0) {
      setPublishStatus({ type: 'error', message: 'Please select at least one target language.' });
      return;
    }

    setIsPublishing(true);
    setPublishStatus({ type: '', message: '' });

    try {
      if (!imageUrl.trim()) {
        setPublishStatus({ type: 'error', message: 'Featured Image URL is required.' });
        setIsPublishing(false);
        return;
      }

      setPublishStatus({ type: '', message: 'Generating article using Groq AI (Llama 3)...' });
      
      // Fetch to Vercel Serverless Function
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          keyword,
          content: useRawContent ? content : '',
          customPrompt: useCustomPrompt ? customPrompt : '',
          imageUrl,
          targetLanguages,
        }),
      });

      if (!response.ok) {
        let errorMsg = `API returned ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData.details) errorMsg = errData.details;
          else if (errData.error) errorMsg = errData.error;
        } catch (e) {
          // ignore json parse error
        }
        throw new Error(errorMsg);
      }

      const responseData = await response.json();
      
      if (responseData.error) {
        throw new Error(responseData.error);
      }

      setPublishStatus({ type: '', message: 'Saving generated article to Firestore...' });

      // Save complete article data to Firestore
      await addDoc(collection(db, "articles"), {
        translations: responseData.generatedData,
        featuredImage: imageUrl,
        status: "published",
        author: "Muhammad Bayu Edi",
        createdAt: serverTimestamp()
      });
      
      setPublishStatus({ type: 'success', message: 'Article successfully generated and published via AI!' });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      });
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        audio.play().catch(e => console.log('Audio play blocked:', e));
      } catch (e) { console.log(e); }

      const newArticle = {
        id: Math.random().toString(), // temp ID
        translations: responseData.generatedData,
        featuredImage: imageUrl,
        status: "published",
        author: "Muhammad Bayu Edi",
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      setLocalArticles(prev => [newArticle, ...prev]);
      
      // Reset form
      setTitle('');
      setKeyword('');
      setContent('');
      setCustomPrompt('');
      setImageUrl('');

    } catch (error: any) {
      console.error('Publish error:', error);
      setPublishStatus({ type: 'error', message: error.message || 'Failed to publish article.' });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 selection:bg-primary/30">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-surface-container/80 backdrop-blur-md border border-outline-variant p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-on-surface">TacoPDF Admin</h1>
              <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mt-1">
                SysAdmin: {auth.currentUser?.email}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-xl font-bold transition-all shadow-sm cursor-pointer"
          >
            <LogOut size={16} /> Keluar (Logout)
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="w-full lg:w-1/2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-on-surface border-b border-outline-variant pb-2 mb-4">Statistik Penggunaan Real-time</h2>
              <RealAnalytics />
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface border-b border-outline-variant pb-2 mb-4">Manajemen Artikel</h2>
              <div className="bg-surface rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden">
                {loadingArticles ? (
                  <div className="p-8 text-center text-on-surface-variant flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Memuat daftar artikel...
                  </div>
                ) : localArticles.length === 0 ? (
                  <div className="p-8 text-center text-on-surface-variant">
                    Belum ada artikel yang dipublikasikan.
                  </div>
                ) : (
                  <ul className="divide-y divide-outline-variant/30">
                    {localArticles.map((article) => (
                      <li key={article.id} className="p-4 hover:bg-surface-variant/20 transition-colors flex items-center justify-between gap-4">
                        <div className="flex-grow min-w-0">
                          <h3 className="font-bold text-on-surface truncate">
                            {article.translations['en']?.title || (Object.keys(article.translations).length > 0 ? article.translations[Object.keys(article.translations)[0]]?.title : 'Untitled Article')}
                          </h3>
                          <div className="text-xs text-on-surface-variant flex gap-3 mt-1">
                            <span>{new Date(article.lastUpdated).toLocaleDateString()} {new Date(article.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span>•</span>
                            <span>{Object.keys(article.translations).length} Bahasa</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingArticle(article)}
                            className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all"
                            title="Revisi Artikel"
                          >
                            <PenTool size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id, article.translations['en']?.title || (Object.keys(article.translations).length > 0 ? article.translations[Object.keys(article.translations)[0]]?.title : 'Article'))}
                            disabled={deletingId === article.id}
                            className={`p-2 rounded-xl transition-all ${
                              deletingId === article.id 
                                ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed' 
                                : 'bg-error/10 text-error hover:bg-error hover:text-white'
                            }`}
                            title="Hapus Artikel"
                          >
                            {deletingId === article.id ? (
                              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </main>

          <aside className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-xl font-bold text-on-surface border-b border-outline-variant pb-2 flex items-center gap-2">
              <PenTool size={20} className="text-primary" /> AI Auto-Blogging
            </h2>
            
            <form onSubmit={handlePublish} className="bg-surface p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              
              {publishStatus.message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${publishStatus.type === 'error' ? 'bg-error/10 text-error border border-error/20' : 'bg-green-500/10 text-green-700 border border-green-500/20'}`}>
                  {publishStatus.message}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-on-surface">Title</label>
                  <button 
                    type="button" 
                    onClick={handleSuggestTitle}
                    disabled={isSuggesting}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-container bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {isSuggesting ? <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Wand2 size={14} />}
                    {isSuggesting ? 'Mencari...' : 'Saran Judul AI'}
                  </button>
                </div>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5 Reasons to Use WebAssembly for PDFs"
                  className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                {aiSuggestions.length > 0 && (
                  <div className="mt-2 bg-surface-variant/20 border border-primary/30 rounded-xl overflow-hidden shadow-sm animate-fade-in">
                    <div className="bg-primary/10 px-3 py-2 text-xs font-bold text-primary border-b border-primary/20">
                      Pilih Saran Judul Terbaik:
                    </div>
                    <ul className="divide-y divide-outline-variant/30">
                      {aiSuggestions.map((s, idx) => (
                        <li key={idx}>
                          <button 
                            type="button"
                            onClick={() => {
                              setTitle(s.title);
                              setKeyword(s.keyword);
                              setAiSuggestions([]);
                            }}
                            className="w-full text-left p-3 hover:bg-primary/5 transition-colors group"
                          >
                            <p className="font-bold text-sm text-on-surface group-hover:text-primary">{s.title}</p>
                            <p className="text-xs text-on-surface-variant mt-1 flex gap-1"><span className="text-primary font-semibold">Keyword:</span> {s.keyword}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">SEO Keyword (Target)</label>
                <input 
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. webassembly pdf processing"
                  className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2 flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    Raw Content (Markdown)
                    <input type="checkbox" checked={useRawContent} onChange={(e) => setUseRawContent(e.target.checked)} className="rounded text-primary focus:ring-primary w-4 h-4" title="Aktifkan form ini" />
                  </span>
                  <span className="text-xs font-normal text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">Sent to Groq AI</span>
                </label>
                {useRawContent ? (
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your raw article draft here. Groq AI (Llama 3) will expand and translate it into 7 languages..."
                    className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[200px] resize-y"
                    required
                  />
                ) : (
                  <div className="w-full p-4 bg-surface-variant/10 border border-outline-variant/30 rounded-xl text-on-surface-variant/50 text-sm italic text-center">
                    Raw Content dinonaktifkan. AI akan membuat artikel 100% dari Judul & Keyword secara otomatis.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2 flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    Custom Prompt (Opsional)
                    <input type="checkbox" checked={useCustomPrompt} onChange={(e) => setUseCustomPrompt(e.target.checked)} className="rounded text-primary focus:ring-primary w-4 h-4" title="Aktifkan form ini" />
                  </span>
                  <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded-md">AI Command</span>
                </label>
                {useCustomPrompt ? (
                  <textarea 
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Instruksi khusus. Contoh: 'Gunakan gaya bahasa santai ala Gen-Z dan tekankan bahwa iLovePDF itu menyimpan file di server sedangkan kita 100% lokal.'"
                    className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-y"
                  />
                ) : (
                  <div className="w-full p-4 bg-surface-variant/10 border border-outline-variant/30 rounded-xl text-on-surface-variant/50 text-sm italic text-center">
                    Custom Prompt dinonaktifkan.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Featured Image URL</label>
                <div className="flex items-center gap-4">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                      <ImageIcon size={20} />
                    </div>
                    <input 
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full pl-12 p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  {imageUrl && (
                    <button type="button" onClick={() => setImageUrl('')} className="p-4 text-error bg-error/10 rounded-xl hover:bg-error/20 transition-colors">
                      Clear
                    </button>
                  )}
                </div>
                {imageUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-outline-variant/30 h-48 w-full relative bg-surface-variant/50 flex items-center justify-center">
                    <img src={imageUrl} alt="Preview" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-3 flex justify-between items-center">
                  <span>Target Bahasa terjemahan</span>
                  <span className="text-xs font-normal text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">{targetLanguages.length} dipilih</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-surface-variant/20 border border-outline-variant/50 rounded-xl">
                  {LANGUAGES.map((lang) => (
                    <label key={lang.code} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-variant/30 rounded-lg transition-colors">
                      <input 
                        type="checkbox"
                        checked={targetLanguages.includes(lang.code)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTargetLanguages([...targetLanguages, lang.code]);
                          } else {
                            setTargetLanguages(targetLanguages.filter(code => code !== lang.code));
                          }
                        }}
                        className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm font-medium text-on-surface">{lang.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isPublishing}
                className={`w-full flex items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all shadow-md ${
                  isPublishing 
                    ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed' 
                    : 'bg-primary text-on-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/40'
                }`}
              >
                {isPublishing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-on-surface-variant border-t-transparent rounded-full animate-spin" />
                    Processing with Groq AI (Llama 3)...
                  </span>
                ) : (
                  <>
                    <Send size={18} /> Generate & Publish
                  </>
                )}
              </button>

            </form>
          </aside>
        </div>
      </div>
      
      {editingArticle && (
        <RevisionModal 
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onSuccess={() => {
            setEditingArticle(null);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
