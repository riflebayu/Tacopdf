import React, { useState, useRef } from 'react';
import { Sparkles, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, X, Search, FileText, Globe2, LayoutDashboard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (data.ideas) setIdeas(data.ideas);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch ideas.');
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
      if (data.titles) setTitles(data.titles);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch titles.');
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
      } catch (err) {
        console.error(`Error generating for ${lang}:`, err);
        setStatusMap(prev => ({ ...prev, [lang]: 'error' }));
      }
    }
    
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-20 relative">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">TacoPDF AI CMS</h1>
              <p className="text-xs text-indigo-300 font-medium tracking-wide">MULTILINGUAL GENERATOR</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-gray-300">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Local Dev Environment
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Inputs (Takes up 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Topic Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Content Subject
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Target Keyword / Main Topic</label>
                  <div className="relative flex gap-3">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-indigo-400" />
                      <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Benefits of Paperless Office"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                      />
                    </div>
                    <button 
                      onClick={handleGenerateTitle}
                      disabled={titlesLoading || !topic}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                      {titlesLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      <span className="hidden sm:inline">Auto Title</span>
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleSuggestIdeas}
                  disabled={ideasLoading}
                  className="w-full flex justify-center items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 py-3.5 rounded-xl transition-all disabled:opacity-50 font-medium active:scale-[0.98]"
                >
                  {ideasLoading ? <Loader2 className="w-5 h-5 animate-spin text-indigo-400" /> : <Globe2 className="w-5 h-5 text-indigo-400" />}
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
                      <div className="bg-black/40 border border-indigo-500/30 rounded-xl p-5 space-y-5">
                        {titles.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">Suggested Titles</h3>
                            <div className="space-y-2">
                              {titles.map((t, i) => (
                                <div key={i} onClick={() => setTopic(t)} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30 cursor-pointer transition-all">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 group-hover:text-indigo-400" />
                                  <span className="text-sm text-gray-300 group-hover:text-white flex-1 leading-snug">{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {ideas.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Trending Ideas</h3>
                            <div className="space-y-2">
                              {ideas.map((t, i) => (
                                <div key={i} onClick={() => setTopic(t)} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 cursor-pointer transition-all">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 group-hover:text-blue-400" />
                                  <span className="text-sm text-gray-300 group-hover:text-white flex-1 leading-snug">{t}</span>
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
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 text-white mb-5">
                <LayoutDashboard className="w-5 h-5 text-blue-400" />
                Additional Assets
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Custom Prompt (Optional)</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Provide specific instructions, tone of voice, or keywords to include..."
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Featured Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative overflow-hidden group border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 
                      ${imagePreview ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/5'}`}
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
                        <img src={imagePreview} alt="Preview" className="max-h-48 object-contain rounded-lg shadow-2xl" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setImage(null); setImagePreview(null); }}
                            className="bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all"
                          >
                            <X className="w-4 h-4" /> Remove Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center relative z-10">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                          <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-base font-medium text-gray-300">Click to upload image</p>
                        <p className="text-xs text-gray-500 mt-2">High-res PNG or JPG (Auto-converted to WebP)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Execution (Takes up 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-28"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 text-white mb-5">
                <Globe2 className="w-5 h-5 text-emerald-400" />
                Target Languages
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {LANGUAGES.map(lang => {
                  const isSelected = selectedLanguages.includes(lang.id);
                  return (
                    <label 
                      key={lang.id} 
                      className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border
                        ${isSelected ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleLanguage(lang.id)}
                        disabled={generating}
                      />
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-600 bg-black'}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-medium text-gray-300 flex-1">{lang.label}</span>
                      <span className="text-lg">{lang.flag}</span>
                    </label>
                  );
                })}
              </div>

              {/* Action Button */}
              <button 
                onClick={handleGenerateArticles}
                disabled={generating || selectedLanguages.length === 0 || !topic || !image}
                className="group relative w-full overflow-hidden rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-600/20"
              >
                <div className={`absolute inset-0 transition-opacity ${generating ? 'bg-indigo-600' : 'bg-gradient-to-r from-indigo-600 to-blue-600 group-hover:opacity-90'}`} />
                <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-200" />
                      <span className="tracking-wide">Synthesizing Articles...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform" />
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
                    <div className="h-px w-full bg-white/10 mb-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Live Progress</h3>
                    
                    {selectedLanguages.map(lang => {
                      const status = statusMap[lang];
                      const language = LANGUAGES.find(l => l.id === lang);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={lang} 
                          className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5"
                        >
                          <div className="flex items-center gap-2">
                            <span>{language?.flag}</span>
                            <span className="text-sm font-medium text-gray-300">{language?.label}</span>
                          </div>
                          
                          <div className="flex items-center">
                            {status === 'pending' && <span className="text-xs px-2 py-1 rounded bg-gray-500/10 text-gray-400 font-medium">Queued</span>}
                            {status === 'loading' && (
                              <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-medium flex items-center gap-1.5">
                                <Loader2 className="w-3.5 h-3.5 animate-spin"/> Processing
                              </span>
                            )}
                            {status === 'success' && (
                              <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-medium flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5"/> Completed
                              </span>
                            )}
                            {status === 'error' && (
                              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 font-medium flex items-center gap-1.5">
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
      </main>
    </div>
  );
}
