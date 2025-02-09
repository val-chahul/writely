import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { cn } from '@/lib/utils';

export function TagInput() {
  const [input, setInput] = useState('');
  const { tags, recentTags, suggestedTags, addTag, removeTag } = useEditorStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
      setInput('');
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
    setInput('');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 p-2 bg-background border rounded-lg min-h-[84px]">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? 'Add tags...' : ''}
          className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm placeholder:text-muted-foreground"
        />
      </div>

      {(input || tags.length === 0) && (suggestedTags.length > 0 || recentTags.length > 0) && (
        <div className="space-y-2">
          {suggestedTags.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Suggestions</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSuggestionClick(tag)}
                    className={cn(
                      'text-sm px-2.5 py-0.5 rounded-full border',
                      'hover:bg-muted transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-primary/20',
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recentTags.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Recent Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {recentTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSuggestionClick(tag)}
                    className={cn(
                      'text-sm px-2.5 py-0.5 rounded-full border',
                      'hover:bg-muted transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-primary/20',
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Press enter to add a tag, backspace to remove the last tag
      </p>
    </div>
  );
}
