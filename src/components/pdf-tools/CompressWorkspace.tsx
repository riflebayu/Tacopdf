"use client";
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Download, AlertCircle, RefreshCw, Check, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { loadPyMuPDF } from '../../utils/pymupdf-loader';
import TacoIcon from '../TacoIcon';

export default function CompressWorkspace({ tool, onBack }: any) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [savings, setSavings] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setDownloadUrl('');
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setStatus('processing');
    setProgress(10);
    setStatusText(t('tool.compress.status.init', 'Initializing...'));
    
    // Smooth fake progress animator
    let currentProgress = 10;
    const progressInterval = setInterval(() => {
      currentProgress += (95 - currentProgress) * 0.05; // Asymptotic approach to 95%
      setProgress(Math.round(currentProgress));
    }, 500);
    
    try {
      // Import the huge PyMuPDF/Ghostscript WASM (lazy load so it doesn't freeze initial page load)
      setProgress(20);
      setStatusText(t('tool.compress.status.download', 'Downloading compression engine (this may take a while on first run)...'));
      
      // Let the UI render the text before blocking
      await new Promise(r => setTimeout(r, 100));
      
      const pymupdf = await loadPyMuPDF();
      setProgress(40);
      setStatusText(t('tool.compress.status.engine_loaded', 'Engine loaded. Optimizing PDF structure...'));
      
      let dpiTarget = 96;
      let imgQuality = 75;
      
      if (quality === 'low') { dpiTarget = 72; imgQuality = 50; }
      if (quality === 'high') { dpiTarget = 150; imgQuality = 90; }

      const options = {
        images: {
          enabled: true,
          quality: imgQuality,
          dpiTarget,
          dpiThreshold: Math.max(150, dpiTarget + 10),
          convertToGray: false,
        },
        scrub: {
          metadata: true,
          thumbnails: true,
          xmlMetadata: true,
        },
        subsetFonts: true,
        save: {
          garbage: 4,
          deflate: true,
          clean: true,
          useObjstms: true,
        },
      };

      setProgress(60);
      setStatusText(t('tool.compress.status.compressing', 'Compressing images and subsetting fonts...'));
      
      // Perform compression using WASM
      const result = await pymupdf.compressPdf(file, options);
      
      clearInterval(progressInterval);
      setProgress(100);
      setStatusText(t('tool.compress.status.finalizing', 'Finalizing...'));
      
      const blob = result.blob;
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setStatus('success');
      
      const originalSize = file.size;
      const newSize = blob.size;
      
      // Small delay for smooth UI transition to 100%
      await new Promise(r => setTimeout(r, 400));
      
      if (newSize < originalSize) {
        const percent = Math.round((1 - (newSize / originalSize)) * 100);
        setSavings(t('tool.compress.reduced_by', 'Reduced by {percent}% ({size} MB)').replace('{percent}', percent.toString()).replace('{size}', (newSize / 1024 / 1024).toFixed(2)));
      } else {
        setSavings(`No significant reduction (Output: ${(newSize / 1024 / 1024).toFixed(2)} MB)`);
      }
      
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error(err);
      setErrorMessage(err.message || 'An unknown error occurred during compression.');
      setStatus('error');
      setStatusText('');
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="lg:col-span-7 flex-1 border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors rounded-2xl min-h-[320px] bg-surface-container-low flex flex-col relative overflow-hidden">
        <div className="absolute top-4 left-4 z-20 hidden sm:flex gap-2">
           <button onClick={onBack} className="p-2 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg shadow-sm border border-outline-variant transition-colors flex items-center justify-center">
             <ArrowLeft size={20} />
           </button>
        </div>

        {status === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low relative">
            <RefreshCw className="animate-spin text-primary mb-4" size={48} />
            <h3 className="text-xl font-bold text-on-surface mb-2">{t('tool.compress.compressing', 'Compressing PDF...')}</h3>
            <p className="text-on-surface-variant text-sm text-center mb-4 max-w-sm h-10">{statusText}</p>
            <div className="w-64 h-3 bg-surface-container-high rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-on-surface-variant text-sm font-medium">{progress}% {t('tool.compress.complete', 'Complete')}</p>
          </div>
        ) : status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-surface-container-low">
             <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
               <Check size={32} />
             </div>
             <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2 text-center">{t('tool.compress.complete', 'Compression Complete!')}</h3>
             <p className="text-green-500 font-bold mb-6 text-center max-w-sm">
               {savings}
             </p>
             
             <div className="flex flex-col gap-2 sm:gap-3 mt-4 w-full max-w-sm">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                  <a 
                    href={downloadUrl}
                    download={`compressed_${file?.name || 'document.pdf'}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-sm font-bold shadow-md transition-colors flex-1 sm:flex-none min-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <Download size={16} />
                    {t('workspace.btn.save_download', 'Download PDF')}
                  </a>
                </div>
                
                <div className="pt-3 mt-1 sm:pt-4 sm:mt-2 border-t border-outline-variant/30 flex justify-center w-full">
                  <button
                    onClick={() => { setFile(null); setStatus('idle'); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/30 text-on-surface rounded-lg text-sm font-medium transition-colors w-full shadow-sm"
                  >
                    <RotateCcw size={16} />
                    {t('tool.compress.another', 'Compress another file')}
                  </button>
                </div>
             </div>
          </div>
        ) : status === 'error' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low">
             <div className="w-20 h-20 bg-error/20 text-error rounded-full flex items-center justify-center mb-6 border border-error/30">
               <AlertCircle size={40} />
             </div>
             <h3 className="text-2xl font-bold text-on-surface mb-2">{t('tool.compress.failed', 'Compression Failed')}</h3>
             <p className="text-error mb-6 text-center max-w-md font-mono text-sm break-words bg-error/10 p-3 rounded-lg border border-error/20">
               {errorMessage}
             </p>
             <button 
               onClick={() => { setStatus('idle'); setErrorMessage(''); }}
               className="px-6 py-3 bg-surface-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-colors"
             >
               {t('tool.compress.try_again', 'Try Again')}
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
          <>
            <style>{`
              @keyframes mobile-glow-yellow {
                0%, 100% { box-shadow: 0 0 2px rgba(234, 179, 8, 0.1); border-color: rgba(234, 179, 8, 0.2); }
                50% { box-shadow: 0 0 10px rgba(234, 179, 8, 0.4); border-color: rgba(234, 179, 8, 0.5); }
              }
              .mobile-glow {
                animation: mobile-glow-yellow 3s infinite ease-in-out;
              }
              @media (min-width: 768px) {
                .mobile-glow {
                  animation: none;
                }
              }
            `}</style>
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
              <div
                onClick={() => document.getElementById('compress-upload')?.click()}
                className="flex border-2 border-dashed rounded-xl p-3 md:p-10 w-full flex-col items-center justify-center cursor-pointer transition-all mobile-glow border-primary-container bg-surface-container"
              >
                <input
                  id="compress-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {/* Mobile View: Horizontal Banner */}
                <div className="flex md:hidden items-center justify-between w-full px-1">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-container/10 p-2.5 rounded-lg shrink-0">
                      <Upload size={24} className="text-primary-container" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-on-surface leading-tight mb-0.5">
                        {t('workspace.drop.title_mobile', 'Select file from device')}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        {t('workspace.drop.support_pdf', 'Supports PDF up to 100MB')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); document.getElementById('compress-upload')?.click(); }}
                    className="ml-2 shrink-0 px-4 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-[10px]"
                  >
                    {t('workspace.drop.browse', 'Browse')}
                  </button>
                </div>

                {/* Desktop View: Vertical Stack */}
                <div className="hidden md:flex flex-col items-center justify-center text-center">
                  <Upload size={48} className="text-primary-container mb-4" />
                  <p className="text-lg font-bold text-on-surface mb-2">{t('tool.compress.select', 'Select PDF file')}</p>
                  <p className="text-sm text-on-surface-variant mb-6">
                    {t('tool.compress.drop', 'Drop your PDF here or click to browse. Max file size: 50MB.')}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); document.getElementById('compress-upload')?.click(); }}
                    className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-xs"
                  >
                    {t('workspace.drop.browse', 'Browse files')}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="lg:col-span-5 w-full lg:w-80 h-fit bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-sm sticky top-24">
         <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
            <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
              <RefreshCw size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}</h2>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm tracking-widest border border-blue-400/30">
                  BETA
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">{t('tool.compress_pdf.beta_warning', 'Not stable for production')}</p>
            </div>
         </div>
         
         <div className="p-5 flex-1 overflow-y-auto">
            <div className="mb-6">
              <label className="block text-sm font-bold text-on-surface mb-3">{t('tool.compress_pdf.level', 'Compression Level')}</label>
              
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${quality === 'low' ? 'bg-primary-container/20 border-primary' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}>
                  <input type="radio" name="quality" checked={quality === 'low'} onChange={() => setQuality('low')} className="mt-1" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">{t('tool.compress_pdf.max', 'Maximum Compression')}</div>
                    <div className="text-xs text-on-surface-variant">{t('tool.compress_pdf.max_desc', 'Smallest file size, lower visual quality.')}</div>
                  </div>
                </label>
                
                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${quality === 'medium' ? 'bg-primary-container/20 border-primary' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}>
                  <input type="radio" name="quality" checked={quality === 'medium'} onChange={() => setQuality('medium')} className="mt-1" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">{t('tool.compress_pdf.balanced', 'Balanced (Recommended)')}</div>
                    <div className="text-xs text-on-surface-variant">{t('tool.compress_pdf.balanced_desc', 'Good compression and good quality.')}</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${quality === 'high' ? 'bg-primary-container/20 border-primary' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}>
                  <input type="radio" name="quality" checked={quality === 'high'} onChange={() => setQuality('high')} className="mt-1" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">{t('tool.compress_pdf.low', 'Low Compression')}</div>
                    <div className="text-xs text-on-surface-variant">{t('tool.compress_pdf.low_desc', 'Preserves high quality, larger file size.')}</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex gap-3 text-blue-400 text-sm mt-6">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{t('tool.compress_pdf.warning', 'This tool flattens the PDF into images. Text will no longer be selectable.')}</p>
            </div>
         </div>
         
         <div className={(file && status !== 'processing' && status !== 'success' && status !== 'error') ? "fixed bottom-0 left-0 right-0 p-4 bg-surface-container border-t border-outline-variant/30 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] pb-safe lg:relative lg:p-5 lg:bg-surface-container-low lg:border-t lg:border-outline-variant/30 lg:z-auto lg:shadow-none" : "p-5 border-t border-outline-variant/30 bg-surface-container-low"}>
            <button 
              onClick={handleCompress}
              disabled={!file || status === 'processing'}
              className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-3.5 px-4 rounded-lg shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? <RefreshCw className="animate-spin" size={32} /> : <TacoIcon name={tool.icon} size={32} />}
              {status === 'processing' ? t('tool.compress_pdf.btn_processing', 'Compressing...') : t('tool.compress_pdf.btn_compress', 'Compress PDF')}
            </button>
         </div>
         {(file && status !== 'processing' && status !== 'success' && status !== 'error') && (
           <div className="h-24 w-full lg:hidden" />
         )}
      </div>
    </div>
  );
}
