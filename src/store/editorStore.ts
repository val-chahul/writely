import { create } from 'zustand';

interface EditorState {
  content: string;
  isDirty: boolean;
  lastSaved: Date | null;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  setContent: (content: string) => void;
  setSeoData: (data: Partial<EditorState['seoData']>) => void;
  markAsSaved: () => void;
  resetState: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: '',
  isDirty: false,
  lastSaved: null,
  seoData: {
    title: '',
    description: '',
    keywords: [],
  },
  setContent: (content) =>
    set((state) => ({
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
      seoData: {
        title: '',
        description: '',
        keywords: [],
      },
    }),
}));
