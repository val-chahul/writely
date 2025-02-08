declare module 'markdown-it' {
  interface MarkdownItOptions {
    html?: boolean;
    breaks?: boolean;
    linkify?: boolean;
  }

  class MarkdownIt {
    constructor(options?: MarkdownItOptions);
    render(content: string): string;
  }

  export = MarkdownIt;
}
