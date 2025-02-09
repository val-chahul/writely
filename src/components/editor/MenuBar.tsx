import React from 'react';
import { Button } from '../ui/button';
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Code,
  Image as ImageIcon,
  Undo,
  Redo,
  Eye,
  FileCode,
  Save,
  Quote,
  TableIcon,
  Hash,
} from 'lucide-react';
import { MenuBarProps } from './types';
import { TableControls } from './TableControls';

export const MenuBar: React.FC<MenuBarProps> = ({
  editor,
  isMarkdownMode,
  isPreviewMode,
  onToggleMarkdown,
  onTogglePreview,
  onImageUpload,
  onOpenTags,
  wordCount,
  characterCount,
  onSave,
  isSaving,
}) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col border-b bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="flex flex-wrap items-center gap-2 p-3">
        <div className="flex items-center gap-1 pr-2 border-r">
          <Button
            variant={isMarkdownMode ? 'default' : 'ghost'}
            onClick={onToggleMarkdown}
            className="h-9 px-3 gap-2 transition-premium hover:shadow-sm"
          >
            <FileCode className="w-4 h-4" />
            {isMarkdownMode ? 'Visual Editor' : 'Markdown'}
          </Button>
        </div>

        <div className="flex items-center gap-1 pr-2 border-r">
          <Button
            variant={isPreviewMode ? 'default' : 'ghost'}
            onClick={onTogglePreview}
            className="h-9 px-3 gap-2 transition-premium hover:shadow-sm"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>

        {!isMarkdownMode && (
          <>
            <div className="flex items-center gap-1.5 px-2 border-r border-border/50">
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('bold') ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('italic') ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1.5 px-2 border-r border-border/50">
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('heading', { level: 1 }) ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Heading 1"
              >
                <Heading1 className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('heading', { level: 2 }) ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1.5 px-2 border-r border-border/50">
              <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('bulletList') ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('codeBlock') ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Code Block"
              >
                <Code className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1.5 px-2 border-r border-border/50">
              <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`transition-premium hover:shadow-sm ${
                  editor.isActive('blockquote') ? '!bg-accent shadow-sm' : ''
                }`}
                variant="ghost"
                size="icon"
                title="Blockquote"
              >
                <Quote className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1 pr-2 border-r">
              <Button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({
                      rows: 3,
                      cols: 3,
                      withHeaderRow: true,
                    })
                    .run()
                }
                variant="ghost"
                size="icon"
                title="Insert Table"
              >
                <TableIcon className="w-4 h-4" />
              </Button>
              <TableControls
                editor={editor}
                onDeleteTable={() => editor.chain().focus().deleteTable().run()}
                onAddColumnBefore={() => editor.chain().focus().addColumnBefore().run()}
                onAddColumnAfter={() => editor.chain().focus().addColumnAfter().run()}
                onAddRowBefore={() => editor.chain().focus().addRowBefore().run()}
                onAddRowAfter={() => editor.chain().focus().addRowAfter().run()}
              />
            </div>

            <div className="flex items-center gap-1 pr-2 border-r">
              <Button onClick={onImageUpload} variant="ghost" size="icon" title="Insert Image">
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1 pr-2 border-r">
              <Button onClick={onOpenTags} variant="ghost" size="icon" title="Manage Tags">
                <Hash className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1 pr-2 border-r">
              <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                variant="ghost"
                size="icon"
                title="Undo"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                variant="ghost"
                size="icon"
                title="Redo"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}

        <Button
          onClick={onSave}
          variant="ghost"
          className="h-9 px-3 gap-2 transition-premium hover:shadow-sm ml-auto"
          disabled={isSaving}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      <div className="text-sm text-muted-foreground px-3 py-1.5 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span className="w-px h-3 bg-border/50" />
          <span>{characterCount} characters</span>
        </div>
        <div className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full">
          Auto-saving enabled
        </div>
      </div>
    </div>
  );
};
