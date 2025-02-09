import type { Editor } from '@tiptap/core';
import type { ChainedCommands } from '@tiptap/react';

export interface TableControlsProps {
  editor: EditorWithTextAlign | null;
  onDeleteTable: () => void;
  onAddColumnBefore: () => void;
  onAddColumnAfter: () => void;
  onAddRowBefore: () => void;
  onAddRowAfter: () => void;
}

export interface FrontMatterMetadata {
  type?: string;
  title?: string;
  status?: string;
  [key: string]: unknown; // Allow additional fields while maintaining type safety
}

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

export interface LinkChain extends ChainedCommands {
  setLink: (attrs: { href: string; target: string | null }) => this;
  toggleLink: (attributes: { href: string; target: string | null }) => this;
  unsetLink: () => this;
}

export interface TextAlignChain extends LinkChain {
  setTextAlign: (alignment: TextAlignment) => this;
}

export type EditorWithTextAlign = Editor & {
  isActive: ((name: string, options?: Record<string, unknown>) => boolean) &
    ((options: { textAlign: TextAlignment }) => boolean);
  chain: () => {
    focus: () => TextAlignChain;
  };
};

export interface GlobalMarkdownDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, metadata?: FrontMatterMetadata) => Promise<void>;
  onMetadataExtracted?: (metadata: FrontMatterMetadata) => void;
  initialContent?: string;
  mode?: 'edit' | 'import';
}

export interface MenuBarProps {
  editor: EditorWithTextAlign | null;
  isMarkdownMode: boolean;
  isPreviewMode: boolean;
  onToggleMarkdown: () => void;
  onTogglePreview: () => void;
  onImageUpload: () => void;
  onOpenTags: () => void;
  wordCount: number;
  characterCount: number;
  onSave: () => void;
  isSaving: boolean;
}

export interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (base64: string, alt: string, caption: string) => void;
  file?: File;
}

export interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, text: string, openInNewTab: boolean) => void;
  initialText?: string;
  initialUrl?: string;
}
