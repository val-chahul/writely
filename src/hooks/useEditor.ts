import { useEditor as useTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { common, createLowlight } from 'lowlight';
import { useEditorStore } from '../store/editorStore';
import type { Editor } from '@tiptap/core';
import { EditorWithTextAlign } from '@/components/editor/types';

const lowlight = createLowlight(common);

interface EditorOptions {
  content?: string;
  placeholder?: string;
  editable?: boolean;
}

import { EditorState } from '@tiptap/pm/state';

interface EditorView {
  state: EditorState;
}

interface KeyboardEvent {
  key: string;
  preventDefault: () => void;
}

export function useEditor(options: EditorOptions) {
  const setContent = useEditorStore((state) => state.setContent);

  const editor = useTipTap({
    immediatelyRender: false, // Fix for SSR hydration
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'text-gray-800 dark:text-gray-200',
          },
        },
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-200 pl-4 my-4',
          },
        },
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'italic',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'bg-gray-100 rounded px-1 py-0.5 font-mono text-sm',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Placeholder.configure({
        placeholder: options.placeholder || 'Start writing...',
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-200',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-200 p-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-200 p-2 bg-gray-50',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-md bg-gray-900 p-4',
          spellcheck: 'false',
        },
      }),
    ],
    content: options.content,
    editable: options.editable ?? true,
    autofocus: 'end',
    enableInputRules: true, // Enable markdown shortcuts while typing
    enablePasteRules: true, // Enable markdown shortcuts when pasting
    // Add custom keyboard shortcuts
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert focus:outline-none max-w-none',
      },
      handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
        // Handle Tab key for code blocks
        if (event.key === 'Tab' && editor?.isActive('codeBlock')) {
          event.preventDefault();
          editor?.chain().focus().insertContent('  ').run();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }: { editor: Editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  return editor as EditorWithTextAlign;
}
