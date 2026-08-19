"use client";
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { useLanguage } from '../../context/LanguageContext';

const getPdfJs = (() => {
  let initialized = false;
  return () => {
    if (!initialized) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
      initialized = true;
    }
    return pdfjsLib;
  };
})();

export default function CompressWorkspace({ tool, onBack }: any) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [savings, setSavings] = useState<string>('');

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
    
    try {
      const pdfjs = getPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;
      
      const newPdfDoc = await PDFDocument.create();
      
      let scale = 1.5;
      let jpegQuality = 0.65;
      if (quality === 'low') { scale = 1.0; jpegQuality = 0.35; }
      if (quality === 'high') { scale = 2.0; jpegQuality = 0.85; }

      for (let i = 1; i <= numPages; i++) {
        setProgress(10 + Math.round((i / numPages) * 70));
        
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          
          const jpegDataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
          const jpegBytes = await fetch(jpegDataUrl).then(res => res.arrayBuffer());
          const jpegImage = await newPdfDoc.embedJpg(jpegBytes);
          
          const newPage = newPdfDoc.addPage([viewport.width, viewport.height]);
          newPage.drawImage(jpegImage, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
          });
          
          canvas.width = 0;
          canvas.height = 0;
        }
        
        await new Promise(r => setTimeout(r, 25)); // Yield to prevent crash
      }
      
      setProgress(90);
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setStatus('success');
      
      const originalSize = file.size;
      const newSize = blob.size;
      if (newSize < originalSize) {
        const percent = Math.round((1 - (newSize / originalSize)) * 100);
        setSavings(`Reduced by ${percent}% (${(newSize / 1024 / 1024).toFixed(2)} MB)`);
      } else {
        setSavings(`No significant reduction (Output: ${(newSize / 1024 / 1024).toFixed(2)} MB)`);
      }
      
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="lg:col-span-7 flex-1 border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors rounded-2xl min-h-[320px] bg-surface-container-low flex flex-col relative overflow-hidden">
        <div className="absolute top-4 left-4 z-20 flex gap-2">
           <button onClick={onBack} className="p-2 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg shadow-sm border border-outline-variant transition-colors flex items-center justify-center">
             <ArrowLeft size={20} />
           </button>
        </div>

        {status === 'processing' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low relative">
            <RefreshCw className="animate-spin text-primary mb-4" size={48} />
            <h3 className="text-xl font-bold text-on-surface mb-2">Compressing PDF...</h3>
            <div className="w-64 h-3 bg-surface-container-high rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-on-surface-variant text-sm font-medium">{progress}% Complete</p>
          </div>
        ) : status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low">
             <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
               <Download size={40} />
             </div>
             <h3 className="text-2xl font-bold text-on-surface mb-2">Compression Complete!</h3>
             <p className="text-on-surface-variant mb-6 text-center max-w-sm">
               {savings}
             </p>
             <a
               href={downloadUrl}
               download={`compressed_${file?.name || 'document.pdf'}`}
               className="flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full max-w-xs justify-center"
             >
               <Download size={24} /> Download PDF
             </a>
             <button 
               onClick={() => { setFile(null); setStatus('idle'); }}
               className="mt-6 text-primary font-semibold hover:underline"
             >
               Compress another file
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
               Remove file
             </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
              <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md">
                <Upload size={36} />
              </div>
              <h3 className="text-2xl font-black text-on-surface mb-2 text-center group-hover:text-primary transition-colors">Select PDF file</h3>
              <p className="text-on-surface-variant text-center max-w-sm">
                Drop your PDF here or click to browse. Max file size: 50MB.
              </p>
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        )}
      </div>

      <div className="lg:col-span-5 w-full lg:w-80 h-fit bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-sm sticky top-24">
         <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
            <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
              <RefreshCw size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">{tool.name}</h2>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5 text-blue-400">Beta Version</p>
            </div>
         </div>
         
         <div className="p-5 flex-1 overflow-y-auto">
            <div className="mb-6">
              <label className="block text-sm font-bold text-on-surface mb-3">Compression Level</label>
              
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${quality === 'low' ? 'bg-primary-container/20 border-primary' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}>
                  <input type="radio" name="quality" checked={quality === 'low'} onChange={() => setQuality('low')} className="mt-1" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">Maximum Compression</div>
                    <div className="text-xs text-on-surface-variant">Smallest file size, lower visual quality.</div>
                  </div>
                </label>
                
                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${quality === 'medium' ? 'bg-primary-container/20 border-primary' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}>
                  <input type="radio" name="quality" checked={quality === 'medium'} onChange={() => setQuality('medium')} className="mt-1" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">Balanced (Recommended)</div>
                    <div className="text-xs text-on-surface-variant">Good compression and good quality.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${quality === 'high' ? 'bg-primary-container/20 border-primary' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}>
                  <input type="radio" name="quality" checked={quality === 'high'} onChange={() => setQuality('high')} className="mt-1" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">Low Compression</div>
                    <div className="text-xs text-on-surface-variant">Preserves high quality, larger file size.</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex gap-3 text-blue-400 text-sm mt-6">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>This tool flattens the PDF into images. Text will no longer be selectable.</p>
            </div>
         </div>
         
         <div className="p-5 border-t border-outline-variant/30 bg-surface-container-low">
            <button 
              onClick={handleCompress}
              disabled={!file || status === 'processing'}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 bg-primary text-on-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
              {status === 'processing' ? 'Compressing...' : 'Compress PDF'}
            </button>
         </div>
      </div>
    </div>
  );
}
