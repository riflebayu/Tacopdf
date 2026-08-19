"use client";
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, FileDown, RefreshCw, AlertCircle, ScanText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import Tesseract from 'tesseract.js';
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

export default function OCRWorkspace({ tool, onBack }: any) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('eng');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [extractedText, setExtractedText] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setExtractedText('');
    }
  };

  const handleOCR = async () => {
    if (!file) return;
    setStatus('processing');
    setProgress(5);
    setStatusMsg('Initializing OCR Engine...');
    
    try {
      const pdfjs = getPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;
      
      let fullText = '';
      
      const worker = await Tesseract.createWorker({
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      await worker.loadLanguage(language);
      await worker.initialize(language);

      for (let i = 1; i <= numPages; i++) {
        setStatusMsg(`Processing page ${i} of ${numPages}...`);
        
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          
          const imageData = canvas.toDataURL('image/png');
          
          const { data: { text } } = await worker.recognize(imageData);
          fullText += `\n--- Page ${i} ---\n` + text + '\n';
          
          canvas.width = 0;
          canvas.height = 0;
        }
      }
      
      await worker.terminate();
      
      setExtractedText(fullText.trim());
      setStatus('success');
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      setStatusMsg('An error occurred during text extraction.');
    }
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OCR_${file?.name || 'document'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            <h3 className="text-xl font-bold text-on-surface mb-2">Extracting Text...</h3>
            <p className="text-on-surface-variant text-sm font-medium mb-4">{statusMsg}</p>
            <div className="w-64 h-3 bg-surface-container-high rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-on-surface-variant text-sm font-medium">{progress}%</p>
          </div>
        ) : status === 'success' ? (
          <div className="flex-1 flex flex-col p-4 sm:p-8 bg-surface-container-low">
             <h3 className="text-xl font-bold text-on-surface mb-4">Extracted Text</h3>
             <textarea 
               className="flex-1 w-full p-4 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:border-primary transition-colors resize-none mb-4 font-mono text-sm shadow-inner text-on-surface"
               value={extractedText}
               readOnly
             />
             <div className="flex gap-4">
               <button
                 onClick={downloadText}
                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-on-primary font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all"
               >
                 <FileDown size={20} /> Download as TXT
               </button>
               <button 
                 onClick={() => { setFile(null); setStatus('idle'); }}
                 className="flex items-center justify-center gap-2 px-6 py-4 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-variant transition-colors"
               >
                 <RefreshCw size={20} /> Restart
               </button>
             </div>
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
              <h3 className="text-2xl font-black text-on-surface mb-2 text-center group-hover:text-primary transition-colors">Select PDF or Image</h3>
              <p className="text-on-surface-variant text-center max-w-sm">
                Drop your Scanned PDF here to extract text.
              </p>
              <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        )}
      </div>

      <div className="lg:col-span-5 w-full lg:w-80 h-fit bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-sm sticky top-24">
         <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
            <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
              <ScanText size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">{tool.name}</h2>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5 text-blue-400">Beta Version</p>
            </div>
         </div>
         
         <div className="p-5 flex-1 overflow-y-auto">
            <div className="mb-6">
              <label className="block text-sm font-bold text-on-surface mb-3">Document Language</label>
              <select 
                value={language} 
                onChange={e => setLanguage(e.target.value)}
                className="w-full p-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none font-medium"
              >
                <option value="eng">English</option>
                <option value="ind">Indonesian</option>
                <option value="spa">Spanish</option>
                <option value="fra">French</option>
                <option value="deu">German</option>
              </select>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex gap-3 text-amber-500 text-sm mt-6">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>For best results, ensure your document has a clear background and high contrast.</p>
            </div>
         </div>
         
         <div className="p-5 border-t border-outline-variant/30 bg-surface-container-low">
            <button 
              onClick={handleOCR}
              disabled={!file || status === 'processing'}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 bg-primary text-on-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? <RefreshCw className="animate-spin" size={20} /> : <ScanText size={20} />}
              {status === 'processing' ? 'Extracting...' : 'Extract Text'}
            </button>
         </div>
      </div>
    </div>
  );
}
