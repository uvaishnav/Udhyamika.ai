import { StateCreator } from 'zustand';
import { HistoryState, HistoryActions, HistoryEntry } from './types';

type HistorySlice = HistoryState & {
  actions: HistoryActions;
};

export const createHistoryActions: StateCreator<HistorySlice> = (set, get) => ({
  entries: [],
  loading: false,
  error: null,
  actions: {
    addEntry: (entry) => {
      const newEntry: HistoryEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date()
      };
      set((state) => ({
        entries: [...state.entries, newEntry]
      }));
    },
    
    clearHistory: () => {
      set({ entries: [] });
    },
    
    loadHistory: async (courseId, chapterId) => {
      set({ loading: true, error: null });
      try {
        // Simulated API call
        const entries = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        const filtered = entries.filter(
          (e: HistoryEntry) => 
            e.courseId === courseId && 
            e.chapterId === chapterId
        );
        set({ entries: filtered, loading: false });
      } catch (error) {
        set({ error: 'Failed to load history', loading: false });
      }
    }
  }
});