import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, FileText, BarChart3, Shield, PenTool, Image as ImageIcon, Send } from 'lucide-react';
import { auth } from '../firebaseAuth';
import { signOut } from 'firebase/auth';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { RealAnalytics } from './RealAnalytics';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('workspace');
  
  // AI Auto-Blogging State
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !keyword || !content) {
      setPublishStatus({ type: 'error', message: 'Title, Keyword, and Content are required.' });
      return;
    }

    setIsPublishing(true);
    setPublishStatus({ type: '', message: '' });

    try {
      let imageUrl = '';
      if (image) {
        setPublishStatus({ type: '', message: 'Uploading image to Firebase Storage...' });
        const storageRef = ref(storage, `images/blog/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      setPublishStatus({ type: '', message: 'Generating article using Gemini AI...' });
      
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
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
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
        createdAt: serverTimestamp()
      });
      
      setPublishStatus({ type: 'success', message: 'Article successfully generated and published via AI!' });
      
      // Reset form
      setTitle('');
      setKeyword('');
      setContent('');
      setImage(null);

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
            <h2 className="text-xl font-bold text-on-surface border-b border-outline-variant pb-2">Statistik Penggunaan Real-time</h2>
            <RealAnalytics />
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
                  <span className="text-xs font-normal text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">Sent to Gemini AI</span>
                </label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your raw article draft here. Gemini will expand and translate it into 7 languages..."
                  className="w-full p-4 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[200px] resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Featured Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-grow flex items-center justify-center gap-2 p-4 border-2 border-dashed border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-on-surface-variant hover:text-primary">
                    <ImageIcon size={20} />
                    <span className="text-sm font-medium">{image ? image.name : 'Upload Image File'}</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                  </label>
                  {image && (
                    <button type="button" onClick={() => setImage(null)} className="p-4 text-error bg-error/10 rounded-xl hover:bg-error/20 transition-colors">
                      Clear
                    </button>
                  )}
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
                    Processing with Gemini API...
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
