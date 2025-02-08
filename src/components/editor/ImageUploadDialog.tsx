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
import { ImageUploadDialogProps } from './types';
import { ImageIcon, UploadCloud, X } from 'lucide-react';

export const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onUpload,
  file,
}) => {
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      onUpload(url, alt, caption);
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !uploading && !open && onClose()}>
      <DialogContent className="sm:max-w-[525px] p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg">
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Upload Image
          </DialogTitle>
          <p className="text-sm text-white/80 mt-1">Add images to enhance your content</p>
        </DialogHeader>
        <div className="grid gap-6 p-6">
          {file && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg ring-1 ring-gray-900/5 transition-all duration-200 group">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <span className="truncate">{file.name}</span>
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alt" className="text-sm font-medium flex items-center gap-1.5">
                Alt Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image for accessibility..."
                className="h-9 transition-all duration-200 hover:ring-2 hover:ring-primary-500/20"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Provide a clear description of the image for screen readers and SEO.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption" className="text-sm font-medium">
                Caption
              </Label>
              <Input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption to display below the image..."
                className="h-9"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={uploading}
            className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={uploading || !file || !alt.trim()}
            className="gap-2 min-w-[100px] bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-200"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
