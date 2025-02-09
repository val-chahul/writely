declare module '@tiptap/extension-link' {
  import { Node } from '@tiptap/core';
  export interface LinkOptions {
    openOnClick: boolean;
    linkOnPaste: boolean;
    HTMLAttributes: Record<string, string>;
  }
  const Link: Node<LinkOptions>;
  export default Link;
}

declare module '@tiptap/core' {
  export interface Editor {
    isActive: (name: string, options?: Record<string, unknown>) => boolean;
    chain: () => ChainedCommands;
    can: () => Commands;
    commands: Record<string, (...args: unknown[]) => unknown>;
    state: EditorState;
    view: EditorView;
    getText: () => string;
    getHTML: () => string;
  }

  export interface Commands extends ChainedCommands {
    chain: () => ChainedCommands;
    undo: () => boolean;
    redo: () => boolean;
    toggleBold: () => boolean;
    toggleItalic: () => boolean;
    toggleCode: () => boolean;
    toggleHeading: (attributes: { level: number }) => boolean;
    toggleBulletList: () => boolean;
    toggleOrderedList: () => boolean;
    toggleBlockquote: () => boolean;
    toggleCodeBlock: () => boolean;
    insertContent: (content: unknown) => boolean;
    setImage: (options: { src: string; alt?: string; title?: string }) => boolean;
    toggleLink: (attributes: { href: string; target: string | null }) => boolean;
  }

  export interface ChainedCommands {
    focus: () => ChainedCommands;
    deleteTable: () => ChainedCommands;
    addColumnBefore: () => ChainedCommands;
    addColumnAfter: () => ChainedCommands;
    addRowBefore: () => ChainedCommands;
    addRowAfter: () => ChainedCommands;
    undo: () => ChainedCommands;
    redo: () => ChainedCommands;
    toggleBold: () => ChainedCommands;
    toggleItalic: () => ChainedCommands;
    toggleCode: () => ChainedCommands;
    toggleHeading: (attributes: { level: number }) => ChainedCommands;
    toggleBulletList: () => ChainedCommands;
    toggleOrderedList: () => ChainedCommands;
    toggleBlockquote: () => ChainedCommands;
    toggleCodeBlock: () => ChainedCommands;
    insertTable: (options: {
      rows: number;
      cols: number;
      withHeaderRow?: boolean;
    }) => ChainedCommands;
    insertContent: (content: unknown) => ChainedCommands;
    setImage: (options: { src: string; alt?: string; title?: string }) => ChainedCommands;
    toggleLink: (attributes: { href: string; target: string | null }) => ChainedCommands;
    run: () => boolean;
  }

  export type CommandReturn = boolean;

  // ProseMirror types
  export interface EditorState {
    selection: {
      from: number;
      to: number;
      empty: boolean;
      $from: { pos: number };
      $to: { pos: number };
    };
    doc: {
      nodeAt: (pos: number) => unknown;
      resolve: (pos: number) => unknown;
      textBetween: (from: number, to: number, blockSeparator?: string, leafText?: string) => string;
    };
    tr: Record<string, unknown>;
  }

  export interface EditorView {
    state: EditorState;
    dispatch: (tr: Record<string, unknown>) => void;
    dom: HTMLElement;
  }
}
