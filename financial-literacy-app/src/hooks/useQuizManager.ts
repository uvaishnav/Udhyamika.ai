import { useState, useCallback } from 'react';
import { Quiz, QuizManagerState, QuizSubmission } from '../types/quiz';
import { useQuizProgress } from './useQuizProgress';

export const useQuizManager = (
  courseId: string,
  chapterId: string,
  quiz: Quiz,
  onComplete: () => void
) => {
  const [state, setState] = useState<QuizManagerState>({
    selectedOption: null,
    showFeedback: false,
    isCorrect: false,
    attemptCount: 0,
    showSimplified: false,
    score: 0,
    isSubmitted: false,
    currentStep: 'quiz'
  });

  const { addAttempt } = useQuizProgress(courseId, chapterId, quiz.id);

  const handleSubmit = useCallback(async () => {
    if (state.selectedOption === null) return;

    const isCorrect = state.selectedOption === quiz.correctAnswer;
    const newAttemptCount = state.attemptCount + 1;

    await addAttempt(
      isCorrect ? 100 : 0,
      state.showSimplified
    );

    setState(prev => ({
      ...prev,
      attemptCount: newAttemptCount,
      score: isCorrect ? 100 : 0,
      isCorrect,
      isSubmitted: true,
      showSimplified: !isCorrect && newAttemptCount >= 2,
      currentStep: isCorrect 
        ? 'result' 
        : newAttemptCount >= 2 
          ? 'simplified' 
          : 'quiz'
    }));

    if (isCorrect) {
      onComplete();
    }
  }, [state.selectedOption, state.showSimplified, quiz.correctAnswer, addAttempt, onComplete]);

  return {
    state,
    handleSubmit,
    setSelectedOption: (option: number) => setState(prev => ({ ...prev, selectedOption: option })),
    resetQuiz: () => setState({
      selectedOption: null,
      showFeedback: false,
      isCorrect: false,
      attemptCount: 0,
      showSimplified: false,
      score: 0,
      isSubmitted: false,
      currentStep: 'quiz'
    })
  };
};