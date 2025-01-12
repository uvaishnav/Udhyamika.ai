import { QuizContextState, QuizAction } from './types';

export const initialState: QuizContextState = {
  quiz: null,
  selectedOption: null,
  showFeedback: false,
  isCorrect: false,
  attemptCount: 0,
  showSimplified: false,
  score: 0,
  isSubmitted: false,
  loading: false,
  error: null
};

export function quizReducer(state: QuizContextState, action: QuizAction): QuizContextState {
  switch (action.type) {
    case 'SET_QUIZ':
      return { ...state, quiz: action.payload };
    case 'SELECT_OPTION':
      return { ...state, selectedOption: action.payload };
    case 'SUBMIT_ANSWER':
      return { ...state, ...action.payload };
    case 'RESET_QUIZ':
      return { ...initialState, quiz: state.quiz };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}