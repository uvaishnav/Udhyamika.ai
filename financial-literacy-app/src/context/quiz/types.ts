import { Quiz, QuizState } from '../../types/quiz';

export interface QuizContextState extends QuizState {
  quiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

export type QuizAction =
  | { type: 'SET_QUIZ'; payload: Quiz }
  | { type: 'SELECT_OPTION'; payload: number }
  | { type: 'SUBMIT_ANSWER'; payload: QuizState }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_ERROR'; payload: string };