import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'motion/react';
import { Trash2, RotateCw, RotateCcw, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VisualGridProps {
  toolId: string;
  thumbnails: string[];
  isGenerating: boolean;
  pagesToDelete: number[];
  setPagesToDelete: React.Dispatch<React.SetStateAction<number[]>>;
  pageRotations: Record<number, number>;
  setPageRotations: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  pageOrder: number[];
  setPageOrder: React.Dispatch<React.SetStateAction<number[]>>;
  pagesToExtract?: number[];
  setPagesToExtract?: React.Dispatch<React.SetStateAction<number[]>>;
  extractMode?: 'all' | 'select';
  onToggleExtract?: (index: number) => void;
}

export default function VisualGrid({
  toolId,
  thumbnails,
  isGenerating,
  pagesToDelete,
  setPagesToDelete,
  pageRotations,
  setPageRotations,
  pageOrder,
  setPageOrder,
  pagesToExtract = [],
  setPagesToExtract = () => {},
  extractMode,
  onToggleExtract,
}: VisualGridProps) {
  const { t } = useLanguage();
  const [selectedRotateIdx, setSelectedRotateIdx] = useState<number | null>(null);

  if (isGenerating) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center p-12 bg-surface-container rounded-xl border border-outline-variant border-dashed">
        <RefreshCw className="animate-spin text-primary-container mb-4" size={32} />
        <p className="text-on-surface-variant text-sm font-medium">Generating Document Preview...</p>
      </div>
    );
  }

  if (thumbnails.length === 0) return null;

  const toggleDelete = (index: number) => {
    setPagesToDelete((prev) => 
      prev.includes(index) ? prev.filter(p => p !== index) : [...prev, index]
    );
  };

  const toggleExtract = (index: number) => {
    if (extractMode === 'all') return;
    if (onToggleExtract) {
      onToggleExtract(index);
    } else {
      setPagesToExtract((prev) => 
        prev.includes(index) ? prev.filter(p => p !== index) : [...prev, index]
      );
    }
  };

  const handleRotate = (index: number, angle: number) => {
    setPageRotations((prev) => {
      const current = prev[index] || 0;
      let newRot = current + angle;
      if (newRot < 0) newRot = 360 + (newRot % 360);
      else newRot = newRot % 360;
      return { ...prev, [index]: newRot };
    });
  };

  if (toolId === 'reorder') {
    return (
      <div className="mt-8 space-y-4">
        <div className="bg-primary-container/10 border border-primary-container/30 text-primary-container p-3 rounded-xl text-sm flex gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p>{t('tool.reorder.tip') || 'Drag and drop pages below to reorder them.'}</p>
        </div>
        <Reorder.Group 
          axis="y" 
          values={pageOrder} 
          onReorder={setPageOrder}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-max"
          style={{ display: 'grid' }}
        >
          {pageOrder.map((pageIndex, displayOrder) => (
            <Reorder.Item 
              key={pageIndex} 
              value={pageIndex}
              className="relative aspect-[1/1.4] bg-surface-container-low border-2 border-outline-variant hover:border-primary-container rounded-xl overflow-hidden cursor-grab active:cursor-grabbing group shadow-md"
            >
              <img 
                src={thumbnails[pageIndex]} 
                alt={`Page ${pageIndex + 1}`}
                className="w-full h-full object-contain pointer-events-none p-2 bg-white"
              />
              <div className="absolute top-2 left-2 bg-surface-container text-on-surface text-xs font-bold px-2 py-1 rounded shadow-sm border border-outline-variant">
                {displayOrder + 1}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="bg-primary-container/10 border border-primary-container/30 text-primary-container p-3 rounded-xl text-sm flex gap-3">
        <AlertCircle className="shrink-0 mt-0.5" size={18} />
        <p>
          {toolId === 'delete-pages' && (t('tool.delete.example') || 'Click the trash icon on any page to remove it.')}
          {(toolId === 'split' || toolId === 'extract-pages') && (t('tool.extract.tip') || 'Click on the pages you want to extract.')}
          {toolId === 'rotate' && t('tool.rotate.tip', 'Click the rotate icon to rotate individual pages.')}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {thumbnails.map((thumbUrl, idx) => {
          const isDeleted = toolId === 'delete-pages' && pagesToDelete.includes(idx);
          const isExtracted = (toolId === 'split' || toolId === 'extract-pages') && 
            (extractMode === 'all' || pagesToExtract.includes(idx));
          const rotation = pageRotations[idx] || 0;
          
          let borderClass = 'border-outline-variant hover:border-primary-container bg-surface-container-low';
          if (isDeleted) borderClass = 'border-red-500 opacity-50 grayscale';
          if (isExtracted) borderClass = 'border-green-500 ring-2 ring-green-500/50 bg-green-500/10 shadow-green-500/20';
          if (toolId === 'rotate' && selectedRotateIdx === idx) borderClass = 'border-primary ring-2 ring-primary/50 bg-primary/10 shadow-primary/20';

          return (
            <div 
              key={idx} 
              className={`relative aspect-[1/1.4] rounded-xl overflow-hidden shadow-md transition-all duration-300 border-2 ${borderClass}`}
            >
              <img 
                src={thumbUrl} 
                alt={`Page ${idx + 1}`}
                className={`w-full h-full object-contain p-2 transition-transform duration-300 ${isExtracted ? 'bg-transparent' : 'bg-white'}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              <div className="absolute top-2 left-2 bg-surface-container text-on-surface text-xs font-bold px-2 py-1 rounded shadow-sm border border-outline-variant">
                {idx + 1}
              </div>
              
              <div 
                className={`absolute inset-0 transition-colors flex items-center justify-center opacity-100 sm:opacity-0 sm:hover:opacity-100 ${isExtracted ? 'bg-green-500/10' : 'bg-surface/10'}`}
                onClick={() => {
                  if (toolId === 'rotate' && window.innerWidth < 640) {
                     setSelectedRotateIdx(idx);
                  }
                }}
              >
                {toolId === 'delete-pages' && (
                  <button 
                    onClick={() => toggleDelete(idx)}
                    className={`p-4 rounded-full shadow-lg transform hover:scale-110 transition-all ${isDeleted ? 'bg-surface-container text-on-surface' : 'bg-red-500 text-white'}`}
                  >
                    {isDeleted ? (t('tool.action.undo') || 'Undo') : <Trash2 size={24} />}
                  </button>
                )}
                {(toolId === 'split' || toolId === 'extract-pages') && (
                  <button 
                    onClick={() => toggleExtract(idx)}
                    disabled={extractMode === 'all'}
                    className={`p-4 rounded-full shadow-lg transform transition-all ${extractMode === 'all' ? 'cursor-not-allowed bg-green-600/70 text-white' : 'hover:scale-110'} ${isExtracted && extractMode !== 'all' ? 'bg-green-600 text-white' : 'bg-surface-container text-on-surface'}`}
                  >
                    {isExtracted ? (t('tool.action.undo') || 'Undo') : <span className="font-bold text-sm">{toolId === 'extract-pages' ? (t('tool.action.extract') || 'Extract') : (t('tool.action.select') || 'Select')}</span>}
                  </button>
                )}
                {toolId === 'rotate' && (
                  <div className="hidden sm:flex gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRotate(idx, -90); }}
                      className="p-3 bg-surface-variant text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container rounded-full shadow-lg transform hover:scale-110 transition-all"
                      title={t('tool.rotate.left') || 'Rotate Left'}
                    >
                      <RotateCcw size={24} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRotate(idx, 90); }}
                      className="p-3 bg-surface-variant text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container rounded-full shadow-lg transform hover:scale-110 transition-all"
                      title={t('tool.rotate.right') || 'Rotate Right'}
                    >
                      <RotateCw size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {toolId === 'rotate' && (
        <div className="sm:hidden mt-8 flex flex-col items-center justify-center gap-4 bg-surface-container-high p-4 rounded-xl shadow-sm border border-outline-variant">
           {selectedRotateIdx !== null ? (
              <div className="flex items-center w-full gap-4 justify-center">
                <button 
                  onClick={() => handleRotate(selectedRotateIdx, -90)}
                  className="px-4 py-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  <span>{t('tool.rotate.left', 'Left')}</span>
                </button>
                <button 
                  onClick={() => handleRotate(selectedRotateIdx, 90)}
                  className="px-4 py-2 bg-primary-container hover:bg-primary text-on-primary-container font-bold rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCw size={18} />
                  <span>{t('tool.rotate.right', 'Right')}</span>
                </button>
              </div>
           ) : (
              <p className="text-sm font-medium text-on-surface-variant text-center w-full">
                {t('tool.rotate.select_hint', 'Select a page above to rotate')}
              </p>
           )}
        </div>
      )}
    </div>
  );
}
