import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { TagInput } from './TagInput';
import { Hash, X } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';

interface TagsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TagsDialog({ isOpen, onClose }: TagsDialogProps) {
  const { tags } = useEditorStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px] p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg">
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Manage Tags
          </DialogTitle>
          <p className="text-sm text-white/80 mt-1">
            Add tags to help organize and discover your content
          </p>
        </DialogHeader>

        <div className="p-6">
          <TagInput />

          {tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Tag Statistics</h3>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <dt className="text-xs text-muted-foreground">Total Tags</dt>
                  <dd className="text-2xl font-semibold mt-1">{tags.length}</dd>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <dt className="text-xs text-muted-foreground">Characters</dt>
                  <dd className="text-2xl font-semibold mt-1">
                    {tags.reduce((acc, tag) => acc + tag.length, 0)}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 bg-gray-50 dark:bg-gray-900/50 gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
