export type ToolCategory = 'manipulation' | 'security' | 'conversion' | 'editing';

export interface PDFTool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // Map to Lucide icon name
  active: boolean;
}

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  progress: number;
  message: string;
  downloadUrl?: string;
  outputFileName?: string;
}

export interface ToolWorkspaceProps {
  tool: PDFTool;
  onBack: () => void;
}
