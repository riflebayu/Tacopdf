import React from 'react';
import LucideIcon from './LucideIcon';

interface TacoIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TacoIcon({ name, className = '', size = 32 }: TacoIconProps) {
  // We expect 'name' to correspond to the tool id now (e.g. 'merge', 'split', etc)
  if (name === 'compress-pdf') {
    return (
      <div className={`flex items-center justify-center rounded-md shadow-sm bg-surface-container ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
        <LucideIcon name="FileArchive" size={size * 0.6} className="text-primary" />
      </div>
    );
  }

  return (
    <img 
      src={`/images/tools/${name}.webp`} 
      alt={`${name.replace(/-/g, ' ')} PDF tool icon`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`inline-block object-contain rounded-md shadow-sm ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      onError={(e) => {
        // Fallback in case image is missing
        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="55" font-size="40" text-anchor="middle" dominant-baseline="middle">🌮</text></svg>';
      }}
    />
  );
}
