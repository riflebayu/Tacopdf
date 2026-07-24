import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Upload, Eraser, PenTool, Lock, Unlock } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string | null) => void;
}

export default function SignaturePad({ onSave }: SignaturePadProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'upload'>('draw');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout>();

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
    setHasData(false);
    setIsLocked(false);
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    onSave(null); // Clear parent state
  };

  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Check if canvas is actually empty
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    if (canvas.toDataURL() === blank.toDataURL()) {
      setHasData(false);
      onSave(null);
    } else {
      setHasData(true);
      onSave(canvas.toDataURL('image/png'));
    }
  };

  // Initialize canvas context
  useEffect(() => {
    if (mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000000'; // Always black for signature
        ctx.lineWidth = 6; // Thicker line for higher resolution
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [mode]);

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
        
        // Remove near-white pixels (Magic Wand)
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
        setHasData(true);
        onSave(transparentDataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setHasData(false);
    onSave(null);
  };

  return (
    <div className="space-y-4">


      {/* Mode Switcher */}
      <div className={`flex bg-surface-container-high p-1 rounded-lg`}>
        <button
          onClick={() => { setMode('draw'); onSave(null); }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${mode === 'draw' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-highest'}`}
        >
          <PenTool size={16} />
          {t('tool.sign.draw', 'Draw Signature')}
        </button>
        <button
          onClick={() => { setMode('upload'); onSave(uploadedImage); }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${mode === 'upload' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-highest'}`}
        >
          <Upload size={16} />
          {t('tool.sign.upload', 'Upload Image')}
        </button>
      </div>

      {/* Signature Area */}
      <div className="border border-outline-variant bg-white rounded-xl overflow-hidden relative shadow-inner h-[250px] flex items-center justify-center w-full">
        {mode === 'draw' ? (
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
        ) : (
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
