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
  const [languages, setLanguages] = useState<string[]>(['eng']);
  const [searchLang, setSearchLang] = useState('');
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

  const sanitizeExtractedText = (text: string) => {
    let sanitized = text;
    // Normalize comparison symbols
    sanitized = sanitized.replace(/«/g, '<').replace(/»/g, '>');
    sanitized = sanitized.replace(/["“”](\d)/g, '> $1');
    
    // Normalize dashes globally
    sanitized = sanitized.replace(/[—–]/g, '-');
    
    // Fix wild spaces around hyphens and slashes
    sanitized = sanitized.replace(/\s+-\s+/g, '-').replace(/\s+-\b/g, '-').replace(/\b-\s+/g, '-');
    sanitized = sanitized.replace(/\s+\/\s+/g, '/').replace(/\s+\/\b/g, '/').replace(/\b\/\s+/g, '/');
    
    // Universal Typography & Number Formatting Repair
    // Connect digits separated by spaces around commas or dots (prevent newline merging)
    sanitized = sanitized.replace(/(\d+)[^\S\r\n]*([.,])[^\S\r\n]*(\d+)/g, '$1$2$3');
    // Connect large multi-digit numbers split by wide kerning (e.g. 38 3 -> 383)
    sanitized = sanitized.replace(/(^|\s)(\d{1,3})[^\S\r\n]+(\d{1,3})(\s|$)/g, '$1$2$3$4');
    // Fix percentage symbols separated by spaces
    sanitized = sanitized.replace(/(\d+)[^\S\r\n]+([%％])/g, '$1%');
    // Standardize ranges (hyphens/tildes between numbers)
    sanitized = sanitized.replace(/(\d)[^\S\r\n]*[-~—–][^\S\r\n]*(\d)/g, '$1 - $2');
    // Normalize IP = 400 to IP >= 400
    sanitized = sanitized.replace(/(\bIP\b)[^\S\r\n]*=[^\S\r\n]*(\d+)/gi, '$1 ≥ $2');
    // Fix end of line quote to exclamation mark
    sanitized = sanitized.replace(/(\w+)'$/gm, '$1!');
    
    // Technical Text, URLs, and Versioning Repair (Developer Mode)
    // Connect broken URLs
    sanitized = sanitized.replace(/(https?:\/\/)[^\S\r\n]+/gi, '$1');
    // Connect broken file paths / API endpoints
    sanitized = sanitized.replace(/(\w+)[^\S\r\n]*\/[^\S\r\n]*(\w+)/g, '$1/$2');
    // Clean up spaces in HTTP status codes [ 200 ]
    sanitized = sanitized.replace(/\[[^\S\r\n]*(\d{3})[^\S\r\n]*\]/g, '[$1]');
    // Clean up spaces in brackets and braces
    sanitized = sanitized.replace(/\[[^\S\r\n]+/g, '[').replace(/[^\S\r\n]+\]/g, ']');
    sanitized = sanitized.replace(/\{[^\S\r\n]+/g, '{').replace(/[^\S\r\n]+\}/g, '}');
    // Clean up version numbers (v 1 beta -> v1 beta)
    sanitized = sanitized.replace(/\b([vV])[^\S\r\n]+(\d+)\b/g, '$1$2');
    
    // Auto-space glued numbers and letters (bounding box collisions)
    sanitized = sanitized.replace(/([0-9])([a-zA-Z])/g, '$1 $2');
    sanitized = sanitized.replace(/([a-zA-Z])([0-9])/g, '$1 $2');
    
    // Algorithmic Noise & Border Filter (Heuristic Denoising)
    const lines = sanitized.split('\n');
    const cleanLines = lines.filter(line => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      
      // Filter lines with a single character repeating >= 4 times (e.g. "aaaa", "----")
      if (/(.)\1{3,}/.test(trimmed)) return false;
      
      // Filter lines where unique character ratio is < 30% ONLY for short lines (prevents deleting long paragraphs)
      const uniqueChars = new Set(trimmed.replace(/\s/g, '').split(''));
      const nonSpaceLength = trimmed.replace(/\s/g, '').length;
      if (nonSpaceLength > 0 && nonSpaceLength < 20 && (uniqueChars.size / nonSpaceLength) < 0.3) {
         return false;
      }
      
      // Filter lone icon / artefact removal (length <= 2, weird symbols)
      if (trimmed.length <= 2 && !/[a-zA-Z0-9]/.test(trimmed)) {
         return false;
      }
      
      return true;
    });
    
    // Universal Icon Glyph Stripper
    const strippedLines = cleanLines.map(line => {
      let trimmed = line.trim();
      // Remove weird artifact symbols at the start of lines before the first valid alphanumeric word.
      // Require at least one space after the isolated symbol to prevent chopping words like "Kalkulator"
      return trimmed.replace(/^(?:[^\w\s\d<>\(]+|Ll|lL|Vv|KX|\/\\|\||K|3%)+[^\S\r\n]+(?=[a-zA-Z0-9])/i, '').trim();
    });
    
    return strippedLines.join('\n');
  };

  const handleOCR = async () => {
    if (!file) return;
    setStatus('processing');
    setProgress(5);
    
    try {
      let fullText = '';
      let ocrWorker: Tesseract.Worker | null = null;
      const langStr = languages.join('+') || 'eng';
      
      const getWorker = async (isImage: boolean = false) => {
        if (!ocrWorker) {
          ocrWorker = await Tesseract.createWorker(langStr, 1, {
            workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@7/dist/worker.min.js',
            corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@7',
            logger: m => {
              if (m.status === 'recognizing text') {
                 setProgress(Math.round(m.progress * 100));
              }
            }
          });
          
          if (isImage) {
            await ocrWorker.setParameters({
              tessedit_pageseg_mode: Tesseract.PSM.AUTO,
              tessedit_char_whitelist: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,:;-_+=/\\|<>≤≥()[]{}%$€£¥#@&*~\'"` ',
            });
          } else {
            await ocrWorker.setParameters({
              tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
            });
          }
        }
        return ocrWorker;
      };

      if (file.type.startsWith('image/')) {
        setStatusMsg('Loading image...');
        const imageUrl = URL.createObjectURL(file);
        
        const img = new Image();
        img.src = imageUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        const canvas = document.createElement('canvas');
        
        // 1. Universal Image Pre-Processing: DPI Upscaling (max 2048px)
        let targetWidth = img.width;
        let targetHeight = img.height;
        const maxDim = Math.max(img.width, img.height);
        
        if (maxDim < 2048) {
           const scaleFactor = Math.min(3.0, 2500 / maxDim);
           targetWidth = Math.round(img.width * scaleFactor);
           targetHeight = Math.round(img.height * scaleFactor);
        }
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Use high quality image smoothing for upscale (Lanczos/Bicubic equivalent)
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          setStatusMsg('Pre-processing image...');
          
          const imageDataCtx = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageDataCtx.data;
          
          // Adaptive Contrast Stretching (Min-Max Normalization) & Dark Mode Inversion
          let minLuminance = 255;
          let maxLuminance = 0;
          let sumLuminance = 0;
          
          const luminanceArray = new Uint8Array(canvas.width * canvas.height);
          for (let j = 0, p = 0; j < data.length; j += 4, p++) {
            const luma = Math.round(0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2]);
            luminanceArray[p] = luma;
            sumLuminance += luma;
            if (luma < minLuminance) minLuminance = luma;
            if (luma > maxLuminance) maxLuminance = luma;
          }
          
          // Auto-detect Dark Mode (Average luminance < 120 means dark background)
          const avgLuminance = sumLuminance / (canvas.width * canvas.height);
          const isDarkMode = avgLuminance < 120;
          
          const luminanceRange = (maxLuminance - minLuminance) || 1;
          
          for (let j = 0, p = 0; j < data.length; j += 4, p++) {
            const originalLuma = luminanceArray[p];
            let stretched = Math.round(((originalLuma - minLuminance) / luminanceRange) * 255);
            
            // If dark mode, invert the pixels so Tesseract reads black text on white background
            if (isDarkMode) {
               stretched = 255 - stretched;
            }
            
            data[j] = stretched;
            data[j + 1] = stretched;
            data[j + 2] = stretched;
          }
          
          ctx.putImageData(imageDataCtx, 0, 0);
          
          setStatusMsg('Running OCR on image...');
          const worker = await getWorker(true);
          const imageData = canvas.toDataURL('image/png');
          const { data: resultData } = await worker.recognize(imageData);
          
          // 2. Column-Aware Spatial Layout & Reading Order
          if (resultData.blocks && resultData.blocks.length > 0) {
            let reconstructedText = '';
            
            // Tesseract blocks automatically separate columns and distinct paragraphs
            resultData.blocks.forEach((block: any) => {
              block.paragraphs.forEach((paragraph: any) => {
                paragraph.lines.forEach((line: any) => {
                  let lineStr = '';
                  let lastX1 = -1;
                  let avgCharWidth = 10;
                  let lineHeight = 10;
                  
                  if (line.words.length > 0) {
                     const firstWord = line.words[0];
                     lineHeight = firstWord.bbox.y1 - firstWord.bbox.y0;
                     avgCharWidth = lineHeight * 0.5;
                  }
                  
                  line.words.forEach((word: any) => {
                    // Confidence & Aspect Ratio Filter (Universal Glyph/Icon Stripper)
                    if (word.confidence < 40 && word.text.length <= 2 && !/[a-zA-Z0-9]/.test(word.text)) {
                       return; // Skip this garbage token
                    }
                    
                    const gap = word.bbox.x0 - lastX1;
                    
                    // Column separation inside a block (though blocks usually split columns anyway)
                    // If gap is greater than 2.5x line height, add a double tab for strong separation
                    if (lastX1 !== -1 && gap > (lineHeight * 2.5)) {
                       lineStr += ' \t\t ';
                    } else if (lastX1 !== -1) {
                       lineStr += ' '; // Always guarantee at least one space between tokens
                    }
                    
                    lineStr += word.text;
                    lastX1 = word.bbox.x1;
                  });
                  if (lineStr.trim()) {
                    reconstructedText += lineStr.trim() + '\n';
                  }
                });
                reconstructedText += '\n'; // Separate paragraphs
              });
              reconstructedText += '\n'; // Separate blocks (columns)
            });
            
            // Clean up excess newlines
            reconstructedText = reconstructedText.replace(/\n{3,}/g, '\n\n');
            fullText = `--- Image ---\n\n` + reconstructedText;
          } else {
            // Fallback
            fullText = `--- Image ---\n\n` + resultData.text;
          }
        }
        URL.revokeObjectURL(imageUrl);
        
      } else {
        // PDF Processing Pipeline
        setStatusMsg('Initializing PDF Engine...');
        const pdfjs = getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        
        const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;
        
        for (let i = 1; i <= numPages; i++) {
          setStatusMsg(`Processing page ${i} of ${numPages}...`);
          const page = await pdfDoc.getPage(i);
          
          // 1. Direct Text Layer Extraction
          const textContent = await page.getTextContent();
          const textItems = textContent.items.filter((item: any) => item.str.trim().length > 0);
          
          const totalChars = textItems.reduce((acc: number, item: any) => acc + item.str.length, 0);
          
          if (totalChars > 20) {
            // It's a digital PDF, reconstruct spatial layout
            setStatusMsg(`Extracting digital text from page ${i}...`);
            
            const linesMap: { [y: number]: any[] } = {};
            textItems.forEach((item: any) => {
              const y = item.transform[5];
              const existingY = Object.keys(linesMap).find(key => Math.abs(parseFloat(key) - y) < 3);
              if (existingY) {
                linesMap[parseFloat(existingY)].push(item);
              } else {
                linesMap[y] = [item];
              }
            });
            
            const sortedY = Object.keys(linesMap).map(Number).sort((a, b) => b - a);
            let pageText = '';
            
            sortedY.forEach(y => {
              const lineItems = linesMap[y].sort((a: any, b: any) => a.transform[4] - b.transform[4]);
              let lineStr = '';
              let lastX = -1;
              let lastWidth = 0;
              
              lineItems.forEach((item: any) => {
                const x = item.transform[4];
                if (lastX !== -1 && (x - (lastX + lastWidth)) > 5) {
                   lineStr += ' ';
                }
                lineStr += item.str;
                lastX = x;
                lastWidth = item.width || 0;
              });
              pageText += lineStr.trim() + '\n';
            });
            
            fullText += `\n--- Page ${i} ---\n` + pageText + '\n';
            setProgress(Math.round((i / numPages) * 100));
            
          } else {
            // 2. Fallback OCR (High-Precision OCR Pipeline)
            setStatusMsg(`Running OCR on scanned page ${i}...`);
            const worker = await getWorker();
            
            // Re-bind logger so progress scales by page
            worker.setLogger(m => {
              if (m.status === 'recognizing text') {
                const baseProgress = ((i - 1) / numPages) * 100;
                const pageProgress = m.progress * (100 / numPages);
                setProgress(Math.round(baseProgress + pageProgress));
              }
            });
            
            const viewport = page.getViewport({ scale: 3.0 });
            
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              await page.render({ canvasContext: ctx, viewport }).promise;
              
              // Pre-processing
              const imageDataCtx = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageDataCtx.data;
              for (let j = 0; j < data.length; j += 4) {
                const gray = 0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
                const color = gray < 160 ? 0 : 255;
                data[j] = color;
                data[j + 1] = color;
                data[j + 2] = color;
              }
              ctx.putImageData(imageDataCtx, 0, 0);
              
              const imageData = canvas.toDataURL('image/png');
              const { data: { text } } = await worker.recognize(imageData);
              fullText += `\n--- Page ${i} ---\n` + text + '\n';
            }
          }
        }
      }
      
      if (ocrWorker) {
        await ocrWorker.terminate();
      }
      
      const sanitizedText = sanitizeExtractedText(fullText.trim());
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
         
         <div className="p-5 flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 flex flex-col min-h-0">
              <label className="block text-sm font-bold text-on-surface mb-3 shrink-0">Document Language(s)</label>
              
              <input
                type="text"
                placeholder="Search for languages..."
                value={searchLang}
                onChange={e => setSearchLang(e.target.value)}
                className="w-full p-3 rounded-t-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary transition-colors font-medium text-sm mb-0 shrink-0"
              />
              
              <div className="flex-1 overflow-y-auto border border-t-0 border-outline-variant rounded-b-xl bg-surface-container-lowest p-2 max-h-[300px] min-h-[150px]">
                {Object.entries(TESSERACT_LANGUAGES)
                  .filter(([code, name]) => name.toLowerCase().includes(searchLang.toLowerCase()))
                  .map(([code, name]) => (
                  <label key={code} className="flex items-center gap-3 p-2 hover:bg-surface-container rounded-lg cursor-pointer transition-colors group">
                    <input 
                      type="checkbox" 
                      value={code}
                      checked={languages.includes(code)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLanguages(prev => [...prev, code]);
                        } else {
                          // Ensure at least one language is selected
                          if (languages.length > 1) {
                             setLanguages(prev => prev.filter(l => l !== code));
                          }
                        }
                      }}
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container cursor-pointer"
                    />
                    <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">{name}</span>
                  </label>
                ))}
              </div>
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
