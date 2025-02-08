declare module '@tiptap/core' {
  export interface Editor {
    isActive: (name: string, options?: Record<string, any>) => boolean;
    chain: () => ChainedCommands;
    can: () => Commands;
    commands: Record<string, (...args: any[]) => any>;
    state: any;
    view: any;
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
    insertContent: (content: any) => boolean;
    setImage: (options: { src: string; alt?: string; title?: string }) => boolean;
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
    insertContent: (content: any) => ChainedCommands;
    setImage: (options: { src: string; alt?: string; title?: string }) => ChainedCommands;
    run: () => boolean;
  }

  export type CommandReturn = boolean;
}
