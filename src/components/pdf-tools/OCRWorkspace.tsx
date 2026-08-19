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

const TESSERACT_LANGUAGES: Record<string, string> = {
  eng: 'English',
  afr: 'Afrikaans',
  amh: 'Amharic',
  ara: 'Arabic',
  asm: 'Assamese',
  aze: 'Azerbaijani',
  aze_cyrl: 'Azerbaijani - Cyrillic',
  bel: 'Belarusian',
  ben: 'Bengali',
  bod: 'Tibetan',
  bos: 'Bosnian',
  bul: 'Bulgarian',
  cat: 'Catalan; Valencian',
  ceb: 'Cebuano',
  ces: 'Czech',
  chi_sim: 'Chinese - Simplified',
  chi_tra: 'Chinese - Traditional',
  chr: 'Cherokee',
  cym: 'Welsh',
  dan: 'Danish',
  deu: 'German',
  dzo: 'Dzongkha',
  ell: 'Greek, Modern',
  enm: 'English, Middle',
  epo: 'Esperanto',
  est: 'Estonian',
  eus: 'Basque',
  fas: 'Persian',
  fin: 'Finnish',
  fra: 'French',
  frk: 'German Fraktur',
  frm: 'French, Middle',
  gle: 'Irish',
  glg: 'Galician',
  grc: 'Greek, Ancient',
  guj: 'Gujarati',
  hat: 'Haitian; Haitian Creole',
  heb: 'Hebrew',
  hin: 'Hindi',
  hrv: 'Croatian',
  hun: 'Hungarian',
  iku: 'Inuktitut',
  ind: 'Indonesian',
  isl: 'Icelandic',
  ita: 'Italian',
  ita_old: 'Italian - Old',
  jav: 'Javanese',
  jpn: 'Japanese',
  kan: 'Kannada',
  kat: 'Georgian',
  kat_old: 'Georgian - Old',
  kaz: 'Kazakh',
  khm: 'Central Khmer',
  kir: 'Kirghiz; Kyrgyz',
  kor: 'Korean',
  kur: 'Kurdish',
  lao: 'Lao',
  lat: 'Latin',
  lav: 'Latvian',
  lit: 'Lithuanian',
  mal: 'Malayalam',
  mar: 'Marathi',
  mkd: 'Macedonian',
  mlt: 'Maltese',
  msa: 'Malay',
  mya: 'Burmese',
  nep: 'Nepali',
  nld: 'Dutch; Flemish',
  nor: 'Norwegian',
  ori: 'Oriya',
  pan: 'Panjabi; Punjabi',
  pol: 'Polish',
  por: 'Portuguese',
  pus: 'Pushto; Pashto',
  ron: 'Romanian',
  rus: 'Russian',
  san: 'Sanskrit',
  sin: 'Sinhala; Sinhalese',
  slk: 'Slovak',
  slv: 'Slovenian',
  spa: 'Spanish; Castilian',
  spa_old: 'Spanish; Castilian - Old',
  sqi: 'Albanian',
  srp: 'Serbian',
  srp_latn: 'Serbian - Latin',
  swa: 'Swahili',
  swe: 'Swedish',
  syr: 'Syriac',
  tam: 'Tamil',
  tel: 'Telugu',
  tgk: 'Tajik',
  tgl: 'Tagalog',
  tha: 'Thai',
  tir: 'Tigrinya',
  tur: 'Turkish',
  uig: 'Uighur; Uyghur',
  ukr: 'Ukrainian',
  urd: 'Urdu',
  uzb: 'Uzbek',
  uzb_cyrl: 'Uzbek - Cyrillic',
  vie: 'Vietnamese',
  yid: 'Yiddish',
};

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
      
      // Specify JSDelivr paths explicitly to avoid Unpkg which is blocked by our CSP
      const worker = await Tesseract.createWorker(language, 1, {
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@7/dist/worker.min.js',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@7',
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      // Set PSM to 6 (Assume a single uniform block of text) which is excellent for preserving tables
      await worker.setParameters({
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      });

      for (let i = 1; i <= numPages; i++) {
        setStatusMsg(`Processing page ${i} of ${numPages}...`);
        
        const page = await pdfDoc.getPage(i);
        // Increase scale to 2.5 for higher DPI to prevent commas/dots from disappearing
        const viewport = page.getViewport({ scale: 2.5 });
        
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          
          // Pre-processing: Grayscale and Contrast Enhancement (Binarization)
          const imageDataCtx = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageDataCtx.data;
          for (let j = 0; j < data.length; j += 4) {
            // Convert to grayscale using luminance formula
            const gray = 0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
            // Simple thresholding / high contrast (Threshold at 150)
            const color = gray < 150 ? 0 : 255;
            data[j] = color;     // Red
            data[j + 1] = color; // Green
            data[j + 2] = color; // Blue
            // Alpha remains unchanged (data[j + 3])
          }
          ctx.putImageData(imageDataCtx, 0, 0);
          
          const imageData = canvas.toDataURL('image/png');
          
          const { data: { text } } = await worker.recognize(imageData);
          fullText += `\n--- Page ${i} ---\n` + text + '\n';
          
          canvas.width = 0;
          canvas.height = 0;
        }
      }
      
      await worker.terminate();
      
      // Post-processing sanitization
      let sanitizedText = fullText.trim();
      // Replace false guillemets with angle brackets
      sanitizedText = sanitizedText.replace(/«/g, '<').replace(/»/g, '>');
      // Fix wild spaces around hyphens and slashes
      sanitizedText = sanitizedText.replace(/\s+-\s+/g, '-').replace(/\s+-\b/g, '-').replace(/\b-\s+/g, '-');
      sanitizedText = sanitizedText.replace(/\s+\/\s+/g, '/').replace(/\s+\/\b/g, '/').replace(/\b\/\s+/g, '/');
      // Attempt to fix missing decimals in small ranges like "10-12" to "1.0-1.2" if applicable
      // But a general regex for that might break other numbers, so we rely on the high-res canvas fix.
      
      setExtractedText(sanitizedText);
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
          <div className="flex-1 flex flex-col p-4 sm:p-8 pt-16 sm:pt-16 bg-surface-container-low">
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
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{tool.name}</h2>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm tracking-widest border border-blue-400/30">
                  BETA
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">Not stable for production</p>
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
                {Object.entries(TESSERACT_LANGUAGES).map(([code, name]) => (
                  <option key={code} value={code} className="bg-zinc-800 text-zinc-100">
                    {name}
                  </option>
                ))}
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
