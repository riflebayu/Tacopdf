"use client";
import React, { useState } from 'react';
import { Upload, FileText, Download, AlertCircle, RefreshCw, Check, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { initPyMuPDF, convertPdfToDocx } from '../../utils/pymupdf-client';
import TacoIcon from '../TacoIcon';

export default function PdfToWordWorkspace({ tool, onBack }: any) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setDownloadUrl('');
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus('processing');
    setProgress(10);
    setStatusText(t('tool.pdf_to_word.status.init', 'Initializing Web Worker & PyMuPDF Engine...'));
    
    // Smooth fake progress animator
    let currentProgress = 10;
    const progressInterval = setInterval(() => {
      currentProgress += (90 - currentProgress) * 0.05; 
      setProgress(Math.round(currentProgress));
    }, 500);
    
    try {
      // 1. Initialize WASM via Worker
      await initPyMuPDF();
      setProgress(40);
      setStatusText(t('tool.pdf_to_word.status.converting', 'Analyzing layout and converting to DOCX...'));
      
      // 2. Perform conversion in Worker (off-thread)
      const docxBlob = await convertPdfToDocx(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      setStatusText(t('tool.pdf_to_word.status.finalizing', 'Finalizing...'));
      
      const url = URL.createObjectURL(docxBlob);
      
      setDownloadUrl(url);
      setStatus('success');
      
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error(err);
      setErrorMessage(err.message || 'An unknown error occurred during conversion.');
      setStatus('error');
      setStatusText('');
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="lg:col-span-7 w-full lg:w-auto flex-1 flex flex-col gap-4">
        <div className="w-full flex-1 border border-outline-variant/30 rounded-2xl h-fit min-h-[200px] bg-surface-container-low flex flex-col relative overflow-hidden">

        {status === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low relative">
            <RefreshCw className="animate-spin text-primary mb-4" size={48} />
            <h3 className="text-xl font-bold text-on-surface mb-2">{t('tool.pdf_to_word.converting', 'Converting PDF to Word...')}</h3>
            <p className="text-on-surface-variant text-sm text-center mb-4 max-w-sm h-10">{statusText}</p>
            <div className="w-64 h-3 bg-surface-container-high rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-on-surface-variant text-sm font-medium">{progress}% {t('tool.pdf_to_word.complete', 'Complete')}</p>
          </div>
        ) : status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-surface-container-low">
             <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
               <Check size={32} />
             </div>
             <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2 text-center">{t('tool.pdf_to_word.done', 'Conversion Complete!')}</h3>
             
             <div className="flex flex-col gap-2 sm:gap-3 mt-4 w-full max-w-sm">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                  <a 
                    href={downloadUrl}
                    download={`${file?.name.replace(/\.pdf$/i, '') || 'document'}.docx`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-sm font-bold shadow-md transition-colors flex-1 sm:flex-none min-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <Download size={16} />
                    {t('tool.pdf_to_word.download', 'Download DOCX')}
                  </a>
                </div>
                
                <div className="pt-3 mt-1 sm:pt-4 sm:mt-2 border-t border-outline-variant/30 flex justify-center w-full">
                  <button
                    onClick={() => { setFile(null); setStatus('idle'); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/30 text-on-surface rounded-lg text-sm font-medium transition-colors w-full shadow-sm"
                  >
                    <RotateCcw size={16} />
                    {t('tool.pdf_to_word.another', 'Convert another file')}
                  </button>
                </div>
             </div>
          </div>
        ) : status === 'error' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low">
             <div className="w-20 h-20 bg-error/20 text-error rounded-full flex items-center justify-center mb-6 border border-error/30">
               <AlertCircle size={40} />
             </div>
             <h3 className="text-2xl font-bold text-on-surface mb-2">{t('tool.pdf_to_word.failed', 'Conversion Failed')}</h3>
             <p className="text-error mb-6 text-center max-w-md font-mono text-sm break-words bg-error/10 p-3 rounded-lg border border-error/20">
               {errorMessage}
             </p>
             <button 
               onClick={() => { setStatus('idle'); setErrorMessage(''); }}
               className="px-6 py-3 bg-surface-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-colors"
             >
               {t('tool.pdf_to_word.try_again', 'Try Again')}
             </button>
          </div>
        ) : file ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1 text-center truncate max-w-xs">{file.name}</h3>
            <p className="text-on-surface-variant text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <button 
               onClick={() => setFile(null)}
               className="text-error font-medium text-sm hover:underline"
             >
               {t('workspace.file.remove', 'Remove file')}
             </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
            <div
              onClick={() => document.getElementById('pdf-to-word-upload')?.click()}
              className="flex border-2 border-dashed rounded-xl p-3 md:p-10 w-full flex-col items-center justify-center cursor-pointer transition-all border-primary-container bg-surface-container"
            >
              <input
                id="pdf-to-word-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="hidden md:flex flex-col items-center justify-center text-center">
                <Upload size={48} className="text-primary-container mb-4" />
                <p className="text-lg font-bold text-on-surface mb-2">{t('tool.pdf_to_word.select', 'Select PDF file')}</p>
                <p className="text-sm text-on-surface-variant mb-6">
                  {t('tool.pdf_to_word.drop', 'Drop your PDF here or click to browse. Max file size: 50MB.')}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); document.getElementById('pdf-to-word-upload')?.click(); }}
                  className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-xs"
                >
                  {t('workspace.drop.browse', 'Browse files')}
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
        
        {(file && status !== 'processing' && status !== 'success' && status !== 'error') && (
           <div className="hidden lg:block w-full">
              <button 
                onClick={handleConvert}
                disabled={!file || status === 'processing'}
                className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-4 px-4 rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'processing' ? <RefreshCw className="animate-spin" size={32} /> : <TacoIcon name={tool.icon} size={32} />}
                {status === 'processing' ? t('tool.pdf_to_word.btn_processing', 'Converting...') : t('tool.pdf_to_word.btn_convert', 'Convert to Word')}
              </button>
           </div>
        )}
      </div>

      <div className="lg:col-span-5 w-full lg:w-80 h-fit bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-sm sticky top-24">
         <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
            <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
              <TacoIcon name={tool.icon} size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}</h2>
              </div>
            </div>
         </div>
         
         <div className="p-5 flex-1 overflow-y-auto">
            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex gap-3 text-green-400 text-sm mt-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{t('tool.pdf_to_word.info', 'This tool preserves layouts and fonts completely offline in your browser. No files are uploaded to any server.')}</p>
            </div>
         </div>
         
         {(status !== 'success' && status !== 'error') && (
           <div className={(file && status !== 'processing') ? "fixed bottom-0 left-0 right-0 p-4 bg-surface-container border-t border-outline-variant/30 z-[100] pb-safe lg:hidden" : "p-5 border-t border-outline-variant/30 bg-surface-container-low lg:hidden"}>
              <button 
                onClick={handleConvert}
                disabled={!file || status === 'processing'}
                className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-3.5 px-4 rounded-lg shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'processing' ? <RefreshCw className="animate-spin" size={32} /> : <TacoIcon name={tool.icon} size={32} />}
                {status === 'processing' ? t('tool.pdf_to_word.btn_processing', 'Converting...') : t('tool.pdf_to_word.btn_convert', 'Convert to Word')}
              </button>
           </div>
         )}
      </div>
    </div>
  );
}
