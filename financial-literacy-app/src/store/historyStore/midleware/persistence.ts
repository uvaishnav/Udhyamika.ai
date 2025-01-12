import { StateCreator, StoreApi } from 'zustand';
import { storage } from '../utils/storage';
import { HistoryState, HistoryActions } from '../types';

type HistoryStore = HistoryState & { actions: HistoryActions };

export const persistMiddleware = <T extends HistoryStore>(
  config: StateCreator<T>
) =>
  (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], store: StoreApi<T>) => {
    const persistState = async (state: T) => {
      await storage.setItem('quiz-history', JSON.stringify({
        version: 1,
        data: state,
        timestamp: new Date().toISOString()
      }));
    };

    const hydrate = async () => {
      const stored = await storage.getItem('quiz-history');
      if (!stored) return;

      try {
        const { data, version } = JSON.parse(stored);
        if (version === 1) {
          set(data as T);
        }
      } catch (error) {
        console.error('Hydration failed:', error);
      }
    };

    hydrate();

    return config(
      (nextState) => {
        set(nextState);
        persistState(get());
      },
      get,
      store
    );
  };