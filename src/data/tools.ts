import { PDFTool } from '../types';

export const TOOLS: PDFTool[] = [
  // Page Manipulation
  { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one document in your preferred order.', category: 'manipulation', icon: 'merge', active: true },
  { id: 'split', name: 'Split PDF', description: 'Extract specific page ranges or split a PDF into separate files.', category: 'manipulation', icon: 'split', active: true },
  { id: 'rotate', name: 'Rotate PDF', description: 'Rotate specific pages or all pages in your PDF by 90, 180, or 270 degrees.', category: 'manipulation', icon: 'rotate', active: true },
  { id: 'delete-pages', name: 'Delete Pages', description: 'Remove unwanted pages from your PDF file and shrink document size.', category: 'manipulation', icon: 'delete-pages', active: true },
  { id: 'extract-pages', name: 'Extract Pages', description: 'Select and save only the pages you need as a separate new PDF.', category: 'manipulation', icon: 'extract-pages', active: true },
  
  // Security
  { id: 'protect', name: 'Protect PDF', description: 'Encrypt and secure your PDF document with a strong password locally.', category: 'security', icon: 'protect', active: true },
  { id: 'unlock', name: 'Unlock PDF', description: 'Remove password security and encryption from your unlocked PDF.', category: 'security', icon: 'unlock', active: true },
  { id: 'sign', name: 'Sign PDF', description: 'Add your electronic signature to documents locally and securely.', icon: 'sign', category: 'security', active: true },
  { id: 'redact', name: 'Redact PDF', description: 'Black out sensitive information permanently.', category: 'security', icon: 'redact', active: true },
  
  // Format Conversion
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert JPG, PNG, WebP, and other images into a polished PDF document.', category: 'conversion', icon: 'image-to-pdf', active: true },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Extract raw images or render PDF pages as high-quality JPG/PNG files.', category: 'conversion', icon: 'pdf-to-image', active: true },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert web page screenshots, rich text, or HTML content into PDF files.', category: 'conversion', icon: 'html-to-pdf', active: true },
  
  // Editing
  { id: 'add-watermark', name: 'Add Watermark', description: 'Stamp custom text or images over pages with customized opacity and size.', category: 'editing', icon: 'add-watermark', active: true },
  { id: 'add-page-numbers', name: 'Add Page Numbers', description: 'Insert customized page numbers into your PDF easily with perfect layouts.', category: 'editing', icon: 'add-page-numbers', active: true }
];

export const CATEGORIES = [
  { id: 'manipulation', name: 'Page Manipulation' },
  { id: 'security', name: 'Security' },
  { id: 'conversion', name: 'Format Conversion' },
  { id: 'editing', name: 'Editing' }
];

export const TOOL_ALIASES: Record<string, string> = {
  'merge-pdf': 'merge',
  'split-pdf': 'split',
  'rotate-pdf': 'rotate',
  'delete-pages': 'delete-pages',
  'extract-pages': 'extract-pages',
  'protect-pdf': 'protect',
  'unlock-pdf': 'unlock',
  'sign': 'sign',
  'sign-pdf': 'sign',
  'redact': 'redact',
  'redact-pdf': 'redact',
  'image-to-pdf': 'image-to-pdf',
  'pdf-to-image': 'pdf-to-image',
  'html-to-pdf': 'html-to-pdf',
  'add-watermark': 'add-watermark',
  'add-page-numbers': 'add-page-numbers'
};

export const getToolSeoPath = (id: string) => {
  const entry = Object.entries(TOOL_ALIASES).find(([alias, toolId]) => toolId === id);
  return entry ? `/${entry[0]}` : `/tools/${id}`;
};
