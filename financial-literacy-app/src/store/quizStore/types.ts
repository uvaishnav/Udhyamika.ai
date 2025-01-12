import { Quiz, QuizState, QuizProgress } from '../../types/quiz';

export interface QuizStoreState {
    currentQuiz: Quiz | null;
    state: QuizState;
    progress: QuizProgress;
}
  
export interface QuizStoreActions {
    setQuiz: (quiz: Quiz) => void;
    submitAnswer: (answer: number) => void;
    resetQuiz: () => void;
    toggleSimplified: () => void;
}

export interface QuizStore {
  currentQuiz: Quiz | null;
  progress: QuizProgress[];
  loading: boolean;
  error: string | null;
}