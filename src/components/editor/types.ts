import type { Editor } from '@tiptap/core';

export interface TableControlsProps {
  editor: Editor | null;
  onDeleteTable: () => void;
  onAddColumnBefore: () => void;
  onAddColumnAfter: () => void;
  onAddRowBefore: () => void;
  onAddRowAfter: () => void;
}

export interface GlobalMarkdownDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, metadata?: any) => Promise<void>;
  onMetadataExtracted?: (metadata: any) => void;
  initialContent?: string;
  mode?: 'edit' | 'import';
}

export interface MenuBarProps {
  editor: Editor | null;
  isMarkdownMode: boolean;
  isPreviewMode: boolean;
  onToggleMarkdown: () => void;
  onTogglePreview: () => void;
  onImageUpload: () => void;
  wordCount: number;
  characterCount: number;
  onSave: () => void;
  isSaving: boolean;
}

export interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (url: string, alt: string, caption: string) => void;
  file?: File;
}
