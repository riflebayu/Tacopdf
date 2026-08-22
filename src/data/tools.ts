import { PDFTool } from '../types';

export const TOOLS: PDFTool[] = [
  // Page Manipulation
  { id: 'merge', name: 'Merge PDF', description: "Combine and merge multiple PDF files or reports into a single document instantly and securely.", category: 'manipulation', icon: 'merge', active: true },
  { id: 'split', name: 'Split PDF', description: "Split PDF files and extract specific pages to create a new, organized PDF document.", category: 'manipulation', icon: 'split', active: true },
  { id: 'rotate', name: 'Rotate PDF', description: "Rotate PDF pages permanently to fix upside-down scans and save the corrected document.", category: 'manipulation', icon: 'rotate', active: true },
  { id: 'delete-pages', name: 'Delete Pages', description: "Remove blank or unwanted pages from your PDF files easily and securely.", category: 'manipulation', icon: 'delete-pages', active: true },
  { id: 'extract-pages', name: 'Extract Pages', description: "Extract selected pages from a PDF to save them as a new, lightweight document.", category: 'manipulation', icon: 'extract-pages', active: true },
  
  // Security
  { id: 'protect', name: 'Protect PDF', description: "Protect your PDF files with a secure password and local AES encryption.", category: 'security', icon: 'protect', active: true },
  { id: 'unlock', name: 'Unlock PDF', description: "Remove PDF passwords and restrictions to unlock documents for easy printing and sharing.", category: 'security', icon: 'unlock', active: true },
  { id: 'sign', name: 'Sign PDF', description: "Sign PDF documents online for free by drawing or uploading your signature locally.", icon: 'sign', category: 'security', active: true },
  { id: 'redact', name: 'Redact PDF', description: "Redact PDF text and blackout sensitive images permanently to hide confidential data.", category: 'security', icon: 'redact', active: true },
  
  // Format Conversion
  { id: 'image-to-pdf', name: 'Image to PDF', description: "Convert JPG, PNG, and WebP images into high-quality PDF documents instantly.", category: 'conversion', icon: 'image-to-pdf', active: true },
  { id: 'pdf-to-image', name: 'PDF to Image', description: "Convert PDF to JPG or PNG by extracting every page into high-quality images.", category: 'conversion', icon: 'pdf-to-image', active: true },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: "Convert HTML and rich text to PDF locally directly in your browser.", category: 'conversion', icon: 'html-to-pdf', active: true },
  
  // Editing
  { id: 'add-watermark', name: 'Add Watermark', description: "Add custom text or image watermarks to your PDF files to protect your documents.", category: 'editing', icon: 'add-watermark', active: true },
  { id: 'add-page-numbers', name: 'Add Page Numbers', description: "Add page numbers to PDF documents easily with customizable formatting and placement.", category: 'editing', icon: 'add-page-numbers', active: true },

  // Optimization & Utility (New)
  { id: 'compress', name: 'Compress PDF', description: "Reduce PDF file size significantly while maintaining good quality for web sharing and email.", category: 'optimization', icon: 'compress-pdf.png', active: true, isNew: true },
  { id: 'ocr', name: 'OCR PDF', description: "Extract text from scanned PDFs and images using Optical Character Recognition (OCR).", category: 'conversion', icon: 'ocr-pdf.png', active: true, isNew: true },
  { id: 'organize', name: 'Organize PDF', description: "Reorder, delete, and manage PDF pages visually with an intuitive interface.", category: 'manipulation', icon: 'organize-pdf.png', active: true, isNew: true },
  { id: 'pdf-to-word', name: 'PDF to Word', description: "Convert PDF to Word (DOCX) instantly and completely offline while preserving your layouts.", category: 'conversion', icon: 'file-text', active: true, isBeta: true, isNew: true },
  { id: 'edit-pdf-text', name: 'Edit PDF Text', description: "Edit PDF text directly in the browser with live reflow.", category: 'editing', icon: 'edit-pdf-text', active: true, isBeta: true, isNew: true }
];

export const CATEGORIES = [
  { id: 'manipulation', name: 'Page Manipulation' },
  { id: 'optimization', name: 'Optimization' },
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
  'add-page-numbers': 'add-page-numbers',
  'compress-pdf': 'compress',
  'ocr-pdf': 'ocr',
  'organize-pdf': 'organize',
  'pdf-to-word': 'pdf-to-word',
  'pdf-to-docx': 'pdf-to-word',
  'edit-pdf-text': 'edit-pdf-text'
};

export const getToolSeoPath = (id: string) => {
  const tool = TOOLS.find(t => t.id === id);
  const entry = Object.entries(TOOL_ALIASES).find(([alias, toolId]) => toolId === id);
  const path = entry ? `/${entry[0]}` : `/tools/${id}`;
  return tool?.isBeta ? `/beta${path}` : path;
};
