import { StateCreator } from 'zustand';
import { EditorState } from '../editorStore';

const STORAGE_KEY = 'writely-editor-state';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export interface PersistState {
  lastAutoSave: Date | null;
  enableAutosave: boolean;
  setEnableAutosave: (enable: boolean) => void;
}

type PersistStateWithoutMethods = Omit<PersistState, 'setEnableAutosave'>;
type EditorStateWithoutMethods = Omit<
  EditorState,
  'setContent' | 'setSeoData' | 'markAsSaved' | 'resetState' | 'setEnableAutosave'
>;

export const withPersist = <T extends EditorState>(config: StateCreator<T>): StateCreator<T> => {
  return (set, get, api) => {
    // Setup autosave interval
    let autoSaveInterval: NodeJS.Timeout | null = null;

    // Load initial state from localStorage (only in browser)
    let parsedState = null;
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STORAGE_KEY);
      parsedState = savedState ? JSON.parse(savedState) : null;
    }

    // Cleanup function for autosave interval
    const cleanup = () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
      }
    };

    // Handle beforeunload to cleanup
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', cleanup);
    }

    const result = config(
      (args) => {
        set((state) => {
          const newState = typeof args === 'function' ? args(state) : args;

          // Save to localStorage on state changes (only in browser)
          if (typeof window !== 'undefined') {
            const stateToSave: Partial<EditorStateWithoutMethods> = {
              content: newState.content,
              seoData: newState.seoData,
              lastAutoSave: new Date(),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
          }

          return {
            ...newState,
            lastAutoSave: new Date(),
          };
        });
      },
      get,
      api,
    );

    // Apply saved state if exists
    if (parsedState) {
      const savedState: Partial<EditorStateWithoutMethods> = {
        content: parsedState.content || '',
        seoData: parsedState.seoData || { title: '', description: '', keywords: [] },
        lastAutoSave: parsedState.lastAutoSave ? new Date(parsedState.lastAutoSave) : null,
        isDirty: false,
      };
      set(savedState as Partial<T>);
    }

    // Setup autosave functionality only in browser
    if (typeof window !== 'undefined') {
      // Wait for next tick to ensure state is initialized
      setTimeout(() => {
        const state = get();
        if (state?.enableAutosave) {
          cleanup(); // Clear any existing interval
          autoSaveInterval = setInterval(() => {
            const currentState = get();
            if (currentState?.isDirty) {
              const stateToSave: Partial<EditorStateWithoutMethods & PersistStateWithoutMethods> = {
                lastAutoSave: new Date(),
                isDirty: false,
              };
              set(stateToSave as Partial<T>);
            }
          }, AUTO_SAVE_INTERVAL);
        }
      }, 0);
    }

    return {
      ...result,
      cleanup,
    };
  };
};
