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
  if (name === 'help-circle') {
    return <LucideIcon name="HelpCircle" size={size} className={className} />;
  }

  const srcName = name.includes('.') ? name : `${name}.webp`;

  return (
    <img 
      src={`/images/tools/${srcName}`} 
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
