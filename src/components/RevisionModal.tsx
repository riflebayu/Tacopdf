import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { X, Save } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { LANGUAGES } from '../context/LanguageContext';

interface RevisionModalProps {
  article: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RevisionModal({ article, onClose, onSuccess }: RevisionModalProps) {
  const [activeLang, setActiveLang] = useState('en');
  // Initialize editable state with the article's translations
  const [translations, setTranslations] = useState<any>(JSON.parse(JSON.stringify(article.translations)));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const currentTranslation = translations[activeLang] || { title: '', metaDescription: '', content: '' };

  const handleChange = (field: string, value: string | undefined) => {
    setTranslations({
      ...translations,
      [activeLang]: {
        ...currentTranslation,
        [field]: value || ''
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      await updateDoc(doc(db, 'articles', article.id), {
        translations: translations
      });
      onSuccess();
    } catch (err: any) {
      console.error('Error updating article:', err);
      setError(err.message || 'Failed to update article');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/30 bg-surface-container">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">Revisi Artikel</h2>
            <p className="text-sm text-on-surface-variant mt-1">Mengedit data artikel secara manual di Firestore</p>
          </div>
          <button onClick={onClose} className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Sidebar: Languages */}
          <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-outline-variant/30 bg-surface-variant/10 overflow-y-auto">
            <div className="p-4 flex md:flex-col gap-2 overflow-x-auto">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setActiveLang(l.code)}
                  className={`px-4 py-3 text-left rounded-xl font-medium transition-colors flex-shrink-0 whitespace-nowrap ${
                    activeLang === l.code
                      ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                      : 'text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  {l.name} ({l.code.toUpperCase()})
                </button>
              ))}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-surface p-6 gap-6" data-color-mode="dark">
            
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 text-error rounded-xl font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Judul Artikel ({activeLang.toUpperCase()})</label>
              <input
                type="text"
                value={currentTranslation.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Meta Deskripsi SEO ({activeLang.toUpperCase()})</label>
              <textarea
                value={currentTranslation.metaDescription || ''}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                rows={3}
                className="w-full p-3 bg-surface-variant/30 border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
            </div>

            <div className="flex-1 flex flex-col min-h-[400px]">
              <label className="block text-sm font-bold text-on-surface mb-2">Konten Markdown ({activeLang.toUpperCase()})</label>
              <div className="flex-1 border border-outline-variant rounded-xl overflow-hidden">
                <MDEditor
                  value={currentTranslation.content || ''}
                  onChange={(val) => handleChange('content', val)}
                  height="100%"
                  preview="live"
                  hideToolbar={false}
                  className="!border-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline-variant/30 bg-surface-container flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-on-surface hover:bg-surface-variant transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold transition-all shadow-md ${
              isSaving
                ? 'bg-primary/50 text-on-primary cursor-not-allowed'
                : 'bg-primary text-on-primary hover:bg-primary/90 shadow-primary/20'
            }`}
          >
            {isSaving ? 'Menyimpan...' : (
              <><Save size={18} /> Simpan Perubahan</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
