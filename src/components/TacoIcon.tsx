// @ts-nocheck
"use client";
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
    />
  );
}
