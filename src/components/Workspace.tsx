// @ts-nocheck
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, FileText, Download, X, AlertCircle, RefreshCw, MoveUp, MoveDown, Check, Eye, EyeOff, ShieldCheck, PenTool, Trash2, RotateCw, RotateCcw } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFTool, ProcessingState } from '../types';
import TacoIcon from './TacoIcon';
import LucideIcon from './LucideIcon';
import SignaturePad from './SignaturePad';
import { useLanguage } from '../context/LanguageContext';
import { createBrowserQpdfRunner } from 'qpdf-run';
import { motion, AnimatePresence, Reorder, useMotionValue } from 'motion/react';
import Tesseract from 'tesseract.js';
import VisualGrid from './VisualGrid';

const qpdfWasmUrl = 'https://unpkg.com/qpdf-run@0.2.1/vendor/qpdf/lib/qpdf.wasm';
const qpdfJsUrl = 'https://unpkg.com/qpdf-run@0.2.1/vendor/qpdf/lib/qpdf.js';
const qpdfWorkerCode = `importScripts('https://unpkg.com/qpdf-run@0.2.1/src/worker.js');`;
const qpdfWorkerUrl = typeof window !== 'undefined' ? URL.createObjectURL(new Blob([qpdfWorkerCode], { type: 'application/javascript' })) : '';

const WatermarkPreview = ({
  thumbnailUrl,
  text,
  size,
  color,
  opacity,
  rotation,
  pdfWidth
}: {
  thumbnailUrl: string,
  text: string,
  size: number,
  color: string,
  opacity: number,
  rotation: number,
  pdfWidth: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !thumbnailUrl || !pdfWidth) return;
    
    let isActive = true;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      if (!isActive) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      
      // Calculate exact scaling ratio relative to 1:1 PDF points
      const scaleRatio = canvas.width / pdfWidth;
      const fontSize = size * scaleRatio;
      
      ctx.font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
      
      // Get text width
      const textWidth = ctx.measureText(text || ' ').width;
      // Exact metric for Helvetica Bold ascent is 0.718 of font size
      const textHeight = fontSize * 0.718;
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((-rotation * Math.PI) / 180);
      
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      
      // Center the text horizontally using -textWidth / 2
      ctx.fillText(text || ' ', -textWidth / 2, textHeight / 2);
      ctx.shadowColor = 'rgba(255,255,255,0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(text || ' ', -textWidth / 2, textHeight / 2);
      ctx.restore();
    };
    img.src = thumbnailUrl;

    return () => {
      isActive = false;
    };
  }, [thumbnailUrl, text, size, color, opacity, rotation, pdfWidth]);

  return (
    <canvas 
      ref={canvasRef}
      className="max-w-full w-full h-auto object-contain block shadow-lg border border-outline-variant/30 bg-white"
    />
  );
};

interface WorkspaceProps {
  tool: PDFTool;
  onBack: () => void;
  initialFiles?: File[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

interface PlacedSignature {
  id: string;
  page: number;
  x: number;
  y: number;
  scale: number;
  data: string;
}

// Robust helper to parse page numbers (e.g. "1, 3-5, 8")
function parsePageRanges(rangeStr: string, maxPage: number): number[] {
  const pages = new Set<number>();
  if (!rangeStr.trim()) return [];
  const parts = rangeStr.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = parseInt(startStr.trim(), 10);
      const end = parseInt(endStr.trim(), 10);
      if (!isNaN(start) && !isNaN(end)) {
        const s = Math.max(1, Math.min(start, maxPage));
        const e = Math.max(1, Math.min(end, maxPage));
        for (let i = Math.min(s, e); i <= Math.max(s, e); i++) {
          pages.add(i);
        }
      }
    } else {
      const page = parseInt(trimmed, 10);
      if (!isNaN(page) && page >= 1 && page <= maxPage) {
        pages.add(page);
      }
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

function generatePageRanges(pages: number[]): string {
  if (pages.length === 0) return '';
  const sorted = [...pages].sort((a, b) => a - b).map(p => p + 1);
  const ranges = [];
  let start = sorted[0];
  let end = start;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push(start === end ? `${start}` : `${start}-${end}`);
      start = sorted[i];
      end = start;
    }
  }
  ranges.push(start === end ? `${start}` : `${start}-${end}`);
  return ranges.join(', ');
}

// Convert Hex to RGB [0, 1]
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return { r: isNaN(r) ? 0 : r, g: isNaN(g) ? 0 : g, b: isNaN(b) ? 0 : b };
}

// Convert any image file (WEBP, GIF, PNG, JPG) to JPEG ArrayBuffer using canvas
async function convertImageToJpg(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to create canvas 2D drawing context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas image conversion to JPEG blob failed'));
            return;
          }
          const blobReader = new FileReader();
          blobReader.onload = () => {
            if (blobReader.result instanceof ArrayBuffer) {
              resolve(blobReader.result);
            } else {
              reject(new Error('FileReader result is not ArrayBuffer'));
            }
          };
          blobReader.onerror = () => reject(blobReader.error);
          blobReader.readAsArrayBuffer(blob);
        }, 'image/jpeg', 0.95);
      };
      img.onerror = () => reject(new Error('Failed to parse uploaded image format'));
      if (e.target?.result) {
        img.src = e.target.result as string;
      } else {
        reject(new Error('Failed to process image path'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Dynamic load of PDF.js from CDN
const loadPdfJs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      resolve(pdfjsLib);
    };
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

// Render PDF pages as PNG images dynamically for previewing
async function renderPdfPagesToImages(pdfUrl: string): Promise<string[]> {
  try {
    const pdfjsLib = await loadPdfJs();
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDoc = await loadingTask.promise;
    const pagesCount = pdfDoc.numPages;
    const urls: string[] = [];
    
    for (let i = 1; i <= pagesCount; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 }); // Crisp but lightweight
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        urls.push(canvas.toDataURL('image/png'));
      }
    }
    return urls;
  } catch (err) {
    console.error('Error rendering PDF pages to preview:', err);
    return [];
  }
}

// Render a single PDF page quickly for interactive placement previews
async function renderSinglePdfPageToImage(file: File, pageIndex: number): Promise<{url: string, width: number, height: number} | null> {
  try {
    const pdfjsLib = await loadPdfJs();
    const fileBytes = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument(fileBytes);
    const pdfDoc = await loadingTask.promise;
    const maxPage = pdfDoc.numPages;
    const targetPageNum = pageIndex === -1 ? maxPage : Math.min(Math.max(1, pageIndex), maxPage);
    
    const page = await pdfDoc.getPage(targetPageNum);
    const viewport = page.getViewport({ scale: 1.0 }); // Base scale
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      return {
        url: canvas.toDataURL('image/png'),
        width: viewport.width,
        height: viewport.height
      };
    }
    return null;
  } catch (err) {
    console.error('Error rendering single PDF page:', err);
    return null;
  }
}
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#ffcccc', color: 'black' }}>
          <h2>React Runtime Crash</h2>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Workspace(props: WorkspaceProps) {
  return (
    <ErrorBoundary>
      <WorkspaceInner {...props} />
    </ErrorBoundary>
  );
}




function DraggableRedactBox({ box, containerId, onUpdate, onRemove, onDuplicate }) {
  const [isResizing, setIsResizing] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const startDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.closest('.resize-handle') || e.target.closest('button')) return; 
    
    setIsDragging(true);
    const startClientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startClientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startBoxX = box.x;
    const startBoxY = box.y;

    const container = document.getElementById(containerId);
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault();
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaX = (currentX - startClientX) / rect.width;
      const deltaY = (currentY - startClientY) / rect.height;
      
      onUpdate(box.id, {
        x: Math.max(0, Math.min(1 - box.width, startBoxX + deltaX)),
        y: Math.max(0, Math.min(1 - box.height, startBoxY + deltaY))
      });
    };

    const handleUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };

    window.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchcancel', handleUp);
    window.addEventListener('touchend', handleUp);
  };

  const startResize = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    
    const startClientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startClientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startWidth = box.width;
    const startHeight = box.height;

    const container = document.getElementById(containerId);
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault();
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaX = (currentX - startClientX) / rect.width;
      const deltaY = (currentY - startClientY) / rect.height;
      
      onUpdate(box.id, {
        width: Math.max(0.01, startWidth + deltaX),
        height: Math.max(0.01, startHeight + deltaY)
      });
    };

    const handleUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };

    window.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchcancel', handleUp);
    window.addEventListener('touchend', handleUp);
  };

  return (
    <div
      style={{ left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%` }}
      className="absolute bg-black cursor-move group z-10"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div className="absolute -top-4 -right-3 flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); onDuplicate(box.id, false); }}
          className="bg-blue-500 text-white rounded-full p-1.5 shadow-sm hover:bg-blue-600 transition-colors"
          title="Duplikat di halaman ini"
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <LucideIcon name="Copy" size={12} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDuplicate(box.id, true); }}
          className="bg-green-500 text-white rounded-full p-1.5 shadow-sm hover:bg-green-600 transition-colors"
          title="Duplikat ke halaman berikutnya"
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <LucideIcon name="ArrowDown" size={12} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(box.id); }}
          className="bg-red-500 text-white rounded-full p-1.5 shadow-sm hover:bg-red-600 transition-colors"
          title="Hapus"
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <LucideIcon name="X" size={12} />
        </button>
      </div>
      
      <div 
        className="resize-handle absolute -bottom-2 -right-2 w-6 h-6 bg-white border-2 border-black rounded-full cursor-se-resize z-20 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        onMouseDown={startResize}
        onTouchStart={startResize}
      >
        <div className="w-2 h-2 bg-black rounded-full" />
      </div>
    </div>
  );
}
function DraggablePlacedSignature({ sig, containerId, onUpdate, onRemove, onDuplicate }) {
  const nodeRef = React.useRef(null);
  const { t } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = (event, info) => {
    const container = document.getElementById(containerId);
    if (!container || !nodeRef.current) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = nodeRef.current.getBoundingClientRect();
    
    const centerX = (targetRect.left + targetRect.width / 2) - containerRect.left;
    const centerY = (targetRect.top + targetRect.height / 2) - containerRect.top;
    
    const relX = centerX / containerRect.width;
    const relY = centerY / containerRect.height;
    
    onUpdate(sig.id, { x: Math.max(0, Math.min(1, relX)), y: Math.max(0, Math.min(1, relY)) });
    
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{
        position: 'absolute',
        top: `${sig.y * 100}%`,
        left: `${sig.x * 100}%`,
        width: `${30 * sig.scale}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 50
    }}>
      <motion.div
        ref={nodeRef}
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, y, cursor: 'move' }}
        className="group select-none w-full h-full relative"
      >
        <img src={sig.data} style={{ width: '100%', height: 'auto' }} className="pointer-events-none drop-shadow-md transition-colors" />
        
        {/* Controls Overlay */}
        <div className="absolute -top-4 -right-4 flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-lg">
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(sig.id); }}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
            onPointerDown={(e) => e.stopPropagation()}
            title={t('tool.sign.delete_btn') || 'Delete Signature'}
          >
            <LucideIcon name="Trash2" size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDuplicate(sig); }}
            className="bg-primary hover:bg-primary/90 text-white rounded-full p-1.5 transition-colors"
            onPointerDown={(e) => e.stopPropagation()}
            title={t('tool.sign.duplicate_btn') || 'Duplicate'}
          >
            <LucideIcon name="Copy" size={14} />
          </button>
        </div>

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-lg bg-surface-container rounded-full p-1 border border-outline-variant">
           <button 
             onClick={(e) => { e.stopPropagation(); onUpdate(sig.id, { scale: Math.max(0.2, sig.scale - 0.1) }); }}
             className="hover:bg-surface-variant text-on-surface rounded-full p-1 transition-colors"
             onPointerDown={(e) => e.stopPropagation()}
             title="Shrink"
           >
             <LucideIcon name="Minus" size={12} />
           </button>
           <span className="text-[10px] font-bold min-w-[3ch] text-center text-on-surface">{Math.round(sig.scale * 100)}%</span>
           <button 
             onClick={(e) => { e.stopPropagation(); onUpdate(sig.id, { scale: Math.min(3.0, sig.scale + 0.1) }); }}
             className="hover:bg-surface-variant text-on-surface rounded-full p-1 transition-colors"
             onPointerDown={(e) => e.stopPropagation()}
             title="Grow"
           >
             <LucideIcon name="Plus" size={12} />
           </button>
        </div>

      </motion.div>
    </div>
  );
}

function WorkspaceInner({ tool, onBack, initialFiles }: WorkspaceProps) {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileToPreview, setFileToPreview] = useState<UploadedFile | null>(null);
  // Redact Tool State
  interface RedactBox { id: string, x: number, y: number, width: number, height: number, pageNum: number }
  const [redactBoxes, setRedactBoxes] = useState<RedactBox[]>([]);
  const [drawingBox, setDrawingBox] = useState<{ startX: number, startY: number, currentX: number, currentY: number, pageNum: number } | null>(null);
  const [activeRedactPage, setActiveRedactPage] = useState<number | null>(null);
  const [redactZoom, setRedactZoom] = useState<number>(100);

    const handleDuplicateBox = (id: string, toNextPage: boolean) => {
    setRedactBoxes(prev => {
      const box = prev.find(b => b.id === id);
      if (!box) return prev;
      
      const newBox = { ...box, id: Math.random().toString(36).substr(2, 9) };
      
      if (toNextPage) {
        if (box.pageNum < visualThumbnails.length) {
          newBox.pageNum = box.pageNum + 1;
        } else {
          return prev;
        }
      } else {
        newBox.x = Math.min(1 - box.width, box.x + 0.05);
        newBox.y = Math.min(1 - box.height, box.y + 0.05);
      }
      
      return [...prev, newBox];
    });
  };

const updateRedactBox = (id: string, updates: Partial<RedactBox>) => {
    setRedactBoxes(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleRedactStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, pageNum: number) => {
    if (tool.id !== 'redact') return;
    if (activeRedactPage !== pageNum) {
      setActiveRedactPage(pageNum);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setDrawingBox({ startX: x, startY: y, currentX: x, currentY: y, pageNum });
  };

  const handleRedactMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!drawingBox || drawingBox.pageNum === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDrawingBox({
      ...drawingBox,
      currentX: Math.max(0, Math.min(clientX - rect.left, rect.width)),
      currentY: Math.max(0, Math.min(clientY - rect.top, rect.height))
    });
  };

  const handleRedactEnd = () => {
    if (drawingBox) {
      const width = Math.abs(drawingBox.currentX - drawingBox.startX);
      const height = Math.abs(drawingBox.currentY - drawingBox.startY);
      if (width > 5 && height > 5) {
        const x = Math.min(drawingBox.startX, drawingBox.currentX);
        const y = Math.min(drawingBox.startY, drawingBox.currentY);
        
        const container = document.getElementById(`redact-page-${drawingBox.pageNum}`);
        if (container) {
          const rect = container.getBoundingClientRect();
          setRedactBoxes(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            x: x / rect.width,
            y: y / rect.height,
            width: width / rect.width,
            height: height / rect.height,
            pageNum: drawingBox.pageNum
          }]);
        }
      }
      setDrawingBox(null);
    }
  };

  const [isDragActive, setIsDragActive] = useState(false);

  // Merge Tool Drag and Drop State
  const [draggedFileId, setDraggedFileId] = useState<string | null>(null);
  const [dragOverFileId, setDragOverFileId] = useState<string | null>(null);

  const handleCardDragStart = (e: React.DragEvent, fileId: string) => {
    setDraggedFileId(fileId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      if (e.target instanceof HTMLElement) e.target.style.opacity = '0.4';
    }, 0);
  };

  const handleCardDragEnd = (e: React.DragEvent) => {
    setDraggedFileId(null);
    setDragOverFileId(null);
    if (e.target instanceof HTMLElement) e.target.style.opacity = '1';
  };

  const handleCardDragOver = (e: React.DragEvent, fileId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (fileId !== dragOverFileId) {
      setDragOverFileId(fileId);
    }
  };

  const handleCardDrop = (e: React.DragEvent, targetFileId: string) => {
    e.preventDefault();
    if (!draggedFileId || draggedFileId === targetFileId) {
      setDraggedFileId(null);
      setDragOverFileId(null);
      return;
    }
    const draggedIndex = uploadedFiles.findIndex(f => f.id === draggedFileId);
    const targetIndex = uploadedFiles.findIndex(f => f.id === targetFileId);
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newFiles = [...uploadedFiles];
      const [draggedItem] = newFiles.splice(draggedIndex, 1);
      newFiles.splice(targetIndex, 0, draggedItem);
      setUploadedFiles(newFiles);
    }
    setDraggedFileId(null);
    setDragOverFileId(null);
  };
  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: 'idle',
    progress: 0,
    message: '',
  });

  const [customFileName, setCustomFileName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [globalUnlockPassword, setGlobalUnlockPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [needsGlobalPassword, setNeedsGlobalPassword] = useState(false);
  const [globalPasswordError, setGlobalPasswordError] = useState('');
  
  // High-fidelity local rendering states
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [extractedPageImages, setExtractedPageImages] = useState<string[]>([]);
  
  // Interactive password preview simulation
  const [previewPasswordInput, setPreviewPasswordInput] = useState('');
  const [previewPasswordError, setPreviewPasswordError] = useState('');
  const [isPreviewLocked, setIsPreviewLocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // E-Signature Config
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [applyToAllPages, setApplyToAllPages] = useState<boolean>(false);
  const [signTargetPage, setSignTargetPage] = useState<number>(1);
  const [placedSignatures, setPlacedSignatures] = useState<PlacedSignature[]>([]);
  const [signTotalPages, setSignTotalPages] = useState<number>(1);
  const [signatureScale, setSignatureScale] = useState<number>(1.0);
  
  // Interactive drag state
  const [signDragPos, setSignDragPos] = useState({ x: 0, y: 0 });
  const [signPreviewPage, setSignPreviewPage] = useState<{url: string, width: number, height: number} | null>(null);


  // Load standard fonts only once when needed
  const [isExtractingPreview, setIsExtractingPreview] = useState(false);
  const signOverlayRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Advanced Visual Tools State
  const [thumbnailNativeSize, setThumbnailNativeSize] = useState({ w: 0, h: 0 }); // Was 892, 1263
  const [visualThumbnails, setVisualThumbnails] = useState<string[]>([]);
  const [fileThumbnails, setFileThumbnails] = useState<Record<string, string>>({});
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);
  const [pagesToDelete, setPagesToDelete] = useState<number[]>([]);
  const [pagesToExtract, setPagesToExtract] = useState<number[]>([]);
  const [extractMode, setExtractMode] = useState<'all' | 'select'>('select');
  const [extractMerge, setExtractMerge] = useState<boolean>(true);
  const [extractInputString, setExtractInputString] = useState<string>('');
  const [pageRotations, setPageRotations] = useState<Record<number, number>>({});
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [ocrResult, setOcrResult] = useState('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  
  // File locked detection state
  const [lockedFileIds, setLockedFileIds] = useState<Set<string>>(new Set());
  // Per-file preview state
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>('');

  // Add signature handler
  
  const handleAddSignatureToSpecificPage = (pageNum) => {
    if (!signatureData) return;
    setPlacedSignatures(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 11),
        page: pageNum,
        x: 0.5,
        y: 0.5,
        scale: signatureScale,
        data: signatureData
      }
    ]);
  };
  
  const updateSignature = (id, updates) => {
    setPlacedSignatures(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };
  
  const removeSignature = (id) => {
    setPlacedSignatures(prev => prev.filter(s => s.id !== id));
  };

  // Load preview function (extract to reuse)
  React.useEffect(() => {
    setCustomFileName('');
    setShowPreview(false);
    setProcessingState({
      status: 'idle',
      progress: 0,
      message: '',
    });
    setIsGeneratingThumbnails(false);
    setPagesToDelete([]);
    setPagesToExtract([]);
    setExtractInputString('');
    setPageRotations({});
    setPageOrder([]);
    setOcrResult('');
    setVisualThumbnails([]);
  }, [tool.id]);

  React.useEffect(() => {
    // Generate thumbnails for visual tools
    if (uploadedFiles.length > 0 && ['delete-pages', 'rotate', 'reorder', 'redact', 'split', 'sign', 'extract-pages', 'merge', 'image-to-pdf', 'add-watermark', 'add-page-numbers', 'pdf-to-image'].includes(tool.id)) {
      setIsGeneratingThumbnails(true);
      const generateThumbnails = async () => {
        try {
          const pdfjsLib = await loadPdfJs();
          
          if (tool.id === 'merge' || tool.id === 'image-to-pdf') {
            // For merge, we want the first page of EVERY uploaded file
            // For image-to-pdf, we just want the object url of the image
            const newFileThumbnails: Record<string, string> = {};
            for (const fileObj of uploadedFiles) {
              try {
                // If we already generated this thumbnail in a previous effect run, preserve it
                if (fileThumbnails[fileObj.id]) {
                  newFileThumbnails[fileObj.id] = fileThumbnails[fileObj.id];
                  continue;
                }
                
                if (tool.id === 'image-to-pdf') {
                  newFileThumbnails[fileObj.id] = URL.createObjectURL(fileObj.file);
                } else {
                  const pdfBytes = await fileObj.file.arrayBuffer();
                  const loadParams: any = { data: new Uint8Array(pdfBytes) };
                  const loadingTask = pdfjsLib.getDocument(loadParams);
                  const pdf = await loadingTask.promise;
                  const page = await pdf.getPage(1);
                  const viewport = page.getViewport({ scale: 0.5 });
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  if (context) {
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: context, viewport }).promise;
                    newFileThumbnails[fileObj.id] = canvas.toDataURL('image/jpeg', 0.8);
                  }
                }
              } catch (err) {
                console.error("Failed to generate thumbnail for file", fileObj.file.name, err);
                // Can't render, just leave without a thumb
              }
            }
            setFileThumbnails(newFileThumbnails);
          } else {
            // For other tools, we want ALL pages of the FIRST uploaded file
            const pdfBytes = await uploadedFiles[0].file.arrayBuffer();
            
            const loadParams: any = { data: new Uint8Array(pdfBytes) };
            if (confirmedPassword) {
              loadParams.password = confirmedPassword;
            }

            const loadingTask = pdfjsLib.getDocument(loadParams);
            const pdf = await loadingTask.promise;
            const numPages = pdf.numPages;
            setPdfPageCount(numPages);
            const urls: string[] = [];
            
            setPageOrder(Array.from({length: numPages}, (_, i) => i));
            
            const previewScale = (tool.id === 'sign' || tool.id === 'redact' || tool.id === 'add-watermark' || tool.id === 'add-page-numbers') ? 1.5 : 0.5;
            
            const targetNumPages = (tool.id === 'add-watermark' || tool.id === 'add-page-numbers') ? 1 : numPages;
            for (let i = 1; i <= targetNumPages; i++) {
              const page = await pdf.getPage(i);
              const viewport = page.getViewport({ scale: previewScale });
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              if (context) {
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                if (i === 1 && (tool.id === 'add-watermark' || tool.id === 'add-page-numbers')) {
                  // Store 1:1 PDF points dimensions, NOT the scaled viewport dimensions
                  setThumbnailNativeSize({ w: page.getViewport({ scale: 1 }).width, h: page.getViewport({ scale: 1 }).height });
                }
                await page.render({ canvasContext: context, viewport }).promise;
                urls.push(canvas.toDataURL('image/jpeg', 0.8));
              }
            }
            setVisualThumbnails(urls);
            setNeedsGlobalPassword(false);
            setGlobalPasswordError('');
          }
        } catch (err: any) {
          console.error("Error generating thumbnails:", err);
          if (err.name === 'PasswordException' || (err.message && err.message.toLowerCase().includes('password'))) {
            setNeedsGlobalPassword(true);
            if (confirmedPassword) setGlobalPasswordError(t('error.incorrect_password') || 'Incorrect password.');
          }
        } finally {
          setIsGeneratingThumbnails(false);
        }
      };
      generateThumbnails();
    }
  }, [uploadedFiles, tool.id, confirmedPassword]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPreview(false);
        setFileToPreview(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && uploadedFiles.length === 0) {
      addFiles(initialFiles);
    }
  }, [initialFiles]);

  useEffect(() => {
    if (tool.id === 'sign' && uploadedFiles.length > 0) {
      renderSinglePdfPageToImage(uploadedFiles[0].file, signTargetPage)
        .then(res => {
          setSignPreviewPage(res);
          setSignDragPos({ x: 0, y: 0 }); // reset drag on page change
        })
        .catch(err => console.error("Failed to render sign preview:", err));
    } else {
      setSignPreviewPage(null);
    }
  }, [tool.id, uploadedFiles, signTargetPage]);

  // Fetch total pages for sign tool
  useEffect(() => {
    const fetchTotalPages = async () => {
      if (tool.id === 'sign' && uploadedFiles.length > 0) {
        try {
          const pdfjsLib = await loadPdfJs();
          const fileBytes = await uploadedFiles[0].file.arrayBuffer();
          const loadingTask = pdfjsLib.getDocument(fileBytes);
          const pdfDoc = await loadingTask.promise;
          setSignTotalPages(pdfDoc.numPages);
          // Only reset target page if it's out of bounds
          if (signTargetPage > pdfDoc.numPages) {
            setSignTargetPage(1);
          }
        } catch (err) {
          console.error("Failed to load PDF to get total pages", err);
          setSignTotalPages(1);
        }
      }
    };
    fetchTotalPages();
  }, [tool.id, uploadedFiles]);

  // Auto-scroll to relevant sections on upload
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setTimeout(() => {
        const isLocked = uploadedFiles.some(f => lockedFileIds.has(f.id));
        
        if (tool.id === 'unlock') {
          document.getElementById('file-list-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (isLocked) {
          const warningBox = document.getElementById('locked-warning-box-mobile') || document.getElementById('locked-warning-box');
          if (warningBox) {
            warningBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            document.getElementById('file-list-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else if (tool.id === 'sign') {
          document.getElementById('signature-pad-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (['delete-pages', 'rotate', 'reorder', 'split', 'extract-pages', 'pdf-to-image'].includes(tool.id)) {
          document.getElementById('visual-grid-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tool.id === 'redact') {
          document.getElementById('redact-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (['merge', 'image-to-pdf'].includes(tool.id)) {
          document.getElementById('file-list-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          document.getElementById('tool-config-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [uploadedFiles.length, tool.id, lockedFileIds]);

  // Auto-scroll to success box when processing is done
  useEffect(() => {
    if (processingState.status === 'success') {
      setTimeout(() => {
        document.getElementById('success-box-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [processingState.status]);

  const handleOpenPreview = async () => {
    if (!processingState.downloadUrl) return;
    setPreviewPasswordInput('');
    setPreviewPasswordError('');
    
    if (tool.id === 'protect' && ownerPassword) {
      setIsPreviewLocked(true);
      setShowPreview(true);
      setPreviewImages([]);
    } else {
      setIsPreviewLocked(false);
      setIsPreviewLoading(true);
      setShowPreview(true);
      setPreviewImages([]);
      try {
        const imgs = await renderPdfPagesToImages(processingState.downloadUrl);
        setPreviewImages(imgs);
      } catch (err) {
        console.error('Error rendering preview:', err);
      } finally {
        setIsPreviewLoading(false);
      }
    }
  };

  const handleUnlockPreview = async () => {
    if (previewPasswordInput === ownerPassword) {
      setIsPreviewLocked(false);
      setIsPreviewLoading(true);
      setPreviewPasswordError('');
      try {
        if (processingState.downloadUrl) {
          const imgs = await renderPdfPagesToImages(processingState.downloadUrl);
          setPreviewImages(imgs);
        }
      } catch (err) {
        console.error('Error rendering preview:', err);
      } finally {
        setIsPreviewLoading(false);
      }
    } else {
      setPreviewPasswordError(t('error.incorrect_password'));
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tool specific options
  const [rotationAngle, setRotationAngle] = useState(90);
  const [rotateScope, setRotateScope] = useState<'all' | 'specific'>('all');
  const [rotatePages, setRotatePages] = useState('1');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [imageSize, setImageSize] = useState<'A4' | 'Letter' | 'Fit'>('A4');
  const [imageMargin, setImageMargin] = useState<number>(20);
  const [deletePageStr, setDeletePageStr] = useState('2');
  const [extractPageStr, setExtractPageStr] = useState('1, 3');

  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkSize, setWatermarkSize] = useState(48);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.4);
  const [watermarkColor, setWatermarkColor] = useState('#EF4444');
  const [watermarkRotation, setWatermarkRotation] = useState<number>(45);
  const [numberFormat, setNumberFormat] = useState('Page {n} of {total}');
  const [numberPosition, setNumberPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right'>('bottom-center');
  const [pageNumberPosition, setPageNumberPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right'>('bottom-center');
  const [numberSize, setNumberSize] = useState(12);
  const [numberColor, setNumberColor] = useState('#000000');
  const [pdfPageCount, setPdfPageCount] = useState(1);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
  
  // HTML to PDF tool options
  const [htmlContent, setHtmlContent] = useState(`<h1>My Document</h1>\n<p>This is a fast local PDF generated completely in my browser.</p>\n<p>It is encrypted and kept private locally.</p>`);
  const [htmlTemplate, setHtmlTemplate] = useState('blank');

  // Trigger file selection
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = async (filesList: File[]) => {
    const isMulti = tool.id === 'merge' || tool.id === 'image-to-pdf';
    
    // Filter by type: pdf or image depending on the tool
    const filtered = filesList.filter((f) => {
      if (tool.id === 'image-to-pdf') {
        return f.type.startsWith('image/');
      }
      return f.type === 'application/pdf';
    });

    if (filtered.length === 0) {
      alert(tool.id === 'image-to-pdf' ? t('workspace.drop.support_img') : t('workspace.drop.support_pdf'));
      return;
    }

    const newUploaded: UploadedFile[] = filtered.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: f.size,
      type: f.type,
      file: f,
    }));

    if (isMulti) {
      setUploadedFiles((prev) => [...prev, ...newUploaded]);
    } else {
      setUploadedFiles([newUploaded[0]]);
    }

    // Reset progress state if new files are uploaded
    setProcessingState({
      status: 'idle',
      progress: 0,
      message: '',
    });

    // Detect password-protected files
    for (const uf of newUploaded) {
      if (uf.type === 'application/pdf') {
        try {
          const bytes = await uf.file.arrayBuffer();
          await PDFDocument.load(bytes);
          // If loaded OK, not locked
        } catch (e: any) {
          const msg = e.message || '';
          if (msg.toLowerCase().includes('encrypted') || e.name === 'PasswordException') {
            setLockedFileIds(prev => new Set([...prev, uf.id]));
          }
        }
      }
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    setLockedFileIds(prev => { const next = new Set(prev); next.delete(id); return next; });
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === uploadedFiles.length - 1) return;

    const newFiles = [...uploadedFiles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setUploadedFiles(newFiles);
  };

  // Main client-side PDF logic - properly handles password-protected PDFs
  const loadPdf = async (bytes: ArrayBuffer, overridePass?: string): Promise<PDFDocument> => {
    const activePass = overridePass || confirmedPassword;
    try {
      if (activePass) {
        const pdf = await PDFDocument.load(bytes, { password: activePass });
        setNeedsGlobalPassword(false);
        setGlobalPasswordError('');
        return pdf;
      }
      return await PDFDocument.load(bytes);
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('encrypted') && tool.id !== 'unlock') {
        setNeedsGlobalPassword(true);
        throw new Error("ENCRYPTED_PDF_NEEDS_PASSWORD");
      }
      if (activePass && (msg.toLowerCase().includes('password') || msg.includes('Invalid Password') || msg.includes('Incorrect password'))) {
        setGlobalPasswordError(t('error.incorrect_password') || 'Incorrect password. Please try again.');
        setNeedsGlobalPassword(true);
        throw new Error("INVALID_GLOBAL_PASSWORD");
      }
      throw err;
    }
  };

  // Update Extract UI handlers
  const handleExtractInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setExtractInputString(val);
    const maxPage = uploadedFiles.length > 0 ? visualThumbnails.length : 1000;
    const parsed = parsePageRanges(val, maxPage);
    setPagesToExtract(parsed.map(p => p - 1));
  };

  const handleExtractToggle = (index: number) => {
    setPagesToExtract((prev) => {
      const next = prev.includes(index) ? prev.filter(p => p !== index) : [...prev, index];
      setExtractInputString(generatePageRanges(next));
      return next;
    });
  };

  // Build the processing request
  const handleProcess = async (overridePass?: string | any) => {
    const actualPass = typeof overridePass === 'string' ? overridePass : undefined;
    if (uploadedFiles.length === 0 && tool.id !== 'html-to-pdf') return;

    setProcessingState({
      status: 'processing',
      progress: 10,
      message: t('progress.loading_binaries'),
    });

    try {
      let outputBytes: Uint8Array;
      let outName = '';
      let customSuccessMessage = '';

      if (tool.id === 'merge') {
        const mergedPdf = await PDFDocument.create();
        for (let i = 0; i < uploadedFiles.length; i++) {
          setProcessingState({
            status: 'processing',
            progress: Math.floor(10 + (i / uploadedFiles.length) * 70),
            message: t('progress.merging_files').replace('{current}', (i + 1).toString()).replace('{total}', uploadedFiles.length.toString()),
          });
          const fileBytes = await uploadedFiles[i].file.arrayBuffer();
          const srcPdf = await loadPdf(fileBytes, actualPass);
          const copiedPages = await mergedPdf.copyPages(srcPdf, srcPdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        outputBytes = await mergedPdf.save();
        outName = 'merged_taco.pdf';

      } else if (tool.id === 'split') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        const maxPage = srcPdf.getPageCount();
        
        const pagesToProcess = pagesToExtract.length > 0 
          ? [...pagesToExtract].sort((a, b) => a - b)
          : Array.from({ length: maxPage }, (_, i) => i);
          
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.splitting') || 'Splitting PDF...',
        });

        const zip = new JSZip();
        for (let i = 0; i < pagesToProcess.length; i++) {
          const pageIndex = pagesToProcess[i];
          const splitPdf = await PDFDocument.create();
          const [copied] = await splitPdf.copyPages(srcPdf, [pageIndex]);
          splitPdf.addPage(copied);
          const pageBytes = await splitPdf.save();
          zip.file(`split_page_${pageIndex + 1}.pdf`, pageBytes);
        }

        outputBytes = await zip.generateAsync({ type: 'uint8array' });
        outName = 'split_pages.zip';

      } else if (tool.id === 'rotate') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.rotating_layouts'),
        });

        const allPages = srcPdf.getPages();
        const hasRotations = Object.entries(pageRotations).some(([_, rot]) => rot % 360 !== 0);
        
        if (!hasRotations) {
          throw new Error(t('error.select_pages_rotate') || 'Please select pages to rotate.');
        }

        Object.entries(pageRotations).forEach(([idxStr, rot]) => {
          const idx = parseInt(idxStr);
          if (rot % 360 !== 0 && allPages[idx]) {
            const currentRot = allPages[idx].getRotation().angle;
            allPages[idx].setRotation(degrees(currentRot + rot));
          }
        });

        outputBytes = await srcPdf.save();
        outName = `rotated_taco.pdf`;

      } else if (tool.id === 'protect') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.encrypting'),
        });
        
        if (!ownerPassword) {
          throw new Error(t('error.enter_password_encrypt'));
        }

        // Wait to allow UI to update
        await new Promise((r) => setTimeout(r, 100));

        // ── QPDF WebAssembly Encryption ─────────────────────────────────────
        // QPDF provides 100% content-preserving transformations, guaranteeing
        // no font corruption. We run it in a Web Worker via qpdf-run.
        const qpdf = await createBrowserQpdfRunner({
          workerUrl: qpdfWorkerUrl,
          wasmUrl: qpdfWasmUrl,
          qpdfJsUrl: qpdfJsUrl
        });
        const args = [];
        
        // If the file is already encrypted, provide the current password to open it
        if (actualPass) {
          args.push(`--password=${actualPass}`);
        }
        
        // Encrypt with AES-256
        args.push('--encrypt', ownerPassword, ownerPassword, '256', '--');
        args.push('input.pdf', 'output.pdf');
        
        const outputData = await qpdf.runOne({
          args,
          input: new Uint8Array(fileBytes)
        });
        
        if (outputData) {
          outputBytes = outputData;
        } else {
          console.error("QPDF failed to return output");
          throw new Error('Failed to encrypt PDF.');
        }
        outName = `secured_taco.pdf`;

      } else if (tool.id === 'unlock') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        
        if (!currentPassword) {
          throw new Error(t('error.enter_password_unlock'));
        }

        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.decrypting'),
        });

        // ── QPDF WebAssembly Decryption ─────────────────────────────────────
        const qpdf = await createBrowserQpdfRunner({
          workerUrl: qpdfWorkerUrl,
          wasmUrl: qpdfWasmUrl,
          qpdfJsUrl: qpdfJsUrl
        });
        let outputData;
        try {
          outputData = await qpdf.runOne({
            args: [`--password=${currentPassword}`, '--decrypt', 'input.pdf', 'output.pdf'],
            input: new Uint8Array(fileBytes)
          });
        } catch (qpdfError) {
          console.error("QPDF Unlock Error:", qpdfError);
          throw new Error(t('error.incorrect_password'));
        }
        
        if (outputData) {
          outputBytes = outputData;
        } else {
          console.error("QPDF failed to return output");
          throw new Error(t('error.incorrect_password'));
        }
        
        outName = 'unlocked_taco.pdf';

      } else if (tool.id === 'image-to-pdf') {
        const imgPdf = await PDFDocument.create();
        for (let i = 0; i < uploadedFiles.length; i++) {
          setProcessingState({
            status: 'processing',
            progress: Math.floor(10 + (i / uploadedFiles.length) * 80),
            message: t('progress.optimizing_image').replace('{current}', (i + 1).toString()).replace('{total}', uploadedFiles.length.toString()),
          });

          const imgFile = uploadedFiles[i];
          const arrayBuf = await convertImageToJpg(imgFile.file);
          const embedImg = await imgPdf.embedJpg(arrayBuf);

          let pWidth = embedImg.width;
          let pHeight = embedImg.height;

          if (imageSize === 'A4') {
            pWidth = 595;
            pHeight = 842;
          } else if (imageSize === 'Letter') {
            pWidth = 612;
            pHeight = 792;
          }

          const page = imgPdf.addPage([pWidth, pHeight]);
          
          const m = imageMargin;
          const fitWidth = pWidth - m * 2;
          const fitHeight = pHeight - m * 2;
          
          const ratio = Math.min(fitWidth / embedImg.width, fitHeight / embedImg.height);
          const w = embedImg.width * ratio;
          const h = embedImg.height * ratio;
          
          const x = (pWidth - w) / 2;
          const y = (pHeight - h) / 2;

          page.drawImage(embedImg, { x, y, width: w, height: h });
        }
        outputBytes = await imgPdf.save();
        outName = 'converted_images.pdf';

      } else if (tool.id === 'pdf-to-image') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        setProcessingState({
          status: 'processing',
          progress: 30,
          message: t('progress.loading_layout'),
        });

        const fileBlob = new Blob([fileBytes], { type: 'application/pdf' });
        const fileBlobUrl = URL.createObjectURL(fileBlob);
        
        try {
          const pdfjsLib = await loadPdfJs();
          const loadingTask = pdfjsLib.getDocument(fileBlobUrl);
          const pdfDoc = await loadingTask.promise;
          const pagesCount = pdfDoc.numPages;
          const urls: string[] = [];
          
          for (let i = 1; i <= pagesCount; i++) {
            setProcessingState({
              status: 'processing',
              progress: Math.floor(30 + (i / pagesCount) * 60),
              message: t('progress.rendering_png').replace('{current}', i.toString()).replace('{total}', pagesCount.toString()),
            });
            
            const page = await pdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 3.0 }); 
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              await page.render({ canvasContext: context, viewport }).promise;
              const mimeType = imageFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
              const quality = imageFormat === 'jpeg' ? 0.95 : undefined;
              urls.push(canvas.toDataURL(mimeType, quality));
            }
          }
          
          setExtractedPageImages(urls);
          
          if (pagesCount === 1) {
            const base64Data = urls[0].split(',')[1];
            const binaryString = atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            outputBytes = bytes;
            outName = `extracted_page.${imageFormat === 'jpeg' ? 'jpg' : 'png'}`;
          } else {
            setProcessingState(prev => ({
              ...prev,
              progress: 95,
              message: t('workspace.processing') || "Zipping images..."
            }));
            const zip = new JSZip();
            const ext = imageFormat === 'jpeg' ? 'jpg' : 'png';
            urls.forEach((url, idx) => {
              const base64Data = url.split(',')[1];
              zip.file(`page_${idx + 1}.${ext}`, base64Data, { base64: true });
            });
            outputBytes = await zip.generateAsync({ type: 'uint8array' });
            outName = 'extracted_images.zip';
          }
          
          URL.revokeObjectURL(fileBlobUrl);
          
        } catch (err: any) {
          console.error(err);
          throw new Error(t('error.extract_images_failed').replace('{msg}', err.message));
        }

      } else if (tool.id === 'delete-pages') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        const maxPage = srcPdf.getPageCount();
        
        let indicesToKeep = [];
        if (pagesToDelete.length > 0) {
           for (let i = 0; i < maxPage; i++) {
             if (!pagesToDelete.includes(i)) indicesToKeep.push(i);
           }
        } else {
           const delPages = parsePageRanges(deletePageStr, maxPage);
           if (delPages.length === 0) throw new Error(t('error.select_pages_delete'));
           for (let i = 0; i < maxPage; i++) {
             if (!delPages.includes(i + 1)) indicesToKeep.push(i);
           }
        }
        const outPdf = await PDFDocument.create();

        if (indicesToKeep.length === 0) {
          throw new Error(t('error.delete_all_pages'));
        }

        setProcessingState({
          status: 'processing',
          progress: 60,
          message: t('progress.compiling_layout'),
        });

        const copied = await outPdf.copyPages(srcPdf, indicesToKeep);
        copied.forEach((p) => outPdf.addPage(p));
        
        outputBytes = await outPdf.save();
        outName = `trimmed_taco.pdf`;

      } else if (tool.id === 'redact') {
        if (redactBoxes.length === 0) {
          throw new Error(t('error.no_redact_boxes') || 'Please draw at least one redaction box.');
        }
        
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({ status: 'processing', progress: 50, message: t('progress.redacting') || 'Applying redactions...' });
        
        const pages = srcPdf.getPages();
        
        // Group boxes by page
        const boxesByPage: Record<number, RedactBox[]> = {};
        redactBoxes.forEach(box => {
           if (!boxesByPage[box.pageNum]) boxesByPage[box.pageNum] = [];
           boxesByPage[box.pageNum].push(box);
        });

        Object.keys(boxesByPage).forEach(pageNumStr => {
           const pageNum = parseInt(pageNumStr);
           const page = pages[pageNum - 1];
           if (!page) return;
           
           const { width: pWidth, height: pHeight } = page.getSize();
           
           // We need the visual container width/height to map coordinates.
           // Since we don't have direct access to DOM from here easily, we rely on the fact that
           // visualThumbnails are rendered. But actually, we don't know the exact pixel width of the container during processFiles.
           // However, the container uses CSS `w-full max-w-2xl`.
           // A better approach is to store the container dimensions when drawing.
           // Since we didn't, let's assume the standard aspect ratio and calculate scale based on the page dimensions.
           // Wait, this is tricky. Let's inject a data attribute with the width during render, or just find it in DOM.
           boxesByPage[pageNum].forEach(box => {
                // pdf-lib origin is bottom-left, DOM origin is top-left
                const pdfX = box.x * pWidth;
                const pdfY = pHeight - ((box.y + box.height) * pHeight);
                const pdfWidth = box.width * pWidth;
                const pdfHeight = box.height * pHeight;
              
              page.drawRectangle({
                 x: pdfX,
                 y: pdfY,
                 width: pdfWidth,
                 height: pdfHeight,
                 color: rgb(0, 0, 0),
              });
           });
        });
        
        outputBytes = await srcPdf.save();
        outName = 'redacted_taco.pdf';
        
      } else if (tool.id === 'extract-pages') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        if (extractMode === 'select' && pagesToExtract.length === 0) {
          throw new Error(t('error.valid_pages_extract') || 'Please select at least one page to extract.');
        }

        setProcessingState({
          status: 'processing',
          progress: 60,
          message: t('progress.extracting_pages'),
        });

        if (extractMode === 'select' && extractMerge) {
          // Merge selected pages into one PDF
          const outPdf = await PDFDocument.create();
          const copied = await outPdf.copyPages(srcPdf, [...pagesToExtract].sort((a, b) => a - b));
          copied.forEach((p) => outPdf.addPage(p));
          outputBytes = await outPdf.save();
          outName = `extracted_pages.pdf`;
        } else {
          // ZIP extraction (all pages, or select without merge)
          const zip = new JSZip();
          const maxPage = srcPdf.getPageCount();
          const pagesToProcess = extractMode === 'all' 
            ? Array.from({ length: maxPage }, (_, i) => i) 
            : [...pagesToExtract].sort((a, b) => a - b);
          
          for (let i = 0; i < pagesToProcess.length; i++) {
            const pageIndex = pagesToProcess[i];
            const outPdf = await PDFDocument.create();
            const [copiedPage] = await outPdf.copyPages(srcPdf, [pageIndex]);
            outPdf.addPage(copiedPage);
            const pageBytes = await outPdf.save();
            zip.file(`page_${pageIndex + 1}.pdf`, pageBytes);
          }
          
          const zipContent = await zip.generateAsync({ type: "uint8array" });
          outputBytes = zipContent;
          outName = `extracted_pages.zip`;
        }


      } else if (tool.id === 'add-watermark') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.embedding_fonts'),
        });

        const font = await srcPdf.embedFont(StandardFonts.HelveticaBold);
        const { r, g, b } = hexToRgb(watermarkColor);
        const allPages = srcPdf.getPages();

        const textWidth = font.widthOfTextAtSize(watermarkText, watermarkSize);
        // Exact metric for Helvetica Bold ascent
        const textHeight = watermarkSize * 0.718; 
        
        allPages.forEach((page) => {
          const { width, height } = page.getSize();
          const pageRotation = page.getRotation().angle || 0;

          // 1. Hitung metrik teks asli dalam unit PDF
          const pdfTextWidth = font.widthOfTextAtSize(watermarkText, watermarkSize);
          const pdfTextHeight = font.heightAtSize(watermarkSize); 

          // 2. Tentukan titik tengah halaman
          const pageCenterX = width / 2;
          const pageCenterY = height / 2;

          // 3. Kalkulasi rotasi absolut
          const actualRotation = watermarkRotation - pageRotation;

          // 4. Hitung offset untuk memindahkan origin ke tengah teks
          const theta = actualRotation * (Math.PI / 180);
          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);

          const offsetX = (pdfTextWidth / 2) * cosT - (pdfTextHeight / 2) * sinT;
          const offsetY = (pdfTextWidth / 2) * sinT + (pdfTextHeight / 2) * cosT;

          // 5. Eksekusi gambar teks
          page.drawText(watermarkText, {
            x: pageCenterX - offsetX,
            y: pageCenterY - offsetY,
            size: watermarkSize,
            font: font,
            color: rgb(r, g, b),
            opacity: watermarkOpacity,
            rotate: degrees(actualRotation),
          });
        });

        outputBytes = await srcPdf.save();
        outName = 'watermarked_taco.pdf';

      } else if (tool.id === 'add-page-numbers') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.stamping_numbering') || 'Stamping page numbers...',
        });

        const font = await srcPdf.embedFont(StandardFonts.Helvetica);
        const { r, g, b } = hexToRgb(numberColor || '#000000');
        const allPages = srcPdf.getPages();
        const total = allPages.length;

        // Localized format strings based on current language
        const p1Str = t('tool.page_num.format_2').replace('1', ''); // e.g. "Page " or "Halaman "
        const pOfStr = t('tool.page_num.format_3').replace('1', '').replace('10', '').trim(); // e.g. "of" or "dari"

        allPages.forEach((page, idx) => {
          const { width, height } = page.getSize();
          
          let pStr = numberFormat
            .replace('{n}', (idx + 1).toString())
            .replace('{total}', total.toString());
            
          // If format is "Page {n}" we replace "Page " with localized string
          if (numberFormat.includes('Page ')) {
             pStr = pStr.replace('Page ', p1Str.trim() + ' ');
          }
          if (numberFormat.includes(' of ')) {
             pStr = pStr.replace(' of ', ' ' + pOfStr + ' ');
          }

          const textWidth = font.widthOfTextAtSize(pStr, numberSize);
          
          let x = 0;
          let y = 0;
          const marginX = 40;
          const marginY = 40;

          // Calculate precise positioning
          if (numberPosition.includes('left')) {
            x = marginX;
          } else if (numberPosition.includes('right')) {
            x = width - textWidth - marginX;
          } else {
            // center
            x = (width / 2) - (textWidth / 2);
          }

          if (numberPosition.includes('top')) {
            y = height - marginY;
          } else {
            y = marginY;
          }

          page.drawText(pStr, {
            x,
            y,
            size: numberSize,
            font: font,
            color: rgb(r, g, b),
          });
        });

        outputBytes = await srcPdf.save();
        outName = 'numbered_taco.pdf';

      } else if (tool.id === 'sign') {
        if (placedSignatures.length === 0 && !signatureData) {
          throw new Error(t('error.draw_signature') || 'Please draw or upload a signature first.');
        }
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({ status: 'processing', progress: 50, message: t('progress.stamping_signature') });
        
        // Helper to embed and get scaled dims relative to page size
        const embedSignature = async (dataUrl, scale, page) => {
          const sigDataClean = dataUrl.split(',')[1];
          const signatureImage = await srcPdf.embedPng(Uint8Array.from(atob(sigDataClean), c => c.charCodeAt(0)));
          const pWidth = page.getWidth();
          const targetWidth = pWidth * 0.30 * scale; // exactly 30% of page width * scale (matching UI)
          const scaleFactor = targetWidth / signatureImage.width;
          const dims = signatureImage.scale(scaleFactor);
          return { signatureImage, dims };
        };

        const pages = srcPdf.getPages();

        if (placedSignatures.length > 0) {
          // New flow: Multiple placed signatures
          for (const sig of placedSignatures) {
             const targetIndex = Math.max(0, Math.min(pages.length - 1, sig.page - 1));
             const page = pages[targetIndex];
             const { signatureImage, dims } = await embedSignature(sig.data, sig.scale, page);
             const pWidth = page.getWidth();
             const pHeight = page.getHeight();
             
             const x = (sig.x * pWidth) - (dims.width / 2);
             const y = pHeight - (sig.y * pHeight) - (dims.height / 2);
             
             page.drawImage(signatureImage, { x, y, width: dims.width, height: dims.height });
          }
        } else {
          // Legacy flow fallback (single signature dragged)
          const applySig = async (page) => {
            const { signatureImage, dims } = await embedSignature(signatureData, signatureScale, page);
            const pWidth = page.getWidth();
            const pHeight = page.getHeight();
            let x = 0; let y = 0;
            if (signOverlayRef.current && signPreviewPage) {
              const containerBounds = signOverlayRef.current.getBoundingClientRect();
              x = (signDragPos.x / containerBounds.width) * pWidth;
              const fromTopY = (signDragPos.y / containerBounds.height) * pHeight;
              y = pHeight - fromTopY - dims.height;
            } else {
              x = (pWidth - dims.width) / 2;
              y = 50;
            }
            page.drawImage(signatureImage, { x, y, width: dims.width, height: dims.height });
          };
          if (applyToAllPages) {
            for (const page of pages) { await applySig(page); }
          } else {
            const targetIndex = Math.max(0, Math.min(pages.length - 1, signTargetPage - 1));
            await applySig(pages[targetIndex]);
          }
        }

        outputBytes = await srcPdf.save();
        outName = 'signed_taco.pdf';

      } else if (tool.id === 'html-to-pdf') {
        setProcessingState({ status: 'processing', progress: 30, message: t('progress.rendering_html') || 'Rendering HTML view...' });
        
        const element = document.getElementById('html-to-pdf-render-target');
        if (!element) throw new Error('Render target not found');

        // Capture the DOM element safely by sanitizing modern CSS colors (oklab/oklch) that html2canvas doesn't support
        const canvas = await html2canvas(element, {
          scale: 2, // High resolution
          useCORS: true,
          logging: false,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          onclone: (clonedDoc) => {
            // Remove external stylesheets and sanitize style tags to avoid oklab/oklch parsing errors
            const styleTags = clonedDoc.querySelectorAll('style');
            styleTags.forEach((style) => {
              if (style.textContent) {
                style.textContent = style.textContent
                  .replace(/oklab\([^)]+\)/gi, '#000000')
                  .replace(/oklch\([^)]+\)/gi, '#000000');
              }
            });

            const linkTags = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
            linkTags.forEach((link) => link.remove());

            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const styleAttr = el.getAttribute('style');
              if (styleAttr && (styleAttr.includes('oklab') || styleAttr.includes('oklch'))) {
                el.setAttribute(
                  'style',
                  styleAttr
                    .replace(/oklab\([^)]+\)/gi, '#000000')
                    .replace(/oklch\([^)]+\)/gi, '#000000')
                );
              }
            });

            const target = clonedDoc.getElementById('html-to-pdf-render-target');
            if (target) {
              target.style.transform = 'none';
              target.style.marginBottom = '0px';
            }
          }
        });

        setProcessingState({ status: 'processing', progress: 70, message: t('progress.converting_pdf') || 'Converting to PDF format...' });
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;

        // Additional pages if content overflows
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        outputBytes = pdf.output('arraybuffer');
        outName = 'html_rendered_taco.pdf';

      } else {
        throw new Error(t('error.unrecognized_tool'));
      }

      if (customFileName.trim()) {
        let name = customFileName.trim();
        const lastDot = outName.lastIndexOf('.');
        const originalExt = lastDot !== -1 ? outName.substring(lastDot).toLowerCase() : '.pdf';
        if (!name.toLowerCase().endsWith(originalExt)) name += originalExt;
        outName = name;
      }

      const lastDot = outName.lastIndexOf('.');
      const ext = lastDot !== -1 ? outName.substring(lastDot).toLowerCase() : '.pdf';
      let mimeType = 'application/pdf';
      if (ext === '.zip') mimeType = 'application/zip';
      else if (ext === '.png') mimeType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';

      const blob = new Blob([outputBytes], { type: mimeType });
      const dlUrl = URL.createObjectURL(blob);

      setProcessingState({
        status: 'success',
        progress: 100,
        message: customSuccessMessage || (t(`progress.success.${tool.id}`) || t('progress.success')),
        downloadUrl: dlUrl,
        outputFileName: outName,
      });

      setNeedsGlobalPassword(false);
      setGlobalUnlockPassword('');

    } catch (err: any) {
      let errorMsg = err.message || t('error.general_processing');
      
      if (errorMsg === 'ENCRYPTED_PDF_NEEDS_PASSWORD') {
        // Silently stop processing, the UI will show the prompt.
        setProcessingState({ status: 'idle', progress: 0, message: '' });
        return;
      }
      if (errorMsg.includes('Incorrect password')) {
        errorMsg = t('error.incorrect_password');
      } else if (errorMsg.includes('PDFDocument.load') && errorMsg.includes('encrypted')) {
        // Trigger translation for encrypted PDF error
        errorMsg = t('error.pdf_encrypted');
      }

      setProcessingState({
        status: 'error',
        progress: 0,
        message: errorMsg,
      });
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">

      <div className={`flex ${tool.id === 'sign' && uploadedFiles.length > 0 ? 'flex-col-reverse' : 'flex-col'} lg:grid lg:grid-cols-12 gap-8 items-start`}>
        <div className="lg:col-span-7 space-y-6">
          {tool.id === 'html-to-pdf' ? (
            /* HTML Editor Block */
            <div className="bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-on-surface">{t('workspace.html.title')}</label>
                <select
                  value={htmlTemplate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHtmlTemplate(val);
                    if (val === 'invoice') {
                      setHtmlContent(`<h1>INVOICE #9201</h1>\n<p>Date: July 18, 2026</p>\n<p>From: TacoPDF Local Builder</p>\n<p>-------------------------</p>\n<p>1x Enterprise PDF License - $0.00</p>\n<p>Total: $0.00 (Free & Private)</p>`);
                    } else if (val === 'letter') {
                      setHtmlContent(`<h1>Professional Memorandum</h1>\n<p>To: Valued User</p>\n<p>From: The TacoPDF Team</p>\n<p>Subject: Zero-Upload Local Browser Encryption</p>\n<p>Dear Customer, your details are fully secured because this document layer is compiled strictly locally using JavaScript memory inside your browser. No files are uploaded.</p>`);
                    } else {
                      setHtmlContent(`<h1>My Document</h1>\n<p>This is a fast local PDF generated completely in my browser.</p>\n<p>It is encrypted and kept private locally.</p>`);
                    }
                  }}
                  className="bg-surface-container-low border border-outline-variant text-xs text-primary rounded px-2.5 py-1.5 focus:border-primary-container focus:outline-none"
                >
                  <option value="blank">{t('workspace.html.blank')}</option>
                  <option value="invoice">{t('workspace.html.invoice')}</option>
                  <option value="letter">{t('workspace.html.letter')}</option>
                </select>
              </div>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={8}
                className="w-full bg-background border border-outline-variant rounded-lg p-4 font-mono text-xs text-on-surface focus:border-primary-container focus:outline-none leading-relaxed"
                placeholder={t('workspace.html.placeholder')}
              />
              <div className="border border-outline-variant rounded-lg overflow-hidden bg-surface-container-lowest mt-4">
                 <div className="bg-surface-container-high px-4 py-2 border-b border-outline-variant text-xs font-bold text-on-surface-variant flex items-center gap-2">
                   <LucideIcon name="Eye" size={14} /> {t('workspace.preview.live') || 'Live Preview'}
                 </div>
                 <div className="overflow-x-auto p-4 bg-gray-100/50 dark:bg-black/20 flex justify-center max-h-[500px]">
                    <div 
                      id="html-to-pdf-render-target"
                      className="bg-white text-black shadow-sm ring-1 ring-gray-900/5"
                      style={{ 
                        width: '794px', 
                        minHeight: '1123px', 
                        padding: '40px',
                        transform: 'scale(0.8)',
                        transformOrigin: 'top center',
                        marginBottom: '-220px' // offset the scale height reduction
                      }}
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                 </div>
              </div>
            </div>
          ) : (
            /* Standard Upload DropZone */
            <div className="space-y-4">
              {(tool.id === 'add-watermark' || tool.id === 'add-page-numbers') && uploadedFiles.length > 0 && !uploadedFiles.some(f => lockedFileIds.has(f.id)) ? (
                <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col mb-6">
                  <div className="flex justify-between items-center px-4 py-3 bg-surface-container-high border-b border-outline-variant shrink-0">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                        <LucideIcon name="Eye" size={16} className="text-primary" /> 
                        {t('workspace.preview.live') || 'Live Preview'}
                      </span>
                      {uploadedFiles.length > 0 && lockedFileIds.has(uploadedFiles[0].id) && (
                        <div id="locked-warning-box" className="hidden sm:flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs font-bold">
                          <LucideIcon name="AlertCircle" size={14} />
                          {t('file.locked.notice') || 'File encrypted'}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFile(uploadedFiles[0].id); }}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
                    >
                      <LucideIcon name="Trash2" size={14} /> {t('workspace.file.remove') || 'Remove PDF'}
                    </button>
                  </div>
                  {uploadedFiles.length > 0 && lockedFileIds.has(uploadedFiles[0].id) && (
                    <div id="locked-warning-box-mobile" className="sm:hidden px-4 py-3 bg-red-500/5 border-b border-outline-variant">
                      <div className="flex items-start gap-1.5 text-red-500">
                        <LucideIcon name="AlertCircle" size={14} className="shrink-0 mt-0.5" />
                        <p className="text-xs leading-relaxed font-medium">
                          {t('file.locked.notice', 'File ini tersandi. Gunakan alat "Buka Kunci PDF" terlebih dahulu.')}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="p-4 md:p-8 bg-surface-container-lowest flex justify-center items-center min-h-[400px] relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(var(--tw-colors-outline-variant) 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                    {isGeneratingThumbnails ? (
                      <div className="flex flex-col items-center text-on-surface-variant">
                        <LucideIcon name="Loader" className="animate-spin mb-2" size={24} />
                        <span className="text-xs font-medium">Generating Preview...</span>
                      </div>
                    ) : visualThumbnails.length > 0 ? (
                      <div className="flex justify-center items-center max-w-full">
                        {tool.id === 'add-watermark' ? (
                          <WatermarkPreview 
                            thumbnailUrl={visualThumbnails[0]}
                            text={watermarkText}
                            size={watermarkSize}
                            color={watermarkColor}
                            opacity={watermarkOpacity}
                            rotation={watermarkRotation}
                            pdfWidth={thumbnailNativeSize.w}
                          />
                        ) : (
                          <div className="relative inline-block max-w-full shadow-lg border border-outline-variant/30 bg-white" style={{ maxHeight: '600px' }}>
                            <img 
                              src={visualThumbnails[0]} 
                              alt="PDF Preview" 
                              className="max-w-full max-h-[600px] object-contain block"
                            />
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              {tool.id === 'add-page-numbers' && (
                                <div 
                                  className="whitespace-nowrap font-bold absolute"
                                  style={{
                                    color: numberColor,
                                    fontSize: `${numberSize}px`,
                                    left: numberPosition.includes('left') ? '40px' : (numberPosition.includes('right') ? 'auto' : '50%'),
                                    right: numberPosition.includes('right') ? '40px' : 'auto',
                                    top: numberPosition.includes('top') ? '40px' : 'auto',
                                    bottom: numberPosition.includes('top') ? 'auto' : '40px',
                                    transform: (!numberPosition.includes('left') && !numberPosition.includes('right')) ? 'translateX(-50%)' : 'none'
                                  }}
                                >
                                  {(() => {
                                    const p1Str = (t('tool.page_num.format_2') || 'Page 1').replace('1', '');
                                    const pOfStr = (t('tool.page_num.format_3') || '1 of 10').replace('1', '').replace('10', '').trim();
                                    let pStr = numberFormat.replace('{n}', '1').replace('{total}', pdfPageCount.toString());
                                    if (numberFormat.includes('Page ')) pStr = pStr.replace('Page ', p1Str.trim() + ' ');
                                    if (numberFormat.includes(' of ')) pStr = pStr.replace(' of ', ' ' + pOfStr + ' ');
                                    return pStr;
                                  })()}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-red-500 font-medium">Preview generation failed.</span>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 py-6 md:p-10 mx-auto w-[92%] sm:w-[85%] md:w-full flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragActive 
                    ? 'border-primary-container bg-surface-container' 
                    : 'border-outline-variant bg-surface-container/40'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple={tool.id === 'merge' || tool.id === 'image-to-pdf'}
                  accept={tool.id === 'image-to-pdf' ? "image/*" : ".pdf"}
                />
                <LucideIcon name="UploadCloud" size={48} className="text-primary-container mb-2 md:mb-4 scale-75 md:scale-100 mx-auto" />
                <p className="text-base md:text-lg font-bold text-on-surface mb-1 md:mb-2">{t('workspace.drop.title')}</p>
                <p className="text-xs md:text-sm text-on-surface-variant">
                  {tool.id === 'image-to-pdf' ? t('workspace.drop.support_img') : t('workspace.drop.support_pdf')}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="mt-3 md:mt-6 mx-auto px-5 py-2 md:px-6 md:py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-[10px] md:text-xs"
                >
                  {t('workspace.drop.browse')}
                </button>
              </div>

              <AnimatePresence>
                {uploadedFiles.length > 0 && (
                  <>
                    {['merge', 'image-to-pdf'].includes(tool.id) && uploadedFiles.some(f => lockedFileIds.has(f.id)) && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 px-4 py-3 bg-red-500/10 border border-red-500/50 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse"
                      >
                        <div className="flex items-start gap-2 text-red-500">
                          <LucideIcon name="AlertTriangle" size={18} className="shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed font-medium">
                            {t('file.locked.notice') || 'File encrypted. Please decrypt it using the Unlock PDF tool first.'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                    <motion.div 
                      id="file-list-container"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={(tool.id === 'merge' || tool.id === 'image-to-pdf') ? "scroll-mt-28 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6" : "scroll-mt-28 grid grid-cols-1 gap-3 mt-6"}
                    >
                    {uploadedFiles.map((file, i) => {
                      const isLocked = lockedFileIds.has(file.id);
                      
                      if (tool.id === 'merge' || tool.id === 'image-to-pdf') {
                        // Merge or Image-to-PDF Tool Visual Grid Item
                        return (
                          <div 
                            key={file.id}
                            draggable={!isLocked}
                            onDragStart={(e) => handleCardDragStart(e, file.id)}
                            onDragEnd={handleCardDragEnd}
                            onDragOver={(e) => handleCardDragOver(e, file.id)}
                            onDrop={(e) => handleCardDrop(e, file.id)}
                            className={`group relative flex flex-col items-center bg-surface-container-lowest border rounded-xl overflow-hidden transition-all ${isLocked ? 'border-red-500/30' : 'border-outline-variant hover:border-primary/50 cursor-move'} ${dragOverFileId === file.id ? 'scale-105 border-primary shadow-lg ring-2 ring-primary/50 ring-offset-2 ring-offset-surface' : ''}`}
                          >
                            <div className="w-full aspect-[1/1.4] bg-surface-container flex items-center justify-center relative overflow-hidden">
                              {fileThumbnails[file.id] ? (
                                <img src={fileThumbnails[file.id]} alt={file.file.name} className="w-full h-full object-contain pointer-events-none" />
                              ) : (
                                <div className="flex flex-col items-center gap-2 text-on-surface-variant opacity-50">
                                  {isLocked ? <LucideIcon name="Lock" size={32} className="text-red-500" /> : <LucideIcon name="FileText" size={32} />}
                                </div>
                              )}
                              
                              <div className="absolute top-2 left-2 bg-surface-container-high/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold shadow-sm border border-outline-variant/30">
                                {i + 1}
                              </div>
                              
                                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                  {!isLocked && (
                                    <button
                                      title={t('workspace.file.preview') || 'Preview File'}
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        const bytes = await file.file.arrayBuffer();
                                        const blob = new Blob([bytes], { type: file.file.type || 'application/pdf' });
                                        const url = URL.createObjectURL(blob);
                                        setPreviewFileUrl(url);
                                        setPreviewFileName(file.file.name);
                                      }}
                                      className="p-1.5 bg-primary-container/90 hover:bg-primary-container text-on-primary-container rounded-lg transition-colors backdrop-blur-sm shadow-sm"
                                    >
                                      <LucideIcon name="Eye" size={14} />
                                    </button>
                                  )}
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="p-1.5 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors backdrop-blur-sm shadow-sm"
                                  >
                                    <LucideIcon name="X" size={14} />
                                  </button>
                                </div>
                            </div>
                            
                            <div className="w-full p-2 text-center border-t border-outline-variant/30 bg-surface-container-low flex flex-col justify-center min-h-[50px]">
                              <p className="text-[11px] font-semibold text-on-surface truncate w-full px-1" title={file.file.name}>{file.file.name}</p>
                              {isLocked && <p className="text-[9px] text-red-500 font-bold">{t('file.locked') || 'Locked'}</p>}
                            </div>
                          </div>
                        );
                      }

                      // Default Vertical List Item (for all other tools)
                      return (
                        <div key={file.id}>
                          <div className={`flex items-center gap-3 p-3 border rounded-xl group transition-colors ${isLocked ? 'bg-red-500/5 border-red-500/30' : 'bg-surface-container-low border-outline-variant hover:border-primary/30'}`}>
                            <div className={`p-2 rounded-lg ${isLocked ? 'bg-red-500/20 text-red-500' : 'bg-primary-container/20 text-primary'}`}>
                              <LucideIcon name={isLocked ? 'Lock' : 'File'} size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-on-surface truncate" title={file.file.name}>{file.file.name}</p>
                              <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                                {formatBytes(file.file.size)}
                                {isLocked && <span className="text-red-500 font-bold">🔒 {t('file.locked') || 'Locked'}</span>}
                              </p>
                            </div>
                            <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              {/* Eye button -> preview PDF */}
                              {file.type === 'application/pdf' && !isLocked && (
                                <button
                                  title={t('workspace.file.preview') || 'Preview File'}
                                  onClick={async () => {
                                    const bytes = await file.file.arrayBuffer();
                                    const blob = new Blob([bytes], { type: file.file.type || 'application/pdf' });
                                    const url = URL.createObjectURL(blob);
                                    setPreviewFileUrl(url);
                                    setPreviewFileName(file.file.name);
                                  }}
                                  className="p-1.5 hover:bg-primary-container/20 rounded-lg text-primary-container transition-colors"
                                >
                                  <LucideIcon name="Eye" size={15} />
                                </button>
                              )}
                              {uploadedFiles.length > 1 && i > 0 && (
                                <button onClick={() => {
                                  const newFiles = [...uploadedFiles];
                                  [newFiles[i-1], newFiles[i]] = [newFiles[i], newFiles[i-1]];
                                  setUploadedFiles(newFiles); // Changed this to setUploadedFiles directly instead of addFiles!
                                }} className="p-1.5 hover:bg-surface-variant rounded-lg text-on-surface-variant">
                                  <LucideIcon name="ArrowUp" size={15} />
                                </button>
                              )}
                              {((tool.id !== 'merge' && tool.id !== 'image-to-pdf' && tool.id !== 'html-to-pdf' && tool.id !== 'sign') || 
                              ((tool.id === 'merge' || tool.id === 'image-to-pdf') && uploadedFiles.length >= 1)) && (
                                <button onClick={() => removeFile(file.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-400">
                                  <LucideIcon name="X" size={15} />
                                </button>
                              )}
                            </div>
                          </div>
                          {isLocked && tool.id !== 'unlock' && (
                            <div className="mt-1 mx-1 px-3 py-2 bg-red-500/10 border border-red-500/50 rounded-lg shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                              <div className="flex items-start gap-1.5 text-red-500">
                                <LucideIcon name="AlertTriangle" size={14} className="shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed font-medium">
                                  {t('file.locked.notice') || 'File encrypted. Please decrypt it using the Unlock PDF tool first.'}
                                </p>
                              </div>
                            </div>
                          )}
                          {!isLocked && tool.id === 'unlock' && (
                            <div className="mt-1 mx-1 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                              <div className="flex items-start gap-1.5 text-red-500">
                                <LucideIcon name="AlertCircle" size={14} className="shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed font-medium">
                                  {t('file.not_locked.notice', 'File ini tidak bersandi dan tidak dapat diproses.')}
                                </p>
                              </div>
                            </div>
                          )}
                          {isLocked && tool.id === 'unlock' && (
                            <div className="mt-1 mx-1 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <div className="flex items-start gap-1.5 text-green-600 dark:text-green-400">
                                <LucideIcon name="ShieldCheck" size={14} className="shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed font-medium">
                                  {t('file.ready_unlock.notice', 'File bersandi terdeteksi. Siap untuk diproses.')}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                  </>
                )}
              </AnimatePresence>
              </>
              )}

              {['delete-pages', 'rotate', 'reorder', 'split', 'extract-pages', 'pdf-to-image'].includes(tool.id) && uploadedFiles.length > 0 && (
                <div id="visual-grid-container" className="scroll-mt-28">
                  <VisualGrid 
                  toolId={tool.id}
                  thumbnails={visualThumbnails}
                  isGenerating={isGeneratingThumbnails}
                  pagesToDelete={pagesToDelete}
                  setPagesToDelete={setPagesToDelete}
                  pagesToExtract={pagesToExtract}
                  setPagesToExtract={setPagesToExtract}
                  extractMode={extractMode}
                  onToggleExtract={tool.id === 'extract-pages' ? handleExtractToggle : undefined}
                  pageRotations={pageRotations}
                  setPageRotations={setPageRotations}
                  pageOrder={pageOrder}
                  setPageOrder={setPageOrder}
                />
                </div>
              )}

              {tool.id === 'redact' && uploadedFiles.length > 0 && !uploadedFiles.some(f => lockedFileIds.has(f.id)) && (
                <div id="redact-container" className="mt-6 space-y-6 scroll-mt-28">
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-sm flex gap-3 shadow-sm">
                    <LucideIcon name="AlertCircle" className="shrink-0 mt-0.5 text-amber-500" size={20} />
                    <div>
                      <p className="font-bold text-on-surface mb-1">{t('tool.redact.tip.title') || 'PERMANENT CENSOR'}</p>
                      <p className="text-on-surface-variant text-xs leading-relaxed">{t('tool.redact.tip.desc') || 'Draw black rectangles over sensitive text or images to permanently censor them. The text data behind it will be removed.'}</p>
                    </div>
                  </div>

                  

                  {!isGeneratingThumbnails && visualThumbnails.length > 0 ? (
                    <div className="flex flex-col gap-8 items-center bg-surface-container-lowest border border-outline-variant rounded-xl p-4 sm:p-8 max-h-[70vh] overflow-y-auto overflow-x-auto">
                      {visualThumbnails.map((thumb, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <div key={pageNum} className="flex flex-col items-center gap-3 w-full max-w-2xl">
                            <div className="flex items-center justify-between w-full px-2">
                              <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">Page {pageNum}</span>
                              <button 
                                onClick={() => setRedactBoxes(prev => prev.filter(b => b.pageNum !== pageNum))}
                                className="text-xs text-red-500 font-medium hover:underline"
                              >
                                    {t('tool.redact.clear_page') || 'Clear Page'}
                                  </button>
                            </div>
                            
                            <div className="relative w-full">
                                {activeRedactPage !== pageNum && (
                                  <div 
                                    className="absolute inset-0 bg-white/40 z-20 flex items-center justify-center cursor-pointer backdrop-blur-[1px] transition-all hover:bg-white/20"
                                    onClick={() => setActiveRedactPage(pageNum)}
                                  >
                                    <div className="bg-surface shadow-lg text-on-surface text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none">
                                      <LucideIcon name="PenTool" size={16} /> {t('tool.redact.edit_page') || 'Edit Page'}
                                    </div>
                                  </div>
                                )}
                                <div 
                                  id={`redact-page-${pageNum}`}
                                  className="relative border shadow-md bg-white w-full overflow-hidden cursor-crosshair select-none"
                                  style={{ touchAction: 'none' }}
                                  onMouseDown={(e) => handleRedactStart(e, pageNum)}
                                  onMouseMove={handleRedactMove}
                                  onMouseUp={handleRedactEnd}
                                  onMouseLeave={handleRedactEnd}
                                  onTouchStart={(e) => handleRedactStart(e, pageNum)}
                                  onTouchMove={handleRedactMove}
                                  onTouchEnd={handleRedactEnd}
                                  onTouchCancel={handleRedactEnd}
                                >
                                  <img src={thumb} className="w-full h-auto pointer-events-none" draggable={false} />
                                  
                                  {/* Render Placed Redaction Boxes */}
                                  {redactBoxes.filter(b => b.pageNum === pageNum).map(box => (
                                    <DraggableRedactBox 
                                      key={box.id}
                                      box={box}
                                      containerId={`redact-page-${pageNum}`}
                                      onUpdate={updateRedactBox}
                                      onRemove={(id) => setRedactBoxes(prev => prev.filter(b => b.id !== id))}
                                      onDuplicate={handleDuplicateBox}
                                    />
                                  ))}
    
                                  {/* Render Drawing Box */}
                                  {drawingBox && drawingBox.pageNum === pageNum && (
                                    <div 
                                      className="absolute bg-black/50 border-2 border-black z-30 pointer-events-none"
                                      style={{
                                        left: Math.min(drawingBox.startX, drawingBox.currentX),
                                        top: Math.min(drawingBox.startY, drawingBox.currentY),
                                        width: Math.abs(drawingBox.currentX - drawingBox.startX),
                                        height: Math.abs(drawingBox.currentY - drawingBox.startY),
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 border border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
                      <LucideIcon name="Loader2" className="animate-spin text-primary mb-3" size={32} />
                      <p className="text-sm font-bold text-on-surface">Rendering Document...</p>
                      <p className="text-xs text-on-surface-variant mt-1">Preparing high quality preview pages</p>
                    </div>
                  )}
                </div>
              )}

              {tool.id === 'sign' && uploadedFiles.length > 0 && !uploadedFiles.some(f => lockedFileIds.has(f.id)) && (
                <div className="mt-6 space-y-6">
                  <div className="bg-primary-container/10 border border-primary-container/30 p-4 rounded-xl text-sm flex gap-3 shadow-sm">
                    <LucideIcon name="Info" className="shrink-0 mt-0.5 text-primary-container" size={20} />
                    <div>
                      <p className="font-bold text-on-surface mb-1">{t('tool.sign.instruction') || 'WYSIWYG Signature Editor'}</p>
                      <p className="text-on-surface-variant text-xs leading-relaxed">{t('tool.sign.editor_desc') || 'Scroll through your document below. Click "Add Signature" on any page to drop your signature. Drag it to your desired position.'}</p>
                    </div>
                  </div>

                  <div id="signature-pad-container" className="space-y-4 scroll-mt-28">
                    {/* MOBILE ONLY RUN BUTTON */}
                    <div className="lg:hidden w-full mb-4">
                      {processingState.status !== 'processing' && processingState.status !== 'success' && (
                        <button
                          onClick={handleProcess}
                          disabled={(uploadedFiles.length === 0) || (uploadedFiles.some(f => lockedFileIds.has(f.id)))}
                          className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-3.5 px-4 rounded-lg shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <TacoIcon name={tool.icon} size={24} />
                          {`${t('workspace.btn.run')} ${t(`tool_name.sign`, tool.name)}`}
                        </button>
                      )}
                    </div>
                    <SignaturePad onSave={setSignatureData} />
                  </div>

                  {!isGeneratingThumbnails && visualThumbnails.length > 0 ? (
                    <div className="flex flex-col gap-8 items-center bg-surface-container-lowest border border-outline-variant rounded-xl p-4 sm:p-8 max-h-[70vh] overflow-y-auto">
                      {visualThumbnails.map((thumb, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <div key={pageNum} className="flex flex-col items-center gap-3 w-full max-w-2xl">
                            <div className="flex items-center justify-between w-full px-2">
                              <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">Page {pageNum}</span>
                              {signatureData && (
                                <button
                                  onClick={() => handleAddSignatureToSpecificPage(pageNum)}
                                  className="text-xs font-bold bg-primary hover:bg-primary/90 text-on-primary px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                  <LucideIcon name="Plus" size={14} /> {t('tool.sign.add_btn') || 'Add Signature'}
                                </button>
                              )}
                            </div>
                            
                            <div id={`page-container-${pageNum}`} className="relative border shadow-md bg-white w-full overflow-hidden flex">
                              <img src={thumb} className="w-full h-auto pointer-events-none" />
                              
                              {placedSignatures.filter(s => s.page === pageNum).map(sig => (
                                <DraggablePlacedSignature 
                                  key={sig.id} 
                                  sig={sig} 
                                  containerId={`page-container-${pageNum}`}
                                  onUpdate={updateSignature}
                                  onRemove={removeSignature}
                                  onDuplicate={(signatureToCopy) => {
                                    setPlacedSignatures(prev => [...prev, {
                                      ...signatureToCopy,
                                      id: Math.random().toString(36).substring(7),
                                      x: Math.min(0.9, signatureToCopy.x + 0.05),
                                      y: Math.min(0.9, signatureToCopy.y + 0.05),
                                    }]);
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 border border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
                      <LucideIcon name="Loader2" className="animate-spin text-primary mb-3" size={32} />
                      <p className="text-sm font-bold text-on-surface">Rendering Document...</p>
                      <p className="text-xs text-on-surface-variant mt-1">Preparing high quality preview pages</p>
                    </div>
                  )}

                  {placedSignatures.length > 0 && (
                    <div className="mt-4 bg-surface-container-low border border-outline-variant p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-bold text-on-surface">{t('workspace.sign.placed', 'Signatures Placed')} ({placedSignatures.length})</h4>
                        <button onClick={() => setPlacedSignatures([])} className="text-xs text-red-500 font-medium hover:underline">{t('workspace.sign.clear', 'Clear All')}</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {placedSignatures.map(sig => (
                          <div key={sig.id} className="flex items-center gap-2 bg-primary-container text-on-primary-container px-3 py-1.5 rounded-full text-xs shadow-sm">
                            <span className="font-bold">{t('workspace.sign.page', 'Pg')} {sig.page}</span>
                            <button onClick={() => removeSignature(sig.id)} className="opacity-70 hover:opacity-100 hover:text-red-500 transition-colors"><LucideIcon name="X" size={14}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-5 space-y-6 w-full overflow-hidden">
          <div id="tool-config-container" className="bg-surface-container-low border border-outline-variant rounded-2xl p-4 sm:p-6 shadow-sm sticky top-24 w-full overflow-hidden box-border scroll-mt-28">
            <h3 className="font-bold text-lg text-on-surface flex items-center gap-2 mb-4 border-b border-outline-variant pb-4">
              <LucideIcon name="Settings" className="text-primary-container" size={20} />
              {t('workspace.options') || 'Options & Instructions'}
            </h3>

            <div className="mb-6 space-y-3 p-4 bg-primary-container/10 border border-primary-container/20 rounded-xl">
              <h4 className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide">
                {t(`tool.${tool.id}.tip.title`) || '✨ INFO'}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                {t(`tool.${tool.id}.tip.desc`) || 'Silakan sesuaikan pengaturan di bawah lalu jalankan proses.'}
              </p>
            </div>
            
            {tool.id === 'extract-pages' && uploadedFiles.length > 0 && (
              <div className="mb-6 bg-surface-container p-4 rounded-xl border border-outline-variant shadow-sm flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="extractMerge"
                  className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary border-outline-variant bg-surface cursor-pointer"
                  checked={extractMerge} 
                  onChange={(e) => setExtractMerge(e.target.checked)} 
                />
                <label htmlFor="extractMerge" className="text-sm font-bold text-on-surface cursor-pointer select-none leading-relaxed">
                  {t('tool.extract.merge_option') || 'Merge extracted pages in one PDF file'}
                </label>
              </div>
            )}
              {tool.id === 'protect' && (
                <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-on-surface">{t('tool.protect.choose')}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={ownerPassword}
                        onChange={(e) => setOwnerPassword(e.target.value)}
                        className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2 pr-10 text-sm text-on-surface focus:border-primary-container focus:outline-none"
                        placeholder={t('tool.protect.placeholder') || "Password"}
                      />
                      <button 
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showPassword ? <LucideIcon name="EyeOff" size={16} /> : <LucideIcon name="Eye" size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {tool.id === 'unlock' && (
                <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-on-surface">{t('tool.unlock.type')}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2 pr-10 text-sm text-on-surface focus:border-primary-container focus:outline-none"
                        placeholder={t('tool.unlock.placeholder') || "Password"}
                      />
                      <button 
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showPassword ? <LucideIcon name="EyeOff" size={16} /> : <LucideIcon name="Eye" size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {tool.id === 'add-watermark' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-on-surface">{t('tool.watermark.text') || 'Watermark Text'}</label>
                      <button 
                        onClick={() => {
                          setWatermarkText('CONFIDENTIAL');
                          setWatermarkSize(48);
                          setWatermarkOpacity(0.4);
                          setWatermarkRotation(45);
                          setWatermarkColor('#EF4444');
                        }}
                        className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full"
                      >
                        <LucideIcon name="RotateCcw" size={10} />
                        {t('tool.watermark.reset') || 'Reset'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary-container focus:outline-none"
                      placeholder={t('tool.watermark.placeholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface flex justify-between">
                      <span>{t('tool.watermark.size') || 'Text Size'}</span>
                      <span className="text-primary font-mono">{watermarkSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="144"
                      value={watermarkSize}
                      onChange={(e) => setWatermarkSize(Number(e.target.value))}
                      className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface flex justify-between">
                      <span>{t('tool.watermark.opacity') || 'Opacity'}</span>
                      <span className="text-primary font-mono">{Math.round(watermarkOpacity * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface flex justify-between">
                      <span>{t('tool.watermark.rotation') || 'Rotation'}</span>
                      <span className="text-primary font-mono">{watermarkRotation}°</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={watermarkRotation}
                      onChange={(e) => setWatermarkRotation(Number(e.target.value))}
                      className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">{t('tool.watermark.color') || 'Color'}</label>
                    <div className="flex flex-wrap items-center gap-3">
                      {['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#6B7280', '#000000', '#FFFFFF'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setWatermarkColor(color)}
                          className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${watermarkColor === color ? 'border-primary scale-110 shadow-md ring-2 ring-primary/30' : 'border-outline-variant'} ${color === '#FFFFFF' ? 'bg-white shadow-sm' : ''}`}
                          style={{ backgroundColor: color !== '#FFFFFF' ? color : undefined }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                      <div className="relative ml-auto overflow-hidden rounded-lg w-10 h-10 border border-outline-variant shadow-sm hover:scale-105 transition-transform shrink-0">
                        <input
                          type="color"
                          value={watermarkColor}
                          onChange={(e) => setWatermarkColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                          title="Custom Color"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tool.id === 'add-page-numbers' && (
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Position */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="AlignJustify" size={14}/> {t('tool.page_num.pos') || 'Position'}</label>
                      <div className="relative">
                        <select
                          value={numberPosition}
                          onChange={(e) => setNumberPosition(e.target.value as any)}
                          className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium shadow-sm cursor-pointer hover:border-primary transition-colors"
                        >
                          <option value="top-left">{t('tool.page_num.top_left')}</option>
                          <option value="top-center">{t('tool.page_num.top_center')}</option>
                          <option value="top-right">{t('tool.page_num.top_right')}</option>
                          <option value="bottom-left">{t('tool.page_num.bottom_left')}</option>
                          <option value="bottom-center">{t('tool.page_num.bottom_center')}</option>
                          <option value="bottom-right">{t('tool.page_num.bottom_right')}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                          <LucideIcon name="ChevronDown" size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Format */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="Hash" size={14}/> {t('tool.page_num.format') || 'Format'}</label>
                      <div className="relative">
                        <select
                          value={numberFormat}
                          onChange={(e) => setNumberFormat(e.target.value)}
                          className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium shadow-sm cursor-pointer hover:border-primary transition-colors"
                        >
                          <option value="{n}">{t('tool.page_num.format_1')}</option>
                          <option value="Page {n}">{t('tool.page_num.format_2')}</option>
                          <option value="{n} of {total}">{(t('tool.page_num.format_3') || '').replace('10', pdfPageCount.toString())}</option>
                          <option value="Page {n} of {total}">{(t('tool.page_num.format_4') || '').replace('10', pdfPageCount.toString())}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                          <LucideIcon name="ChevronDown" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="Type" size={14}/> {t('tool.page_num.size') || 'Text Size'}</label>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{numberSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="48"
                      value={numberSize}
                      onChange={(e) => setNumberSize(Number(e.target.value))}
                      className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Color Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="Palette" size={14}/> {t('tool.page_num.color') || 'Text Color'}</label>
                    <div className="flex flex-wrap items-center gap-3">
                      {['#000000', '#6B7280', '#EF4444', '#3B82F6', '#10B981', '#F59E0B'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNumberColor(color)}
                          className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${numberColor === color ? 'border-primary scale-110 shadow-md ring-2 ring-primary/30' : 'border-outline-variant'} ${color === '#FFFFFF' ? 'bg-white shadow-sm' : ''}`}
                          style={{ backgroundColor: color !== '#FFFFFF' ? color : undefined }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                      <div className="relative overflow-hidden rounded-lg w-10 h-10 border border-outline-variant shadow-sm hover:scale-105 transition-transform shrink-0">
                        <input
                          type="color"
                          value={numberColor}
                          onChange={(e) => setNumberColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                          title="Custom Color"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}


              {tool.id === 'image-to-pdf' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">{t('tool.image.size')}</label>
                    <select
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value as any)}
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary-container focus:outline-none"
                    >
                      <option value="A4">{t('tool.image.a4') || "A4"}</option>
                      <option value="Letter">{t('tool.image.letter') || "Letter"}</option>
                      <option value="Fit">{t('tool.image.fit') || "Fit to Image"}</option>
                    </select>
                  </div>
                </div>
              )}
              {tool.id === 'pdf-to-image' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">Format</label>
                    <select
                      value={imageFormat}
                      onChange={(e) => setImageFormat(e.target.value as any)}
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary-container focus:outline-none"
                    >
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                    </select>
                    <p className="text-[10px] text-on-surface-variant/80 mt-2 leading-relaxed">
                      {t('tool.pdf-to-image.info') || 'If your PDF has multiple pages, they will be downloaded as a single ZIP file containing all images.'}
                    </p>
                  </div>
                </div>
              )}

               
               <div className="mt-8 space-y-4">
                {processingState.status === 'error' && (
                 <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3">
                   <LucideIcon name="AlertCircle" className="text-red-500 shrink-0 mt-0.5" size={18} />
                   <div>
                     <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">{t('error.processing_failed') || "Error"}</h4>
                     <p className="text-xs text-red-600/80 dark:text-red-400/80 leading-relaxed">{processingState.message}</p>
                   </div>
                 </div>
                )}
              {processingState.status === 'processing' && (
                <div className="bg-surface-container border border-outline-variant rounded-xl p-4 sm:p-6 shadow-sm mb-4 w-full overflow-hidden break-words box-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-on-surface flex items-center gap-2">
                      <LucideIcon name="Loader2" className="animate-spin text-primary" size={18} />
                      {t('workspace.processing') || "Processing Document..."}
                    </h4>
                    <span className="text-primary font-bold">{Math.round(processingState.progress)}%</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-2 mb-2 overflow-hidden">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${processingState.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-on-surface-variant text-center mt-2 animate-pulse">
                    {processingState.message}
                  </p>
                </div>
              )}

              {processingState.status === 'success' && processingState.downloadUrl && (
                <div id="success-box-container" className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 sm:p-6 shadow-sm text-center mb-4 w-full max-w-full overflow-hidden flex flex-col items-center break-words box-border scroll-mt-28">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-3 shrink-0">
                    <LucideIcon name="Check" size={24} />
                  </div>
                  <h4 className="font-bold text-on-surface mb-2 break-words w-full">
                    {(() => {
                      const successKey = `progress.success.${tool.id}`;
                      const successText = t(successKey);
                      if (successText && successText !== successKey) return successText;
                      const defaultText = t('progress.success.default');
                      if (defaultText && defaultText !== 'progress.success.default') return defaultText;
                      return "Task completed successfully!";
                    })()}
                  </h4>
                  {processingState.message && 
                   processingState.message !== t(`progress.success.${tool.id}`) && 
                   processingState.message !== t('progress.success') && 
                   processingState.message !== t('progress.success.default') && 
                   processingState.message !== 'Task completed successfully!' && (
                    <p className="text-sm font-medium text-green-700/90 mb-1 w-full break-words">
                      {processingState.message}
                    </p>
                  )}
                  <div className="mt-4 mb-2 flex flex-col items-center gap-1.5 w-full max-w-sm min-w-0">
                    <label className="text-xs text-on-surface-variant font-medium w-full text-center break-words">
                      {t('workspace.rename.title') || 'Rename Processed Output:'}
                    </label>
                    {(() => {
                      const fileName = processingState.outputFileName || 'document.pdf';
                      const lastDot = fileName.lastIndexOf('.');
                      const hasExt = lastDot !== -1;
                      const baseName = hasExt ? fileName.substring(0, lastDot) : fileName;
                      const ext = hasExt ? fileName.substring(lastDot) : '.pdf';
                      
                      return (
                        <div className="flex w-full items-center bg-background border border-outline-variant rounded-md overflow-hidden focus-within:border-primary transition-colors">
                          <input 
                            type="text"
                            value={baseName}
                            onChange={(e) => setProcessingState(prev => ({ ...prev, outputFileName: e.target.value + ext }))}
                            className="flex-1 bg-transparent px-3 py-2 text-sm text-on-surface focus:outline-none min-w-0"
                            placeholder={t('workspace.rename.placeholder') || 'Rename output file'}
                          />
                          <span className="text-sm text-on-surface-variant pr-2 select-none pointer-events-none shrink-0 hidden sm:inline-block">{ext}</span>
                          <button 
                            onClick={() => setProcessingState(prev => ({ ...prev, outputFileName: ext }))} 
                            className="p-2 text-on-surface-variant hover:text-error transition-colors shrink-0" 
                            title="Clear"
                          >
                            <LucideIcon name="X" size={14} />
                          </button>
                          <button 
                            onClick={() => {}} 
                            className="px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 font-medium text-sm transition-colors border-l border-outline-variant shrink-0"
                            title="Save"
                          >
                            Save
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                    <div className="flex flex-col gap-3 mt-5 w-full">
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                        {processingState.outputFileName && !processingState.outputFileName.endsWith('.zip') && !processingState.outputFileName.match(/\.(png|jpe?g)$/i) && (
                          <button
                            onClick={() => setShowPreview(true)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-variant hover:bg-surface-container-highest text-on-surface rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none min-w-[120px]"
                          >
                            <LucideIcon name="Eye" size={16} />
                            Preview
                          </button>
                        )}
                        <a 
                          href={processingState.downloadUrl}
                          download={processingState.outputFileName || 'document.pdf'}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-sm font-bold shadow-md transition-colors flex-1 sm:flex-none min-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          <LucideIcon name="Download" size={16} />
                          Download
                        </a>
                      </div>
                      
                      <div className="pt-4 mt-2 border-t border-[#132F1A]/10 flex justify-center w-full">
                        <button
                          onClick={() => {
                            setProcessingState({ status: 'idle', progress: 0, message: '' });
                            setUploadedFiles([]);
                            setTimeout(() => {
                              document.getElementById('workspace-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F9FAF8] hover:bg-[#EAECE8] dark:bg-[#1E1F1E] dark:hover:bg-[#2D2E2D] border border-outline-variant/30 text-on-surface rounded-lg text-sm font-medium transition-colors w-full shadow-sm"
                        >
                          <LucideIcon name="RotateCcw" size={16} />
                          {t('workspace.btn.another') || 'Process Another Document'}
                        </button>
                      </div>
                    </div>
                </div>
              )}

              {processingState.status !== 'processing' && processingState.status !== 'success' && (
                <button
                  onClick={handleProcess}
                  disabled={(uploadedFiles.length === 0 && tool.id !== 'html-to-pdf') || (tool.id === 'unlock' && uploadedFiles.some(f => !lockedFileIds.has(f.id))) || (tool.id !== 'unlock' && uploadedFiles.some(f => lockedFileIds.has(f.id)))}
                  className={`w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold py-3.5 px-4 rounded-lg shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${tool.id === 'sign' ? 'hidden lg:flex' : ''}`}
                >
                  <TacoIcon name={tool.icon} size={32} />
                  {tool.id === 'html-to-pdf' ? t('workspace.btn.compile') : tool.id === 'add-watermark' ? (t('workspace.btn.save_download') || 'Save & Download PDF') : `${t('workspace.btn.run')} ${t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}`}
                </button>
              )}

              <div className="mt-5 pt-4 border-t border-outline-variant/50 flex flex-col items-center justify-center gap-1.5 text-xs text-on-surface-variant text-center opacity-70">
                <div className="flex items-center justify-center gap-2 text-green-500 mb-1">
                  <LucideIcon name="ShieldCheck" size={16} />
                </div>
                <p className="max-w-[300px] leading-relaxed">
                  {t('tool.protect.safe', '💡 🔒 100% Safe & Offline: everything happens privately inside your browser.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Per-File Preview Modal */}
      {previewFileUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => { setPreviewFileUrl(null); }}>
          <div className="relative w-full max-w-4xl h-[90vh] bg-surface-container rounded-2xl overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <div className="flex items-center gap-3">
                <LucideIcon name="Eye" className="text-primary-container" size={20} />
                <h3 className="font-bold text-on-surface truncate max-w-[400px]">{previewFileName}</h3>
              </div>
              <button
                onClick={() => setPreviewFileUrl(null)}
                className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors"
              >
                <LucideIcon name="X" size={20} />
              </button>
            </div>
            <iframe
              src={previewFileUrl}
              className="flex-1 w-full bg-white"
              title={previewFileName}
            />
          </div>
        </div>
      )}

      {/* Server Rendered FAQ Section moved to page.tsx */}

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {showPreview && processingState.downloadUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-container border border-outline-variant w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl relative z-10"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant bg-surface-container-high">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 border border-primary/20 p-2 rounded text-primary">
                    <FileText size={18} />
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center bg-transparent border-b border-transparent hover:border-outline focus-within:border-primary transition-colors">
                      {(() => {
                        const fileName = processingState.outputFileName || 'document.pdf';
                        const lastDot = fileName.lastIndexOf('.');
                        const baseName = lastDot !== -1 ? fileName.substring(0, lastDot) : fileName;
                        const ext = lastDot !== -1 ? fileName.substring(lastDot) : '.pdf';
                        return (
                          <>
                            <input 
                              type="text"
                              value={baseName}
                              onChange={(e) => setProcessingState(prev => ({ ...prev, outputFileName: e.target.value + ext }))}
                              className="font-bold text-on-surface text-sm sm:text-base bg-transparent focus:outline-none px-1 py-0 truncate max-w-[150px] sm:max-w-[250px]"
                              placeholder="document"
                              title="Rename file"
                            />
                            <span className="text-sm sm:text-base font-bold text-on-surface select-none">{ext}</span>
                          </>
                        );
                      })()}
                    </div>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant px-1 mt-0.5">
                      {t('workspace.preview.live')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={processingState.downloadUrl}
                    download={processingState.outputFileName || 'document.pdf'}
                    className="bg-primary-container hover:bg-primary text-on-primary-container font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow"
                  >
                    <Download size={14} /> Download
                  </a>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-surface-container-highest rounded-full text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Body */}
              <div className="flex-1 bg-surface-container-low p-4 flex flex-col gap-4 relative overflow-y-auto">
                {isPreviewLocked ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shadow-inner">
                      <ShieldCheck size={32} className="text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-on-surface">This Document is Password Protected</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Please enter the owner password you specified to decrypt and view the document's pages locally.
                      </p>
                    </div>

                    <div className="w-full space-y-2">
                      <input
                        type="password"
                        value={previewPasswordInput}
                        onChange={(e) => setPreviewPasswordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleUnlockPreview();
                        }}
                        placeholder="Enter password"
                        className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-center text-sm text-on-surface focus:border-primary-container focus:outline-none font-mono"
                      />
                      {previewPasswordError && (
                        <p className="text-xs font-semibold text-red-400">{previewPasswordError}</p>
                      )}
                    </div>

                    <button
                      onClick={handleUnlockPreview}
                      className="w-full bg-primary-container hover:bg-primary text-on-primary-container font-bold py-2.5 rounded-lg text-sm transition-all shadow cursor-pointer"
                    >
                      Unlock Preview
                    </button>
                  </div>
                ) : isPreviewLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="animate-spin text-primary" size={32} />
                    <p className="text-xs text-on-surface-variant font-medium">Generating high-fidelity page previews...</p>
                  </div>
                ) : previewImages.length > 0 ? (
                  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-3 text-center text-xs text-on-surface-variant max-w-xl mx-auto">
                      💡 <strong>High-Fidelity Mode:</strong> PDF pages have been pre-rendered into high-res images for absolute visual accuracy, bypassing iframe sandboxing.
                    </div>
                    {previewImages.map((pageImg, idx) => (
                      <div key={idx} className="relative bg-background border border-outline-variant rounded-xl shadow-md p-4 flex flex-col items-center gap-2 max-w-xl mx-auto">
                        <div className="absolute top-3 left-3 bg-primary/95 text-on-primary text-[10px] font-mono px-2 py-0.5 rounded-full font-bold shadow-sm">
                          Page {idx + 1} of {previewImages.length}
                        </div>
                        <img 
                          src={pageImg} 
                          alt={`Page ${idx + 1}`} 
                          className="w-full h-auto max-h-[80vh] object-contain rounded border border-outline-variant/30" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Browser Sandbox Helpful Tip */}
                    <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-3">
                      <span className="p-2 bg-primary-container/20 text-primary rounded-lg shrink-0">
                        <AlertCircle size={18} />
                      </span>
                      <div className="space-y-1 text-xs">
                        <h4 className="font-bold text-on-surface">
                          {t('workspace.preview.blank.title') || 'Is the PDF preview blank or showing a blocked page?'}
                        </h4>
                        <p className="text-on-surface-variant leading-relaxed">
                          {(t('workspace.preview.blank.desc') || "Don't worry! This is a standard security restriction enforced by modern web browsers when rendering {blob} PDF assets inside nested developer iframes.").split('{blob}')[0]}
                          <code className="bg-surface-container px-1 py-0.5 rounded text-primary font-mono text-[10px]">blob:</code>
                          {(t('workspace.preview.blank.desc') || "Don't worry! This is a standard security restriction enforced by modern web browsers when rendering {blob} PDF assets inside nested developer iframes.").split('{blob}')[1] || ''}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-primary font-semibold">
                          <span>{t('workspace.preview.blank.list1') || '✓ Your processed PDF is 100% complete & secure.'}</span>
                          <span>{t('workspace.preview.blank.list2') || '✓ It will display instantly when downloaded or opened in a direct browser tab.'}</span>
                        </div>
                      </div>
                    </div>

                    <iframe
                      src={`${processingState.downloadUrl}#toolbar=1`}
                      className="hidden sm:block w-full flex-1 rounded-lg border border-outline-variant bg-background shadow-inner"
                      title="PDF Document Preview"
                    />
                    <div className="sm:hidden w-full flex-1 rounded-lg border border-outline-variant bg-surface-container flex flex-col items-center justify-center p-6 text-center gap-4">
                      <div className="p-4 bg-primary-container/20 rounded-full text-primary">
                        <FileText size={32} />
                      </div>
                      <p className="text-on-surface-variant text-sm font-medium">
                        {(() => {
                          const val = t('workspace.preview.mobileFallback');
                          return val === 'workspace.preview.mobileFallback' ? 'Mobile browser cannot display direct PDF blobs in an iframe. Please download the file to view it.' : val;
                        })()}
                      </p>
                      <div className="flex gap-3 mt-2">
                        <a
                          href={processingState.downloadUrl}
                          download={processingState.outputFileName || 'document.pdf'}
                          className="bg-primary text-on-primary font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
                        >
                          <Download size={16} /> {t('workspace.preview.download', 'Download')}
                        </a>
                        <a
                          href={processingState.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-surface-container-highest text-on-surface font-bold text-xs px-5 py-3 rounded-xl shadow-sm flex items-center gap-2"
                        >
                          <Eye size={16} /> {t('workspace.preview.new_tab', 'Open in New Tab')}
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Modal Footer info */}
              <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-outline-variant/60 bg-surface-container-high flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs text-on-surface-variant font-sans">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-green-400" /> <span className="hidden sm:inline">{t('workspace.preview.private', '100% Private Local Viewer')}</span><span className="sm:hidden">{t('workspace.preview.private_mobile', '100% Private')}</span>
                </span>
                <span className="hidden sm:inline">{t('workspace.preview.close_hint', 'Press ESC or click backdrop to close')}</span>
                <div className="sm:hidden flex items-center gap-2 mt-1 sm:mt-0">
                  <span>{t('workspace.preview.close_hint_mobile', 'Tap outside to close, or')}</span>
                  <button 
                    onClick={() => setShowPreview(false)} 
                    className="flex items-center gap-1 bg-surface-container-highest px-3 py-1.5 rounded-lg font-bold text-on-surface active:bg-surface-variant shadow-sm"
                  >
                    <X size={14} /> {t('workspace.preview.close_mobile', 'Close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Input File Preview Modal (On-Demand) */}
      <AnimatePresence>
        {fileToPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setFileToPreview(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-surface-container rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant/50"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-outline-variant bg-surface flex justify-between items-center z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-on-surface leading-tight">File Preview</h3>
                    <p className="text-xs text-on-surface-variant font-mono mt-0.5">{fileToPreview.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setFileToPreview(null)}
                  className="p-2 hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - Iframe Viewer */}
              <div className="flex-1 bg-surface-container-lowest p-6 flex flex-col relative overflow-hidden">
                <iframe
                  src={`${URL.createObjectURL(fileToPreview.file)}#toolbar=1`}
                  className="w-full h-full rounded-lg border border-outline-variant bg-background shadow-inner"
                  title="On-Demand PDF Preview"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-outline-variant/60 bg-surface-container-high flex justify-between items-center text-xs text-on-surface-variant font-sans shrink-0">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-green-400" /> 100% Private Local File Viewer
                </span>
                <span>Press ESC or click backdrop to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper functions for English translation and dynamic guidelines
function getHowToUse(toolId: string, t?: any): string[] {
  if (!t) return [];
  const id = toolId.replace(/-/g, '_');
  const steps: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const key = `tool.${id}.howto.${i}`;
    const step = t(key);
    if (step && step !== key) {
      steps.push(step);
    }
  }
  // Fallback if no steps found (just in case)
  if (steps.length === 0) {
    return [
      t('tool.default.howto.1', 'Select the PDF file you wish to process.'),
      t('tool.default.howto.2', 'Configure the parameters in the settings panel on the right.'),
      t('tool.default.howto.3', 'Click the action button to execute the tool locally in your browser.')
    ];
  }
  return steps;
}

function getProfessionalTips(toolId: string, t?: any): string[] {
  if (!t) return [];
  const id = toolId.replace(/-/g, '_');
  const tips: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const key = `tool.${id}.tips.${i}`;
    const tip = t(key);
    if (tip && tip !== key) {
      tips.push(tip);
    }
  }
  // Fallback if no tips found
  if (tips.length === 0) {
    return [
      t('tool.default.tips.1', 'Always preview your output before downloading to ensure accuracy.'),
      t('tool.default.tips.2', 'All processing happens locally in your browser for maximum privacy and speed.'),
      t('tool.default.tips.3', 'Use custom output naming to keep your local files organized effortlessly.')
    ];
  }
  return tips;
}
