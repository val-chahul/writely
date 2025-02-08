import { Editor } from '@tiptap/react';

export interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export interface MenuBarProps {
  editor: Editor | null;
}

export interface BubbleMenuProps {
  editor: Editor | null;
}

export interface ToolbarProps {
  editor: Editor | null;
}

export interface TableMenuProps {
  editor: Editor | null;
}

export interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>;
}
