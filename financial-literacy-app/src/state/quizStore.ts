import { create } from 'zustand';
import { Quiz, QuizState, QuizProgress } from '../types/quiz';

interface QuizStore {
  quiz: Quiz | null;
  state: QuizState;
  progress: QuizProgress;
  actions: {
    setQuiz: (quiz: Quiz) => void;
    selectOption: (option: number) => void;
    submitAnswer: () => void;
    resetQuiz: () => void;
    toggleSimplified: () => void;
  };
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  quiz: null,
  state: {
    currentAttempt: 0,
    score: 0,
    showSimplified: false,
    completed: false,
    selectedOption: null,
    isSubmitted: false
  },
  progress: {
    attempts: 0,
    correctAnswers: 0,
    simplified: false,
    lastAttemptDate: new Date()
  },
  actions: {
    setQuiz: (quiz: Quiz) => set({ quiz }),
    selectOption: (option: number) => 
      set(state => ({ 
        state: { ...state.state, selectedOption: option } 
      })),
    submitAnswer: () => {
      const { quiz, state } = get();
      if (!quiz || state.selectedOption === null) return;

      const isCorrect = state.selectedOption === quiz.correctAnswer;
      set(state => ({
        state: {
          ...state.state,
          currentAttempt: state.state.currentAttempt + 1,
          score: isCorrect ? 100 : 0,
          completed: isCorrect,
          isSubmitted: true,
          showSimplified: !isCorrect && state.state.currentAttempt >= 2
        },
        progress: {
          ...state.progress,
          attempts: state.progress.attempts + 1,
          correctAnswers: state.progress.correctAnswers + (isCorrect ? 1 : 0),
          lastAttemptDate: new Date()
        }
      }));
    },
    resetQuiz: () => set(state => ({
      state: {
        currentAttempt: 0,
        score: 0,
        showSimplified: false,
        completed: false,
        selectedOption: null,
        isSubmitted: false
      }
    })),
    toggleSimplified: () => set(state => ({
      state: { ...state.state, showSimplified: !state.state.showSimplified }
    }))
  }
}));