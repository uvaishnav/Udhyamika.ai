import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { HistoryState, HistoryActions } from './types';
import { createHistoryActions } from './action';

interface HistoryStore extends HistoryState {
  actions: HistoryActions;
}

const initialState: HistoryState = {
  entries: [],
  loading: false,
  error: null
};

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get, store) => ({
      ...initialState,
      ...createHistoryActions(set, get, store)
    }),
    {
      name: 'quiz-history-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        entries: state.entries
      })
    }
  )
);