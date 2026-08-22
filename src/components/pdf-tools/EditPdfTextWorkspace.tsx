import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Upload, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TacoIcon from '../TacoIcon';
import { initializePage, handleFiles, bindPageControls } from '../../utils/edit-pdf-logic/edit-pdf-text-page';
import { setupFormatDock, setupFindSheet } from '../../utils/edit-pdf-logic/edit-pdf-text-dock';
import { editorHtml } from '../../utils/edit-pdf-html';
import '../../styles/edit-pdf-text.css';

interface Props {
  tool?: any;
  onBack?: () => void;
}

const EditPdfTextWorkspace: React.FC<Props> = ({ tool, onBack }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !initialized && containerRef.current) {
      try {
        // Initialize Vanilla JS Logic once DOM is ready
        initializePage();
        setInitialized(true);
      } catch (err) {
        console.error("Failed to initialize PDF Text Editor:", err);
      }
    }
  }, [mounted, initialized]);

  // Listen for the custom event dispatched by the vanilla JS layer
  useEffect(() => {
    const handleExit = () => setFile(null);
    window.addEventListener('taco-exit-editor', handleExit);
    return () => window.removeEventListener('taco-exit-editor', handleExit);
  }, []);

  // Show/hide the editor app element based on file state
  useEffect(() => {
    const app = document.getElementById('text-editor-app');
    if (!app) return;
    if (file) {
      app.removeAttribute('hidden');
      (app as HTMLElement).style.zIndex = '2147483647';
    } else {
      app.setAttribute('hidden', '');
    }
  }, [file]);

  // Attach exitEditor click, bind page controls, and setup mobile dock after file loads
  useEffect(() => {
    if (!file) return;
    const t = window.setTimeout(() => {
      // Back button
      const btn = document.getElementById('exitEditor');
      if (btn) {
        const onClick = () => setFile(null);
        btn.addEventListener('click', onClick);
        (btn as any)._tacoCleanup = onClick;
      }
      // Page number controls
      bindPageControls();
      // Mobile dock (bottom toolbar buttons) — only on mobile
      if (window.matchMedia('(max-width: 768px)').matches) {
        setupFormatDock();
        setupFindSheet();
      }
    }, 100);
    return () => {
      window.clearTimeout(t);
      const btn = document.getElementById('exitEditor');
      if (btn && (btn as any)._tacoCleanup) {
        btn.removeEventListener('click', (btn as any)._tacoCleanup);
      }
    };
  }, [file]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Trigger vanilla JS handler
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* TacoPDF Uploader UI (Visible only when no file is uploaded) */}
      {!file && (
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="lg:col-span-7 w-full lg:w-auto flex-1 flex flex-col gap-4">
            <div className="w-full flex-1 border border-outline-variant/30 rounded-2xl h-fit min-h-[400px] bg-surface-container-low flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
              <div
                onClick={() => document.getElementById('edit-pdf-text-upload')?.click()}
                className="flex border-2 border-dashed rounded-xl p-3 md:p-10 w-full flex-col items-center justify-center cursor-pointer transition-all border-primary-container bg-surface-container hover:bg-surface-container-high"
              >
                <input
                  id="edit-pdf-text-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload size={48} className="text-primary-container mb-4" />
                  <p className="text-lg font-bold text-on-surface mb-2">Select PDF file</p>
                  <p className="text-sm text-on-surface-variant mb-6">
                    Drop your PDF here or click to browse. Max file size: 50MB.
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); document.getElementById('edit-pdf-text-upload')?.click(); }}
                    className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-xs"
                  >
                    Browse files
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel for Info */}
          <div className="lg:col-span-5 w-full lg:w-80 h-fit bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-sm sticky top-24">
            <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
              <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
                {tool && <TacoIcon name={tool.icon} size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-on-surface">{tool?.name || 'Edit PDF Text'}</h2>
                </div>
              </div>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="bg-primary-container/10 border border-primary-container/20 p-3 rounded-xl flex flex-col gap-2 text-sm mt-2">
                <p className="text-on-surface"><strong>Real-time PDF Editing</strong></p>
                <p className="text-on-surface-variant">Click on any text paragraph to edit it in-place. The layout and fonts will reflow automatically just like a word processor. 100% Client-side!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor portal - mounts HTML once, CSS handles fixed positioning */}
      {mounted && createPortal(
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: editorHtml }}
        />,
        document.body
      )}

    </div>
  );
};

export default EditPdfTextWorkspace;
