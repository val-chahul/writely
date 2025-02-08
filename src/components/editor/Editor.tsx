import { EditorContent } from '@tiptap/react';
import { useEditor } from '../../hooks/useEditor';
import { Toolbar } from './Toolbar';
import { useEditorStore } from '../../store/editorStore';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';

export function Editor() {
  const content = useEditorStore((state) => state.content);
  const isDirty = useEditorStore((state) => state.isDirty);
  const markAsSaved = useEditorStore((state) => state.markAsSaved);
  const { theme } = useTheme();

  const editor = useEditor({
    content: content || '<p>Start writing your blog post...</p>',
    placeholder: 'Begin typing...',
  });

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (isDirty && content) {
      try {
        // Here you would typically make an API call to save the content
        // For now, we'll just simulate saving
        await new Promise((resolve) => setTimeout(resolve, 500));
        markAsSaved();
        toast.success('Changes saved', {
          className: `premium-backdrop backdrop-blur-md ${theme === 'dark' ? 'dark' : ''}`,
        });
      } catch (error) {
        toast.error('Failed to save changes', {
          className: `premium-backdrop backdrop-blur-md ${theme === 'dark' ? 'dark' : ''}`,
        });
      }
    }
  }, [isDirty, content, markAsSaved]);

  useEffect(() => {
    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [autoSave]);

  // Save on Ctrl+S / Cmd+S
  useEffect(() => {
    const handleSave = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        autoSave();
      }
    };

    window.addEventListener('keydown', handleSave);
    return () => window.removeEventListener('keydown', handleSave);
  }, [autoSave]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative flex flex-col h-full transition-premium">
      <div className="fixed inset-0 bg-gradient-to-b from-editor-background via-editor-background to-editor-background/95 transition-premium -z-10" />
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:3rem_3rem] -z-10 transition-premium" />
      {/* Floating save indicator */}
      {isDirty && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 premium-backdrop rounded-full shadow-lg hover:shadow-xl transition-premium group">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm text-editor-muted">Unsaved changes</span>
            <button
              onClick={autoSave}
              className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-500 
                rounded-full hover:from-primary-700 hover:to-primary-600 transition-premium shadow-md 
                hover:shadow-lg active:shadow-sm transform hover:-translate-y-0.5 active:translate-y-0
                group-hover:shadow-primary-500/25"
            >
              Save now
            </button>
          </div>
        </div>
      )}

      <div
        className="sticky top-0 z-40 backdrop-blur-xl bg-editor-surface/80 border-b border-editor-border/50 
        shadow-lg transition-premium hover:bg-editor-surface/90 hover:shadow-xl"
      >
        <Toolbar editor={editor} />
      </div>

      <div className="flex-grow overflow-y-auto px-4 md:px-8 py-6 md:py-12 animate-fade-in">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-editor-surface/50 to-transparent opacity-50 rounded-xl transition-premium" />
          <EditorContent
            editor={editor}
            className="editor-content relative min-h-[calc(100vh-12rem)] rounded-xl w-full 
              bg-editor-surface/30 backdrop-blur-sm shadow-2xl ring-1 ring-editor-border/10 p-8 
              transition-premium group
              hover:ring-editor-border/20 hover:shadow-3xl hover:bg-editor-surface/40
              focus-within:ring-primary-500/20 focus-within:shadow-primary-500/5"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-editor-border/5 rounded-xl pointer-events-none" />
        </div>
      </div>

      {/* Word and character count */}
      <div
        className="fixed bottom-6 left-6 text-sm text-editor-muted premium-backdrop 
        px-3 py-1.5 rounded-full animate-fade-in flex items-center gap-3 
        hover:bg-editor-surface/90 transition-premium hover:shadow-lg
        hover:-translate-y-0.5 active:translate-y-0"
      >
        <span>{editor.getText().trim().split(/\s+/).length} words</span>
        <span className="w-px h-3 bg-editor-border/50" />
        <span>{editor.getText().length} characters</span>
      </div>
    </div>
  );
}
