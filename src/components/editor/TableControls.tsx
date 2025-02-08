import React from 'react';
import { Button } from '../ui/button';
import { TableControlsProps } from './types';
import {
  Trash2,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  ArrowDownToLine,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const TableControls: React.FC<TableControlsProps> = ({
  editor,
  onDeleteTable,
  onAddColumnBefore,
  onAddColumnAfter,
  onAddRowBefore,
  onAddRowAfter,
}) => {
  if (!editor) return null;

  return (
    <TooltipProvider>
      <div className="relative flex items-center gap-1.5 p-1.5 premium-backdrop rounded-lg shadow-lg transition-premium animate-slide-in-bottom group hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-premium" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onDeleteTable}
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 
                transition-premium hover:bg-red-100/80 dark:hover:bg-red-900/20 
                hover:-translate-y-0.5 active:translate-y-0 hover:shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-red-500 text-white border-red-600/50">
            Delete table
          </TooltipContent>
        </Tooltip>

        <div className="w-px h-4 bg-border/50 transform transition-premium group-hover:scale-y-125" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onAddColumnBefore}
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 hover:text-primary-600 dark:hover:text-primary-400 
                transition-premium hover:bg-primary-100/80 dark:hover:bg-primary-900/20 
                hover:-translate-y-0.5 active:translate-y-0 hover:shadow-sm"
            >
              <ArrowLeftToLine className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-popover/95 backdrop-blur-sm border-border/50">
            Add column before
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onAddColumnAfter}
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 hover:text-primary-600 dark:hover:text-primary-400 
                transition-premium hover:bg-primary-100/80 dark:hover:bg-primary-900/20 
                hover:-translate-y-0.5 active:translate-y-0 hover:shadow-sm"
            >
              <ArrowRightToLine className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-popover/95 backdrop-blur-sm border-border/50">
            Add column after
          </TooltipContent>
        </Tooltip>

        <div className="w-px h-4 bg-border/50 transform transition-premium group-hover:scale-y-125" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onAddRowBefore}
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 hover:text-primary-600 dark:hover:text-primary-400 
                transition-premium hover:bg-primary-100/80 dark:hover:bg-primary-900/20 
                hover:-translate-y-0.5 active:translate-y-0 hover:shadow-sm"
            >
              <ArrowUpToLine className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-popover/95 backdrop-blur-sm border-border/50">
            Add row before
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onAddRowAfter}
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 hover:text-primary-600 dark:hover:text-primary-400 
                transition-premium hover:bg-primary-100/80 dark:hover:bg-primary-900/20 
                hover:-translate-y-0.5 active:translate-y-0 hover:shadow-sm"
            >
              <ArrowDownToLine className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-popover/95 backdrop-blur-sm border-border/50">
            Add row after
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
