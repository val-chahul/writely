import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Edit3, Eye, Columns } from 'lucide-react';
import { GlobalMarkdownDialogProps } from './types';
import MarkdownIt from 'markdown-it';
import frontMatter from 'front-matter';
import toast from 'react-hot-toast';

export const GlobalMarkdownDialog: React.FC<GlobalMarkdownDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onMetadataExtracted,
  initialContent = '',
  mode = 'edit',
}) => {
  const [markdownContent, setMarkdownContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState('edit');
  const [previousTab, setPreviousTab] = useState('edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMarkdownContent(initialContent);
      setError(null);
    }
  }, [isOpen, initialContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setMarkdownContent(newContent);
    setError(null);

    try {
      const { attributes } = frontMatter(newContent);
      onMetadataExtracted?.(attributes);
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
    }
  };

  const handleViewChange = (view: string) => {
    if (view === 'split') {
      if (activeTab === 'split') {
        setActiveTab(previousTab);
      } else {
        setPreviousTab(activeTab);
        setActiveTab('split');
      }
    } else {
      setActiveTab(view);
    }
  };

  const handleSave = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (!markdownContent.trim()) {
        throw new Error('Content cannot be empty');
      }

      const { attributes, body } = frontMatter(markdownContent);

      if (mode === 'import' && (!attributes.type || !attributes.title)) {
        throw new Error('Import requires type and title in frontmatter');
      }

      await onSave(mode === 'import' ? markdownContent : body.trim(), attributes);
      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast.error(error instanceof Error ? error.message : 'Failed to save content');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !isSubmitting && !open && onClose()}>
      <DialogContent
        className={`${activeTab === 'split' ? 'max-w-[90vw]' : 'max-w-3xl'} h-[90vh] p-0`}
      >
        <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/50 bg-[size:3rem_3rem] opacity-20" />
          <DialogHeader className="relative px-6 py-4 border-b bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg backdrop-blur-md">
            <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2 text-shadow">
              <FileText className="w-5 h-5" />
              {mode === 'import' ? 'Import Markdown Content' : 'Global Markdown Editor'}
            </DialogTitle>
            {mode === 'import' && (
              <p className="text-sm text-white/90 mt-1 leading-relaxed tracking-wide">
                Paste your markdown content with YAML frontmatter (type and title required)
              </p>
            )}
          </DialogHeader>

          <div className="flex-1 flex min-h-0">
            <div
              className={`flex-1 flex flex-col ${activeTab === 'split' ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}
            >
              <div className="relative px-6 py-3 border-b bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Button
                    variant={activeTab === 'edit' ? 'default' : 'ghost'}
                    onClick={() => handleViewChange('edit')}
                    className="gap-2 h-8 px-3 transition-premium hover:shadow-sm"
                    disabled={activeTab === 'split'}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </Button>
                  <Button
                    variant={activeTab === 'preview' ? 'default' : 'ghost'}
                    onClick={() => handleViewChange('preview')}
                    className="gap-2 h-8 px-3 transition-premium hover:shadow-sm"
                    disabled={activeTab === 'split'}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Preview</span>
                  </Button>
                  <Button
                    variant={activeTab === 'split' ? 'default' : 'ghost'}
                    onClick={() => handleViewChange('split')}
                    className="gap-2 h-8 px-3 transition-premium hover:shadow-sm"
                  >
                    <Columns className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {activeTab === 'split' ? 'Single View' : 'Split View'}
                    </span>
                  </Button>
                </div>
              </div>

              <div
                className={`flex-1 flex min-h-0 ${activeTab === 'split' ? 'divide-x divide-gray-200 dark:divide-gray-700' : ''}`}
              >
                {(activeTab === 'edit' || activeTab === 'split') && (
                  <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'} p-4`}>
                    <Textarea
                      value={markdownContent}
                      onChange={handleContentChange}
                      className="w-full h-full min-h-[calc(100vh-15rem)] font-mono text-sm 
                        bg-gray-50/50 dark:bg-gray-800/50 border-0 resize-none 
                        focus-visible:ring-2 focus-visible:ring-primary-500/20 rounded-lg 
                        transition-premium hover:bg-gray-100/50 dark:hover:bg-gray-700/50 
                        shadow-inner-light focus-visible:shadow-none
                        scrollbar-premium"
                      placeholder={
                        mode === 'import'
                          ? '---\ntype: news\ntitle: Your Title\nstatus: draft\n---\n\n# Your content here...'
                          : '# Start writing your content here...'
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                {(activeTab === 'preview' || activeTab === 'split') && (
                  <div
                    className={`${
                      activeTab === 'split' ? 'w-1/2' : 'w-full'
                    } p-6 overflow-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm scrollbar-premium`}
                  >
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert 
                        hover:prose-a:text-primary-500 prose-headings:font-semibold 
                        prose-headings:tracking-tight prose-a:text-primary-600 
                        dark:prose-a:text-primary-400 prose-headings:scroll-mt-20
                        prose-img:shadow-premium prose-img:rounded-lg prose-img:transition-premium
                        prose-img:hover:shadow-premium-lg prose-img:hover:-translate-y-0.5"
                      dangerouslySetInnerHTML={{
                        __html: new MarkdownIt({
                          html: true,
                          breaks: true,
                          linkify: true,
                        }).render(markdownContent),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative px-6 py-4 border-t bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-xl flex items-center justify-between transition-premium">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {mode === 'import'
                  ? 'Paste your markdown content with YAML frontmatter'
                  : 'Edit your content in markdown format'}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-premium hover:shadow-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSubmitting || !markdownContent.trim()}
                className="bg-gradient-to-r from-primary-600 to-primary-500 
                  hover:from-primary-700 hover:to-primary-600 text-white 
                  shadow-md hover:shadow-lg transition-premium 
                  hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin filter drop-shadow" />
                    {mode === 'import' ? 'Importing...' : 'Saving...'}
                  </div>
                ) : mode === 'import' ? (
                  'Import'
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
