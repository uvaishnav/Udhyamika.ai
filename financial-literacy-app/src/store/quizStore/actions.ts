import { QuizStoreActions, QuizStoreState } from './types';
import { Quiz } from '../../types/quiz';
import { StateCreator, StoreApi } from 'zustand';

type QuizSetState = StateCreator<
  QuizStoreState, 
  [], 
  [], 
  QuizStoreActions
>;

export const createQuizActions: QuizSetState = (set, get) => ({
  setQuiz: (quiz: Quiz) => 
    set((state) => ({ ...state, currentQuiz: quiz })),

  submitAnswer: (answer: number) => {
    const state = get();
    if (!state.currentQuiz) return;

    const isCorrect = answer === state.currentQuiz.correctAnswer;
    
    set((currentState) => ({
      ...currentState,
      state: {
        ...currentState.state,
        currentAttempt: currentState.state.currentAttempt + 1,
        score: isCorrect ? 100 : 0,
        completed: isCorrect,
        selectedOption: answer,
        isSubmitted: true,
        showSimplified: !isCorrect && currentState.state.currentAttempt >= 2
      }
    }));
  },

  resetQuiz: () => 
    set((state) => ({
      ...state,
      state: {
        currentAttempt: 0,
        score: 0,
        showSimplified: false,
        completed: false,
        selectedOption: null,
        isSubmitted: false
      }
    })),

  toggleSimplified: () => 
    set((state) => ({
      ...state,
      state: {
        ...state.state,
        showSimplified: !state.state.showSimplified
      }
    }))
});