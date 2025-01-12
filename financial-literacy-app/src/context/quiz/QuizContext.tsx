import React, { createContext, useContext, useReducer } from 'react';
import { QuizManager } from '../../services/quizManager';
import { QuizContextState, QuizAction } from './types';
import { initialState, quizReducer } from './QuizReducer';

const QuizContext = createContext<{
  state: QuizContextState;
  dispatch: React.Dispatch<QuizAction>;
  quizManager: QuizManager;
} | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const quizManager = new QuizManager();

  return (
    <QuizContext.Provider value={{ state, dispatch, quizManager }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};