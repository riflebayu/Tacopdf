import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, FileText, BarChart3, Shield, PenTool, Image as ImageIcon, Send, Trash2 } from 'lucide-react';
import { auth } from '../firebaseAuth';
import { signOut } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { RealAnalytics } from './RealAnalytics';
import { useArticles, cachedArticles } from '../hooks/useArticles';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('workspace');
  
  // AI Auto-Blogging State
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });

  // Article Management State
  const { articles, loading: loadingArticles } = useArticles();
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !keyword || !content) {
      setPublishStatus({ type: 'error', message: 'Title, Keyword, and Content are required.' });
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
          content,
          imageUrl,
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
      
      // Reset form
      setTitle('');
      setKeyword('');
      setContent('');
      setImageUrl('');

      // Invalidate cache so it fetches the new article when the user visits the blog or reloads
      // We can also force a reload of the page to refresh everything cleanly
      setTimeout(() => {
        window.location.reload();
      }, 1500);

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
                            {article.translations['en']?.title || 'Untitled Article'}
                          </h3>
                          <div className="text-xs text-on-surface-variant flex gap-3 mt-1">
                            <span>{new Date(article.lastUpdated).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{Object.keys(article.translations).length} Bahasa</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(article.id, article.translations['en']?.title || 'Article')}
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
                <label className="block text-sm font-bold text-on-surface mb-2">Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5 Reasons to Use WebAssembly for PDFs"
                  className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
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
                  <span>Raw Content (Markdown)</span>
                  <span className="text-xs font-normal text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">Sent to Groq AI</span>
                </label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your raw article draft here. Groq AI (Llama 3) will expand and translate it into 7 languages..."
                  className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[200px] resize-y"
                  required
                />
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
    </div>
  );
}
