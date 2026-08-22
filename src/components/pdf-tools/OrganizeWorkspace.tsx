"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, FileText, Download, RefreshCw, Layers, Trash2, ChevronLeft, ChevronRight, Check, RotateCcw, Pencil } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { useLanguage } from '../../context/LanguageContext';
import TacoIcon from '../TacoIcon';

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
  const [outputFileName, setOutputFileName] = useState<string>('');
  
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
      setOutputFileName(`organized_${selected.name}`);
      setIsGeneratingThumbs(true);
      
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

  useEffect(() => {
    // Enable touch drag and drop for mobile devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      if (!document.getElementById('drag-drop-touch-polyfill')) {
        const script = document.createElement('script');
        script.id = 'drag-drop-touch-polyfill';
        script.src = 'https://bernardo-castilho.github.io/DragDropTouch/DragDropTouch.js';
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-start gap-6">
      <div className="lg:col-span-8 w-full lg:w-auto flex-1 flex flex-col gap-4">
        <div className="w-full flex-1 border border-outline-variant/30 rounded-2xl h-fit min-h-[200px] bg-surface-container-low flex flex-col relative overflow-hidden">


        {status === 'processing' || isGeneratingThumbs ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low relative">
            <RefreshCw className="animate-spin text-primary mb-4" size={48} />
            <h3 className="text-xl font-bold text-on-surface mb-2">{isGeneratingThumbs ? t('tool.organize.loading', 'Loading pages...') : t('tool.organize.organizing', 'Organizing PDF...')}</h3>
          </div>
        ) : status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-surface-container-low">
             <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
               <Check size={32} />
             </div>
             <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2 text-center">{t('tool.organize.success', 'PDF Organized Successfully!')}</h3>
             
             <div className="flex flex-col gap-2 sm:gap-3 mt-6 w-full max-w-sm">
                <div className="mb-2 flex flex-col items-center gap-1.5 w-full max-w-sm min-w-0">
                  <label className="text-xs text-on-surface-variant font-medium w-full text-center break-words">
                    {t('workspace.rename.title', 'Rename Processed Output:')}
                  </label>
                  {(() => {
                    const fileName = outputFileName || 'document.pdf';
                    const lastDot = fileName.lastIndexOf('.');
                    const baseName = lastDot > 0 ? fileName.substring(0, lastDot) : fileName;
                    const ext = lastDot > 0 ? fileName.substring(lastDot) : '';
                    return (
                      <div className="flex items-center w-full bg-surface border border-outline-variant rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <input 
                          type="text" 
                          value={baseName}
                          onChange={(e) => setOutputFileName(e.target.value + ext)}
                          className="flex-1 bg-transparent px-3 py-2 text-sm text-on-surface focus:outline-none min-w-0"
                          placeholder={t('workspace.rename.placeholder', 'Rename output file')}
                        />
                        <span className="text-sm text-on-surface-variant pr-2 select-none pointer-events-none shrink-0 hidden sm:inline-block">{ext}</span>
                        <button 
                          className="p-2 text-on-surface-variant hover:text-primary transition-colors shrink-0"
                          title={t('workspace.rename.button', 'Rename')}
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    )
                  })()}
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                  <a 
                    href={downloadUrl}
                    download={outputFileName || `organized_${file?.name || 'document.pdf'}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-sm font-bold shadow-md transition-colors flex-1 sm:flex-none min-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <Download size={16} />
                    {t('workspace.preview.blocked.download', 'Download')}
                  </a>
                </div>
                
                <div className="pt-3 mt-1 sm:pt-4 sm:mt-2 border-t border-outline-variant/30 flex justify-center w-full">
                  <button
                    onClick={() => { setFile(null); setStatus('idle'); setPages([]); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/30 text-on-surface rounded-lg text-sm font-medium transition-colors w-full shadow-sm"
                  >
                    <RotateCcw size={16} />
                    {t('workspace.btn.another', 'Process Another Document')}
                  </button>
                </div>
             </div>
          </div>
        ) : file ? (
          <div className="flex-1 flex flex-col p-4 sm:p-6 pt-14 sm:pt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant shadow-sm">
               <h3 className="text-base sm:text-lg font-bold text-on-surface truncate break-all max-w-full sm:max-w-[70%]">{file.name}</h3>
               <button 
                 onClick={() => { setFile(null); setPages([]); }}
                 className="text-error font-bold text-sm hover:bg-error/20 bg-error/10 px-4 py-2 rounded-lg transition-colors shrink-0 flex items-center justify-center gap-2"
               >
                 <Trash2 size={16} /> {t('workspace.file.remove', 'Remove file')}
               </button>
            </div>
            
            {pages.length === 0 ? (
               <div className="text-center text-error mt-10 font-bold">{t('tool.organize.empty', 'All pages removed. Please upload again.')}</div>
            ) : (
               <div 
                 ref={scrollRef}
                 onMouseDown={handleMouseDown}
                 onMouseLeave={handleMouseLeave}
                 onMouseUp={handleMouseUp}
                 onMouseMove={handleMouseMove}
                 className="grid grid-cols-3 sm:flex sm:flex-row sm:items-center gap-2 sm:gap-6 overflow-y-auto sm:overflow-y-visible sm:overflow-x-auto max-h-[55vh] sm:max-h-none pb-4 sm:pb-8 sm:snap-x sm:snap-mandatory pt-2 px-2 custom-scrollbar cursor-grab active:cursor-grabbing"
               >
                 {pages.map((page, index) => (
                   <div 
                     key={page.id} 
                     draggable
                     onDragStart={(e) => handleDragStart(e, index)}
                     onDragOver={(e) => handleDragOver(e, index)}
                     onDrop={(e) => handleDrop(e, index)}
                     onDragEnd={() => setDraggedIndex(null)}
                     className={`relative group bg-surface-container-high rounded-lg sm:rounded-xl p-1.5 sm:p-3 border border-outline-variant shadow-sm hover:border-primary/50 transition-colors shrink-0 w-full sm:w-56 sm:snap-center cursor-move ${draggedIndex === index ? 'opacity-50 border-primary border-dashed' : ''}`}
                   >
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-[12px] font-bold px-2 py-0.5 rounded shadow z-10 pointer-events-none">
                        {index + 1}
                      </div>
                      
                      <div className="absolute top-1 right-1 flex gap-1 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => removePage(index)} className="bg-red-500 hover:bg-red-600 text-white p-2 sm:p-1 rounded-md sm:rounded shadow-sm">
                           <Trash2 size={14} className="sm:w-3 sm:h-3" />
                         </button>
                      </div>

                      <img src={page.url} className="w-full h-auto object-contain bg-white mb-2 shadow-sm pointer-events-none select-none" />
                   </div>
                 ))}
               </div>
            )}
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
                onClick={() => document.getElementById('organize-upload')?.click()}
                className="flex border-2 border-dashed rounded-xl p-3 md:p-10 w-full flex-col items-center justify-center cursor-pointer transition-all mobile-glow border-primary-container bg-surface-container"
              >
                <input
                  id="organize-upload"
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
                    onClick={(e) => { e.stopPropagation(); document.getElementById('organize-upload')?.click(); }}
                    className="ml-2 shrink-0 px-4 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-[10px]"
                  >
                    {t('workspace.drop.browse', 'Browse')}
                  </button>
                </div>

                {/* Desktop View: Vertical Stack */}
                <div className="hidden md:flex flex-col items-center justify-center text-center">
                  <Upload size={48} className="text-primary-container mb-4" />
                  <p className="text-lg font-bold text-on-surface mb-2">{t('tool.organize.select', 'Select PDF file')}</p>
                  <p className="text-sm text-on-surface-variant mb-6">
                    {t('tool.organize.drop', 'Drop your PDF here to reorder or remove pages.')}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); document.getElementById('organize-upload')?.click(); }}
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
        
        {/* Desktop Action Button Under Upload Box */}
        {(file && status !== 'processing' && status !== 'success' && status !== 'error') && (
           <div className="hidden lg:block w-full">
              <button 
                onClick={handleOrganize}
                disabled={!file || status === 'processing' || pages.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-4 px-4 rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'processing' ? <RefreshCw className="animate-spin" size={32} /> : <TacoIcon name={tool.icon} size={32} />}
                {status === 'processing' ? t('tool.organize_pdf.btn_processing', 'Processing...') : t('tool.organize_pdf.btn_save', 'Save Changes')}
              </button>
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
                <h2 className="text-xl font-bold text-on-surface">{t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}</h2>

              </div>

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
         
         {(status !== 'success' && status !== 'error') && (
           <div className={(file && status !== 'processing') ? "fixed bottom-0 left-0 right-0 p-4 bg-surface-container border-t border-outline-variant/30 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] pb-safe lg:hidden lg:relative lg:p-5 lg:bg-surface-container-low lg:border-t lg:border-outline-variant/30 lg:z-auto lg:shadow-none" : "p-5 border-t border-outline-variant/30 bg-surface-container-low lg:hidden"}>
              <button 
                onClick={handleOrganize}
                disabled={!file || status === 'processing' || pages.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-3.5 px-4 rounded-lg shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'processing' ? <RefreshCw className="animate-spin" size={32} /> : <TacoIcon name={tool.icon} size={32} />}
                {status === 'processing' ? t('tool.organize_pdf.btn_processing', 'Processing...') : t('tool.organize_pdf.btn_save', 'Save Changes')}
              </button>
           </div>
         )}
         {(file && status !== 'processing' && status !== 'success' && status !== 'error') && (
           <div className="h-24 w-full lg:hidden" />
         )}
      </div>
    </div>
  );
}
