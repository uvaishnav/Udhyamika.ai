import { useState, useEffect } from 'react';
import { Quiz, QuizState, QuizSubmission } from '../types/quiz';
import { useQuizProgress } from './useQuizProgress';

export const useQuiz = (
  courseId: string,
  chapterId: string,
  quiz: Quiz
) => {
  const [state, setState] = useState<QuizState>({
    selectedOption: null,
    showFeedback: false,
    isCorrect: false,
    attemptCount: 0,
    showSimplified: false,
    score: 0,
    isSubmitted: false
  });

  const { attempts, addAttempt } = useQuizProgress(courseId, chapterId, quiz.id);

  const submitAnswer = async (submission: QuizSubmission) => {
    const isCorrect = submission.answers[0].selectedOption === quiz.correctAnswer;
    const score = isCorrect ? 100 : 0;
    
    await addAttempt(score, state.showSimplified);
    
    setState(prev => ({
      ...prev,
      attemptCount: prev.attemptCount + 1,
      showSimplified: !isCorrect && prev.attemptCount >= 2,
      score,
      isSubmitted: true,
      isCorrect
    }));
  };

  return {
    state,
    submitAnswer,
    setSelectedOption: (option: number) => setState(prev => ({ ...prev, selectedOption: option })),
    resetQuiz: () => setState({
      selectedOption: null,
      showFeedback: false,
      isCorrect: false,
      attemptCount: 0,
      showSimplified: false,
      score: 0,
      isSubmitted: false
    })
  };
};