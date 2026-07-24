import React, { useState, useEffect } from 'react';
import { FileText, Save, LayoutTemplate, Database } from 'lucide-react';
import { getPageContent, savePageContent } from '../services/cmsService';

const CMS_PAGES = [
  { id: 'blog', name: 'Post Blog (Articles)' },
  { id: 'privacy', name: 'Kebijakan Privasi' },
  { id: 'tos', name: 'Ketentuan Layanan' },
  { id: 'cookie', name: 'Kebijakan Cookie' },
  { id: 'disclaimer', name: 'Penafian' },
  { id: 'retention', name: 'Kebijakan Retensi Data' },
  { id: 'howitworks', name: 'Cara Kerjanya' },
  { id: 'about', name: 'Tentang Kami' },
  { id: 'contact', name: 'Hubungi Dukungan' },
  { id: 'faq', name: 'Tanya Jawab (FAQ)' },
  { id: 'sitemap', name: 'Peta Situs' },
];

export function CMSManager() {
  const [activePage, setActivePage] = useState(CMS_PAGES[0].id);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const data = await getPageContent(activePage);
      setContent(data);
      setIsLoading(false);
    };
    fetchContent();
  }, [activePage]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await savePageContent(activePage, content);
    setIsSaving(false);
    if (success) {
      alert('Konten berhasil disimpan ke Database!');
    } else {
      alert('Gagal menyimpan konten. Periksa koneksi Anda.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Pages List */}
      <div className="w-full md:w-64 shrink-0 bg-surface-container border border-outline-variant rounded-2xl p-4 shadow-sm h-fit max-h-[600px] overflow-y-auto">
        <h3 className="text-on-surface font-bold mb-4 flex items-center gap-2 text-sm border-b border-outline-variant pb-2">
          <LayoutTemplate size={16} className="text-primary" /> Daftar Halaman
        </h3>
        <div className="space-y-1">
          {CMS_PAGES.map(page => (
            <button
              key={page.id}
              onClick={() => {
                setActivePage(page.id);
                setContent(''); // Reset content when switching
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center justify-between group ${
                activePage === page.id 
                  ? 'bg-primary text-on-primary shadow-md' 
                  : 'text-on-surface hover:bg-surface border border-transparent hover:border-outline-variant'
              }`}
            >
              <span className="truncate pr-2">{page.name}</span>
              {activePage === page.id && <FileText size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-surface-container border border-outline-variant rounded-2xl shadow-sm flex flex-col h-[600px]">
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface">
                {CMS_PAGES.find(p => p.id === activePage)?.name}
              </h2>
              <p className="text-xs text-on-surface-variant">Mode Editor (Live Sync & Local Storage Fallback)</p>
            </div>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-on-primary rounded-xl font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isSaving ? 'Menyimpan...' : 'Simpan ke Database'}
          </button>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className="mb-2 flex gap-2">
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-xs font-bold hover:bg-surface-container cursor-pointer">B</button>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-xs italic hover:bg-surface-container cursor-pointer">I</button>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-xs underline hover:bg-surface-container cursor-pointer">U</button>
            <span className="text-outline-variant">|</span>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-xs hover:bg-surface-container cursor-pointer">Link</button>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-xs hover:bg-surface-container cursor-pointer">H2</button>
          </div>
          
          {content === '' && !isLoading && (
            <div className="mb-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 text-sm flex items-start gap-3">
              <span className="shrink-0 text-xl leading-none">💡</span>
              <p>
                <strong>Konten saat ini kosong.</strong> Jangan khawatir, website publik Anda akan tetap menampilkan <strong>teks bawaan (default)</strong>. 
                Jika Anda mengetik di sini dan menyimpannya, teks bawaan akan tertimpa oleh tulisan Anda. Kosongkan kembali jika ingin kembali ke teks bawaan.
              </p>
            </div>
          )}

          <div className="relative flex-1 flex flex-col lg:flex-row gap-4 h-full">
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-xl">
                <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <div className="flex-1 flex flex-col min-w-[50%]">
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full bg-background border border-outline-variant rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none font-mono text-sm leading-relaxed"
                placeholder={`Tulis isi konten untuk ${CMS_PAGES.find(p => p.id === activePage)?.name} di sini...\n\nAnda dapat menggunakan Markdown atau HTML dasar.`}
                disabled={isLoading}
              />
            </div>
            
            {/* Visual Preview */}
            <div className="flex-1 flex flex-col bg-surface border border-outline-variant rounded-xl overflow-hidden min-w-[40%]">
              <div className="bg-surface-container-high py-2 px-4 border-b border-outline-variant flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Live Visual Preview</span>
              </div>
              <div className="p-6 overflow-y-auto h-full prose prose-sm md:prose-base dark:prose-invert max-w-none bg-background text-on-surface"
                   dangerouslySetInnerHTML={{ __html: content || `<h2 class="text-surface-variant">Preview will appear here...</h2>` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
