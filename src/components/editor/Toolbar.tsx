import { type EditorWithTextAlign, type TextAlignChain, type LinkChain } from './types';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Table as TableIcon,
  Type,
  Hash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageUploadDialog } from './ImageUploadDialog';
import { LinkDialog } from './LinkDialog';
import { Button } from '../ui/button';
import { useEditorStore } from '../../store/editorStore';

interface ToolbarProps {
  editor: EditorWithTextAlign | null;
  onOpenTags: () => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  disabled?: boolean;
}

function ToolbarButton({ onClick, icon, label, isActive, disabled }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`toolbar-button group relative ${
        isActive
          ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 ring-2 ring-primary-500/20'
          : 'hover:bg-gray-100/80 dark:hover:bg-gray-800/80'
      }`}
      title={label}
      disabled={disabled}
      type="button"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <div className="transform transition-transform duration-150 group-hover:scale-110 group-active:scale-95">
        {icon}
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </button>
  );
}

interface ToolGroupProps {
  label: string;
  children: React.ReactNode;
}

function ToolGroup({ label, children }: ToolGroupProps) {
  return (
    <div role="group" aria-label={label} className="toolbar-group relative group">
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] rounded-full shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
        {label}
      </div>
      {children}
    </div>
  );
}

export function Toolbar({ editor, onOpenTags }: ToolbarProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const historyState = useEditorStore((state) => state.historyState);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && editor) {
        e.preventDefault();
        setShowLinkDialog(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editor]);

  if (!editor) return null;

  const getSelectedText = () => {
    if (editor.state.selection.empty) return '';
    return editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to);
  };

  const handleImageUpload = (base64: string, alt: string, caption: string) => {
    editor.chain().focus().setImage({ src: base64, alt, title: caption }).run();
  };

  const handleLinkSubmit = (url: string, text: string, openInNewTab: boolean) => {
    // If text is provided, insert it with the link
    if (text) {
      editor
        .chain()
        .focus()
        .insertContent([
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: url,
                  target: openInNewTab ? '_blank' : null,
                },
              },
            ],
            text: text,
          },
        ])
        .run();
    } else {
      // Otherwise, just set the link on the selected text
      (editor.chain().focus() as LinkChain)
        .toggleLink({
          href: url,
          target: openInNewTab ? '_blank' : null,
        })
        .run();
    }
  };

  const actions = [
    {
      icon: <Undo className="w-4 h-4" />,
      label: 'Undo',
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !historyState.canUndo,
    },
    {
      icon: <Redo className="w-4 h-4" />,
      label: 'Redo',
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !historyState.canRedo,
    },
    {
      icon: <Bold className="w-4 h-4" />,
      label: 'Bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: 'Italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      icon: <Code className="w-4 h-4" />,
      label: 'Code',
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      icon: <Heading1 className="w-4 h-4" />,
      label: 'Heading 1',
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      label: 'Heading 2',
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      label: 'Heading 3',
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <List className="w-4 h-4" />,
      label: 'Bullet List',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      label: 'Ordered List',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      icon: <Quote className="w-4 h-4" />,
      label: 'Blockquote',
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      icon: <Code className="w-4 h-4" />,
      label: 'Code Block',
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    {
      icon: <TableIcon className="w-4 h-4" />,
      label: 'Insert Table',
      onClick: () =>
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: 'Insert Image',
      onClick: () => setShowImageDialog(true),
    },
  ];

  const toolGroups = [
    {
      label: 'History',
      tools: actions.slice(0, 2), // Undo, Redo
    },
    {
      label: 'Text',
      tools: actions.slice(2, 5), // Bold, Italic, Code (Markdown: **bold**, *italic*, `code`)
    },
    {
      label: 'Headings',
      tools: actions.slice(5, 8), // H1, H2, H3 (Markdown: #, ##, ###)
    },
    {
      label: 'Align',
      tools: [
        {
          icon: <AlignLeft className="w-4 h-4" />,
          label: 'Align Left',
          onClick: () => (editor.chain().focus() as TextAlignChain).setTextAlign('left').run(),
          isActive:
            editor.isActive({ textAlign: 'left' }) ||
            (!editor.isActive({ textAlign: 'center' }) &&
              !editor.isActive({ textAlign: 'right' }) &&
              !editor.isActive({ textAlign: 'justify' })),
        },
        {
          icon: <AlignCenter className="w-4 h-4" />,
          label: 'Align Center',
          onClick: () => (editor.chain().focus() as TextAlignChain).setTextAlign('center').run(),
          isActive: editor.isActive({ textAlign: 'center' }),
        },
        {
          icon: <AlignRight className="w-4 h-4" />,
          label: 'Align Right',
          onClick: () => (editor.chain().focus() as TextAlignChain).setTextAlign('right').run(),
          isActive: editor.isActive({ textAlign: 'right' }),
        },
        {
          icon: <AlignJustify className="w-4 h-4" />,
          label: 'Justify',
          onClick: () => (editor.chain().focus() as TextAlignChain).setTextAlign('justify').run(),
          isActive: editor.isActive({ textAlign: 'justify' }),
        },
      ],
    },
    {
      label: 'Lists',
      tools: actions.slice(8, 10), // Bullet, Ordered (Markdown: -, 1.)
    },
    {
      label: 'Special',
      tools: actions.slice(10, 12), // Quote, Code Block (Markdown: >, ```)
    },
    {
      label: 'Insert',
      tools: [
        ...actions.slice(12), // Table, Image
        {
          icon: <LinkIcon className="w-4 h-4" />,
          label: 'Insert Link (⌘K)',
          onClick: () => setShowLinkDialog(true),
          isActive: editor.isActive('link'),
        },
      ],
    },
  ];

  return (
    <>
      <div className="px-4 py-3 flex flex-wrap items-center justify-between md:justify-start gap-1.5 md:gap-3 overflow-x-auto scrollbar-premium">
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap items-center gap-0.5 md:gap-2">
            {toolGroups.map((group) => (
              <ToolGroup key={group.label} label={group.label}>
                {group.tools.map((action, index) => (
                  <ToolbarButton key={`${group.label}-${index}`} {...action} />
                ))}
              </ToolGroup>
            ))}
          </div>

          <div className="flex items-center gap-1 px-2 border-l">
            <Button onClick={onOpenTags} variant="ghost" size="icon" title="Manage Tags">
              <Hash className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-muted-foreground premium-backdrop px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <kbd className="px-2 py-0.5 text-xs font-mono bg-white/70 dark:bg-gray-900/70 rounded-md border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              Markdown
            </kbd>
          </div>
          <div className="w-px h-3 bg-gray-200/50 dark:bg-gray-700/50" />
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <span className="text-xs">Shortcuts enabled</span>
          </div>
        </div>
      </div>

      <ImageUploadDialog
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onUpload={handleImageUpload}
      />
      <LinkDialog
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        onSubmit={handleLinkSubmit}
        initialText={getSelectedText()}
      />
    </>
  );
}
