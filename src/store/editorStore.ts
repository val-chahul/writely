import { create } from 'zustand';
import { withPersist, PersistState } from './middleware/persist';

export interface EditorState extends PersistState {
  content: string;
  isDirty: boolean;
  lastSaved: Date | null;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  historyState: {
    canUndo: boolean;
    canRedo: boolean;
  };
  tags: string[];
  recentTags: string[];
  suggestedTags: string[];
  setContent: (content: string) => void;
  setSeoData: (data: Partial<EditorState['seoData']>) => void;
  markAsSaved: () => void;
  resetState: () => void;
  setHistoryState: (state: { canUndo: boolean; canRedo: boolean }) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  updateSuggestedTags: (content: string) => void;
}

export const useEditorStore = create<EditorState>()(
  withPersist((set) => ({
    content: '',
    isDirty: false,
    lastSaved: null,
    seoData: {
      title: '',
      description: '',
      keywords: [],
    },
    historyState: {
      canUndo: false,
      canRedo: false,
    },
    tags: [],
    recentTags: [],
    suggestedTags: [],
    setContent: (content) =>
      set(() => ({
        content,
        isDirty: true,
      })),
    setSeoData: (data) =>
      set((state) => ({
        seoData: { ...state.seoData, ...data },
        isDirty: true,
      })),
    markAsSaved: () =>
      set({
        isDirty: false,
        lastSaved: new Date(),
      }),
    resetState: () =>
      set({
        content: '',
        isDirty: false,
        lastSaved: null,
        lastAutoSave: null,
        enableAutosave: true,
        seoData: {
          title: '',
          description: '',
          keywords: [],
        },
        historyState: {
          canUndo: false,
          canRedo: false,
        },
        tags: [],
        recentTags: [],
        suggestedTags: [],
      }),

    addTag: (tag: string) =>
      set((state) => {
        const normalizedTag = tag.toLowerCase().trim();
        if (state.tags.includes(normalizedTag)) return state;

        // Add to recent tags if not already present
        const updatedRecentTags = [
          normalizedTag,
          ...state.recentTags.filter((t) => t !== normalizedTag),
        ].slice(0, 10); // Keep only last 10 tags

        return {
          tags: [...state.tags, normalizedTag],
          recentTags: updatedRecentTags,
          isDirty: true,
        };
      }),

    removeTag: (tag: string) =>
      set((state) => ({
        tags: state.tags.filter((t) => t !== tag),
        isDirty: true,
      })),

    updateSuggestedTags: (content: string) =>
      set((state) => {
        // Extract potential tags from content (e.g., important words, entities)
        const words = content
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 3) // Filter out short words
          .filter((word) => !state.tags.includes(word)) // Filter out existing tags
          .slice(0, 5); // Limit to 5 suggestions

        return {
          suggestedTags: words,
        };
      }),
    // Persist state methods
    lastAutoSave: null,
    enableAutosave: true,
    setEnableAutosave: (enable) => set({ enableAutosave: enable }),
    setHistoryState: (state: { canUndo: boolean; canRedo: boolean }) =>
      set({ historyState: state }),
  })),
);
