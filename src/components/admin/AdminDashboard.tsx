import React, { useState, useRef } from 'react';
import { Sparkles, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

const LANGUAGES = [
  { id: 'en', label: 'English (EN)' },
  { id: 'id', label: 'Indonesian (ID)' },
  { id: 'ja', label: 'Japanese (JA)' },
  { id: 'es', label: 'Spanish (ES)' },
  { id: 'pt', label: 'Portuguese (PT)' },
  { id: 'fr', label: 'French (FR)' },
  { id: 'de', label: 'German (DE)' },
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
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen text-gray-900 font-sans">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">AI Content Generator</h1>
          <p className="text-gray-500 mt-1">Generate multi-language, SEO-optimized blog posts automatically.</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full border border-blue-200">
          Local Environment Only
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Content Details</h2>
            
            <div className="space-y-5">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Topic / Keyword</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Benefits of Paperless Office"
                    className="flex-1 rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button 
                    onClick={handleGenerateTitle}
                    disabled={titlesLoading || !topic}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 font-medium"
                  >
                    {titlesLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Auto Title
                  </button>
                </div>
              </div>

              {/* Ideas Button */}
              <div>
                <button 
                  onClick={handleSuggestIdeas}
                  disabled={ideasLoading}
                  className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 px-4 py-3 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors disabled:opacity-50 font-semibold"
                >
                  {ideasLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  Suggest Viral Topics (Web Search)
                </button>
              </div>

              {/* Display Titles/Ideas */}
              {(titles.length > 0 || ideas.length > 0) && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {titles.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggested Titles:</h3>
                      <ul className="space-y-2">
                        {titles.map((t, i) => (
                          <li key={i} className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 flex items-center justify-between cursor-pointer hover:border-blue-300" onClick={() => setTopic(t)}>
                            {t}
                            <span className="text-xs text-blue-500 font-medium">Use</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {ideas.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Viral Topics Trends:</h3>
                      <ul className="space-y-2">
                        {ideas.map((t, i) => (
                          <li key={i} className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 flex items-center justify-between cursor-pointer hover:border-blue-300" onClick={() => setTopic(t)}>
                            {t}
                            <span className="text-xs text-blue-500 font-medium">Use</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Custom Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Prompt Override (Optional)</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Focus specifically on how PDF compression saves server costs..."
                  rows={3}
                  className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${imagePreview ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <div className="relative group w-full">
                      <img src={imagePreview} alt="Preview" className="h-40 mx-auto object-contain rounded" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setImage(null); setImagePreview(null); }}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to upload an image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Execution */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Target Languages</h2>
            <div className="space-y-3">
              {LANGUAGES.map(lang => (
                <label key={lang.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={selectedLanguages.includes(lang.id)}
                    onChange={() => toggleLanguage(lang.id)}
                    disabled={generating}
                  />
                  <span className="text-sm font-medium text-gray-700">{lang.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <button 
              onClick={handleGenerateArticles}
              disabled={generating || selectedLanguages.length === 0 || !topic || !image}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {generating ? 'Generating...' : 'Generate & Save Articles'}
            </button>

            {Object.keys(statusMap).length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Generation Status:</h3>
                {selectedLanguages.map(lang => (
                  <div key={lang} className="flex items-center justify-between text-sm p-3 rounded-lg border border-gray-100 bg-gray-50">
                    <span className="font-medium text-gray-700">{LANGUAGES.find(l => l.id === lang)?.label}</span>
                    <div>
                      {statusMap[lang] === 'pending' && <span className="text-gray-400">Waiting...</span>}
                      {statusMap[lang] === 'loading' && <span className="text-blue-600 flex items-center gap-1"><Loader2 className="w-4 h-4 animate-spin"/> Generating</span>}
                      {statusMap[lang] === 'success' && <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Saved</span>}
                      {statusMap[lang] === 'error' && <span className="text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Failed</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
