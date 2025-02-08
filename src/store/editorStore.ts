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
  setContent: (content: string) => void;
  setSeoData: (data: Partial<EditorState['seoData']>) => void;
  markAsSaved: () => void;
  resetState: () => void;
  setHistoryState: (state: { canUndo: boolean; canRedo: boolean }) => void;
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
      }),
    // Persist state methods
    lastAutoSave: null,
    enableAutosave: true,
    setEnableAutosave: (enable) => set({ enableAutosave: enable }),
    setHistoryState: (state: { canUndo: boolean; canRedo: boolean }) =>
      set({ historyState: state }),
  })),
);
