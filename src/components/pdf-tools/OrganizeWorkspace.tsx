"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, FileText, Download, RefreshCw, Layers, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function OrganizeWorkspace({ tool, onBack }: any) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  
  // Array of page indices (0-indexed) representing current order
  const [pages, setPages] = useState<{ id: string, originalIndex: number, url: string }[]>([]);
  const [isGeneratingThumbs, setIsGeneratingThumbs] = useState(false);
  
  // Drag to scroll state
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // HTML5 Drag and Drop for Reordering
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setStatus('idle');
      setDownloadUrl('');
      
      // Generate thumbnails
      setIsGeneratingThumbs(true);
      try {
        const pdfjs = getPdfJs();
        const arrayBuffer = await selected.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;
        
        const newPages = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport }).promise;
            newPages.push({
              id: `page-${i}-${Math.random()}`,
              originalIndex: i - 1, // 0-indexed for pdf-lib
              url: canvas.toDataURL('image/jpeg', 0.8)
            });
            canvas.width = 0;
            canvas.height = 0;
          }
        }
        setPages(newPages);
      } catch (err) {
        console.error('Error generating thumbnails', err);
      }
      setIsGeneratingThumbs(false);
    }
  };

  const handleOrganize = async () => {
    if (!file || pages.length === 0) return;
    setStatus('processing');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const indicesToCopy = pages.map(p => p.originalIndex);
      const copiedPages = await newPdf.copyPages(originalPdf, indicesToCopy);
      
      copiedPages.forEach(page => {
        newPdf.addPage(page);
      });
      
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setStatus('success');
      
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const removePage = (index: number) => {
    setPages(prev => prev.filter((_, i) => i !== index));
  };
  
  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsScrolling(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => { setIsScrolling(false); };
  const handleMouseUp = () => { setIsScrolling(false); };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrolling || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Drag and Drop reordering handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to allow the drag image to generate before we hide it or add opacity
    setTimeout(() => {}, 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }
    setPages(prev => {
      const newPages = [...prev];
      const draggedPage = newPages[draggedIndex];
      newPages.splice(draggedIndex, 1);
      newPages.splice(dropIndex, 0, draggedPage);
      return newPages;
    });
    setDraggedIndex(null);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="lg:col-span-8 flex-1 border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors rounded-2xl min-h-[320px] bg-surface-container-low flex flex-col relative overflow-hidden">
        <div className="absolute top-4 left-4 z-20 flex gap-2">
           <button onClick={onBack} className="p-2 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg shadow-sm border border-outline-variant transition-colors flex items-center justify-center">
             <ArrowLeft size={20} />
           </button>
        </div>

        {status === 'processing' || isGeneratingThumbs ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low relative">
            <RefreshCw className="animate-spin text-primary mb-4" size={48} />
            <h3 className="text-xl font-bold text-on-surface mb-2">{isGeneratingThumbs ? 'Loading pages...' : 'Organizing PDF...'}</h3>
          </div>
        ) : status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low">
             <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
               <Download size={40} />
             </div>
             <h3 className="text-2xl font-bold text-on-surface mb-2">PDF Organized Successfully!</h3>
             <a
               href={downloadUrl}
               download={`organized_${file?.name || 'document.pdf'}`}
               className="mt-6 flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full max-w-xs justify-center"
             >
               <Download size={24} /> Download PDF
             </a>
             <button 
               onClick={() => { setFile(null); setStatus('idle'); setPages([]); }}
               className="mt-6 text-primary font-semibold hover:underline"
             >
               Organize another file
             </button>
          </div>
        ) : file ? (
          <div className="flex-1 flex flex-col p-6 pt-16">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-on-surface">{file.name}</h3>
               <button 
                 onClick={() => { setFile(null); setPages([]); }}
                 className="text-error font-medium text-sm hover:underline"
               >
                 Remove file
               </button>
            </div>
            
            {pages.length === 0 ? (
               <div className="text-center text-error mt-10 font-bold">All pages removed. Please upload again.</div>
            ) : (
               <div 
                 ref={scrollRef}
                 onMouseDown={handleMouseDown}
                 onMouseLeave={handleMouseLeave}
                 onMouseUp={handleMouseUp}
                 onMouseMove={handleMouseMove}
                 className="flex flex-row gap-6 overflow-x-auto pb-8 snap-x snap-mandatory pt-2 px-2 custom-scrollbar cursor-grab active:cursor-grabbing"
               >
                 {pages.map((page, index) => (
                   <div 
                     key={page.id} 
                     draggable
                     onDragStart={(e) => handleDragStart(e, index)}
                     onDragOver={(e) => handleDragOver(e, index)}
                     onDrop={(e) => handleDrop(e, index)}
                     onDragEnd={() => setDraggedIndex(null)}
                     className={`relative group bg-surface-container-high rounded-xl p-3 border border-outline-variant shadow-sm hover:border-primary/50 transition-colors shrink-0 w-48 sm:w-56 snap-center cursor-move ${draggedIndex === index ? 'opacity-50 border-primary border-dashed' : ''}`}
                   >
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-[12px] font-bold px-2 py-0.5 rounded shadow z-10 pointer-events-none">
                        {index + 1}
                      </div>
                      
                      <div className="absolute top-1 right-1 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => removePage(index)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md shadow-sm">
                           <Trash2 size={12} />
                         </button>
                      </div>

                      <img src={page.url} className="w-full h-auto object-contain bg-white mb-2 shadow-sm pointer-events-none select-none" />
                   </div>
                 ))}
               </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
              <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md">
                <Upload size={36} />
              </div>
              <h3 className="text-2xl font-black text-on-surface mb-2 text-center group-hover:text-primary transition-colors">Select PDF file</h3>
              <p className="text-on-surface-variant text-center max-w-sm">
                Drop your PDF here to reorder or remove pages.
              </p>
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 w-full lg:w-72 h-fit bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-sm sticky top-24">
         <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex items-center gap-3">
            <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{tool.name}</h2>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm tracking-widest border border-blue-400/30">
                  BETA
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">{t('tool.organize_pdf.beta_warning', 'Not stable for production')}</p>
            </div>
         </div>
         
         <div className="p-5 flex-1 overflow-y-auto">
            <div className="text-sm text-on-surface-variant space-y-3">
              <p><strong>1.</strong> {t('tool.organize_pdf.instruction.1', 'Upload a PDF file to see its pages.')}</p>
              <p><strong>2.</strong> {t('tool.organize_pdf.instruction.2', 'Drag and drop any page to reorder them.')}</p>
              <p><strong>3.</strong> {t('tool.organize_pdf.instruction.3', 'Click and drag the background to scroll horizontally.')}</p>
              <p><strong>4.</strong> {t('tool.organize_pdf.instruction.4', 'Click the trash icon to remove a page completely.')}</p>
            </div>
         </div>
         
         <div className="p-5 border-t border-outline-variant/30 bg-surface-container-low">
            <button 
              onClick={handleOrganize}
              disabled={!file || status === 'processing' || pages.length === 0}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 bg-primary text-on-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? <RefreshCw className="animate-spin" size={20} /> : <Layers size={20} />}
              {status === 'processing' ? t('tool.organize_pdf.btn_processing', 'Processing...') : t('tool.organize_pdf.btn_save', 'Save Changes')}
            </button>
         </div>
      </div>
    </div>
  );
}
