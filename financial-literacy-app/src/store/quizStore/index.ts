import { create, StateCreator, StoreApi } from 'zustand';
import { Quiz, QuizState, QuizProgress } from '../../types/quiz';
import { QuizStoreState, QuizStoreActions } from './types';
import { createQuizActions } from './actions';

type Store = QuizStoreState & { actions: QuizStoreActions };

const initialState: QuizState = {
  currentAttempt: 0,
  score: 0,
  showSimplified: false,
  completed: false,
  selectedOption: null,
  isSubmitted: false
};

const initialProgress: QuizProgress = {
  attempts: 0,
  correctAnswers: 0,
  simplified: false,
  lastAttemptDate: new Date()
};

const initialStore: QuizStoreState = {
  currentQuiz: null,
  state: initialState,
  progress: initialProgress
};

type StoreCreator = StateCreator<Store, [], [], Store>;

const createStore: StoreCreator = (set, get, store) => ({
  ...initialStore,
  actions: createQuizActions(set, get, store)
});

export const useQuizStore = create(createStore);