import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Link, ExternalLink, X } from 'lucide-react';

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, text: string, openInNewTab: boolean) => void;
  initialText?: string;
  initialUrl?: string;
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialText = '',
  initialUrl = '',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [text, setText] = useState(initialText);
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const handleSubmit = () => {
    onSubmit(url, text, openInNewTab);
    setUrl('');
    setText('');
    setOpenInNewTab(false);
    onClose();
  };

  const isExternalLink = url.startsWith('http://') || url.startsWith('https://');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px] p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg">
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <Link className="w-5 h-5" />
            Insert Link
          </DialogTitle>
          <p className="text-sm text-white/80 mt-1">
            Add links to enhance your content with references and citations
          </p>
        </DialogHeader>

        <div className="grid gap-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium flex items-center gap-1.5">
                URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the URL..."
                className="h-9 transition-all duration-200 hover:ring-2 hover:ring-primary-500/20"
              />
              {isExternalLink && (
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  This is an external link
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="text" className="text-sm font-medium">
                Link Text
              </Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Display text for the link..."
                className="h-9"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If left empty, the URL will be displayed as the link text
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="newTab"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <Label htmlFor="newTab" className="text-sm cursor-pointer select-none">
                Open in new tab
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-gray-50 dark:bg-gray-900/50 gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!url.trim()}
            className="gap-2 min-w-[100px] bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link className="w-4 h-4" />
            Insert Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
