'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'cmdk';
import { Share2, Save, CommandIcon, Search, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { SEOSidebar } from '../components/seo-sidebar';
import { analyzeSEO } from '../utils/seo-analyzer';
import type { SEOAnalysis } from '../utils/seo-analyzer';
import { Editor } from '../components/editor/Editor';
import { useEditorStore } from '../store/editorStore';
import { Toaster } from 'sonner';

export default function EditorPage() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const content = useEditorStore((state) => state.content);
  const [targetKeyword, setTargetKeyword] = useState('');
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metaDescription, setMetaDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Add keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Analyze SEO
  const analyzeSEOContent = () => {
    if (!content || !targetKeyword) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = analyzeSEO(content, targetKeyword);
      setSeoAnalysis(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze SEO');
      setSeoAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 md:px-8 py-6">
      <header className="border bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl sticky top-6 z-50 rounded-lg shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Writely</h1>
            <Badge variant="secondary" className="font-medium">
              Beta
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="text-gray-700 dark:text-gray-300"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:rotate-90 dark:-scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowCommandPalette(true)}>
                    <CommandIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Command Palette (⌘K)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
      </header>

      <main className="h-[calc(100vh-8rem)] mt-6">
        <div className="flex h-full gap-6">
          <div className="flex-1 overflow-hidden relative">
            <Card className="h-full overflow-hidden">
              <Editor />
            </Card>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          {isAnalyzing ? (
            <div className="animate-pulse">Analyzing content...</div>
          ) : (
            seoAnalysis && <SEOSidebar analysis={seoAnalysis} targetKeyword={targetKeyword} />
          )}
        </div>
      </main>

      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="w-full max-w-lg mx-auto mt-32"
            >
              <Command className="rounded-lg border shadow-lg">
                <div className="flex items-center border-b px-3">
                  <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="h-12 focus:outline-none bg-transparent flex-1"
                  />
                </div>
                <Command.List className="p-2">
                  <Command.Group heading="Actions">
                    <Command.Item className="p-2 rounded-md hover:bg-accent cursor-pointer">
                      Format Selection as Code
                    </Command.Item>
                    <Command.Item className="p-2 rounded-md hover:bg-accent cursor-pointer">
                      Insert Table
                    </Command.Item>
                    <Command.Item className="p-2 rounded-md hover:bg-accent cursor-pointer">
                      Add Image
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            'premium-backdrop backdrop-blur-md border border-gray-200/20 dark:border-gray-700/20',
          style: {
            background: 'transparent',
            color: 'inherit',
          },
        }}
      />
    </div>
  );
}
