// @ts-nocheck
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Upload, Eraser, PenTool, Lock, Unlock, Type } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string | null) => void;
}

const INK_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Blue', value: '#0055FF' },
  { name: 'Red', value: '#FF0000' },
];

export default function SignaturePad({ onSave }: SignaturePadProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typeCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'upload' | 'type'>('draw');
  const [inkColor, setInkColor] = useState<string>('#000000');
  const [typedName, setTypedName] = useState<string>('');
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSaveWrapper = (dataUrl: string | null) => {
    onSave(dataUrl);
    setHasData(!!dataUrl);
    if (dataUrl) {
      localStorage.setItem('tacopdf_saved_signature', dataUrl);
    } else {
      localStorage.removeItem('tacopdf_saved_signature');
    }
  };

  // Load saved signature on mount
  useEffect(() => {
    const saved = localStorage.getItem('tacopdf_saved_signature');
    if (saved) {
      setUploadedImage(saved);
      setMode('upload');
      handleSaveWrapper(saved);
    }
  }, []);

  // Drawing logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isLocked) return;
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasData();
      
      // Auto-lock after 1.5 seconds of inactivity to prevent scroll-draws
      lockTimeoutRef.current = setTimeout(() => {
        setIsLocked(true);
      }, 1500);
    }
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        offsetX: (e.touches[0].clientX - rect.left) * scaleX,
        offsetY: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      offsetX: (e.clientX - rect.left) * scaleX,
      offsetY: (e.clientY - rect.top) * scaleY,
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsLocked(false);
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    handleSaveWrapper(null);
  };

  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    if (canvas.toDataURL() === blank.toDataURL()) {
      handleSaveWrapper(null);
    } else {
      handleSaveWrapper(canvas.toDataURL('image/png'));
    }
  };

  // Initialize canvas context for Draw Mode
  useEffect(() => {
    if (mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 6; 
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [mode, inkColor]);
  
  // Render typed signature
  useEffect(() => {
    if (mode === 'type') {
      const renderText = () => {
        const canvas = typeCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (typedName.trim()) {
          ctx.fillStyle = inkColor;
          ctx.font = '280px "Caveat", cursive';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
          
          handleSaveWrapper(canvas.toDataURL('image/png'));
        } else {
          handleSaveWrapper(null);
        }
      };
      
      if (document.fonts) {
        document.fonts.ready.then(renderText);
      } else {
        renderText();
      }
    }
  }, [typedName, inkColor, mode]);

  // Upload Logic
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        const threshold = 200; 
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          if (r > threshold && g > threshold && b > threshold) {
            data[i + 3] = 0; // Transparent
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        const transparentDataUrl = canvas.toDataURL('image/png');
        setUploadedImage(transparentDataUrl);
        handleSaveWrapper(transparentDataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const clearUpload = () => {
    setUploadedImage(null);
    handleSaveWrapper(null);
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher */}
      <div className="flex bg-surface-container-high p-1 rounded-lg">
        <button
          onClick={() => { setMode('draw'); handleSaveWrapper(null); }}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors ${mode === 'draw' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-highest'}`}
        >
          <PenTool size={16} />
          {t('tool.sign.draw', 'Draw')}
        </button>
        <button
          onClick={() => { setMode('type'); handleSaveWrapper(null); setTypedName(''); }}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors ${mode === 'type' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-highest'}`}
        >
          <Type size={16} />
          {t('tool.sign.type', 'Type')}
        </button>
        <button
          onClick={() => { setMode('upload'); handleSaveWrapper(uploadedImage); }}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors ${mode === 'upload' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-highest'}`}
        >
          <Upload size={16} />
          {t('tool.sign.upload', 'Upload')}
        </button>
      </div>

      {/* Ink Colors */}
      {(mode === 'draw' || mode === 'type') && (
        <div className="flex items-center justify-center gap-4 py-2">
          {INK_COLORS.map(c => (
            <button
              key={c.value}
              onClick={() => { setInkColor(c.value); if (mode === 'draw') { setIsLocked(false); } }}
              className={`w-8 h-8 rounded-full border-2 transition-transform shadow-sm ${inkColor === c.value ? 'scale-125 border-primary' : 'border-transparent hover:scale-110'}`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      )}

      {/* Signature Area */}
      <div className="border border-outline-variant bg-white rounded-xl overflow-hidden relative shadow-inner h-[250px] flex items-center justify-center w-full">
        {mode === 'type' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-surface-container-lowest">
             <input 
               type="text" 
               placeholder={t('tool.sign.type_placeholder', 'Type your name here...')}
               value={typedName}
               onChange={(e) => setTypedName(e.target.value)}
               className="text-center text-2xl font-bold bg-transparent border-b-2 border-outline focus:border-primary outline-none px-4 py-2 mb-4 w-full max-w-md text-on-surface"
             />
             <div className="w-full h-full relative flex items-center justify-center overflow-hidden pointer-events-none">
                <canvas 
                  ref={typeCanvasRef}
                  width={1200}
                  height={500}
                  className="w-full h-full object-contain"
                />
             </div>
          </div>
        )}

        {mode === 'draw' && (
          <div className="relative w-full h-full" onClick={() => { if(isLocked) setIsLocked(false); }}>
            <canvas
              ref={canvasRef}
              width={1200} // HD internal resolution
              height={500}
              className={`w-full h-full touch-none ${isLocked ? 'pointer-events-none opacity-50' : 'cursor-crosshair'}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <div className={`absolute inset-0 pointer-events-none flex flex-col items-center justify-center ${isLocked ? 'opacity-100' : 'opacity-10'}`}>
              {isLocked ? (
                <div className="bg-surface text-on-surface px-6 py-3 rounded-full shadow-lg border border-outline-variant flex items-center gap-2 font-bold animate-in zoom-in-95 duration-200">
                  <Unlock size={18} /> {t('tool.sign.edit', 'Tap to Edit')}
                </div>
              ) : (
                <span className="text-3xl font-bold font-mono tracking-widest uppercase">Sign Here</span>
              )}
            </div>
            {!isLocked && (
              <button
                onClick={(e) => { e.stopPropagation(); clearCanvas(); }}
                className="absolute top-3 right-3 p-2 bg-surface-container-high/80 hover:bg-surface-container-highest rounded-full text-on-surface transition-colors shadow-sm"
                title={t('tool.sign.clear', 'Clear')}
              >
                <Eraser size={16} />
              </button>
            )}
          </div>
        )}
        
        {mode === 'upload' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-surface-container-low/50">
            {uploadedImage ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={uploadedImage} alt="Signature" className="max-h-full max-w-full object-contain drop-shadow-md" />
                <button
                  onClick={clearUpload}
                  className="absolute top-0 right-0 p-2 bg-surface-container-high hover:bg-surface-container-highest rounded-full text-on-surface transition-colors shadow-sm"
                  title={t('tool.sign.clear', 'Clear')}
                >
                  <Eraser size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer p-8 border-2 border-dashed border-outline-variant hover:border-primary-container hover:bg-surface-container transition-colors rounded-xl w-full max-w-sm">
                <Upload size={32} className="text-primary mb-3" />
                <span className="text-sm font-semibold text-on-surface text-center">
                  {t('tool.sign.upload_placeholder', 'Select PNG/JPG image...')}
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
