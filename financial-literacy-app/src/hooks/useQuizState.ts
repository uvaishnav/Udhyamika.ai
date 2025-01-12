import { useState, useCallback } from 'react';
import { Quiz, QuizState, QuizSubmission } from '../types/quiz';
import { useQuizProgress } from './useQuizProgress';
import { useQuiz } from '../context/quiz/QuizContext';

export const useQuizState = (
  quiz: Quiz,
  courseId: string,
  chapterId: string,
  onComplete: (submission: QuizSubmission) => void
) => {
  const { quizManager } = useQuiz();
  const [state, setState] = useState<QuizState>({
    selectedOption: null,
    showFeedback: false,
    isCorrect: false,
    attemptCount: 0,
    showSimplified: false,
    score: 0,
    isSubmitted: false
  });

  const { addAttempt } = useQuizProgress(courseId, chapterId, quiz.id);

  const handleSubmit = useCallback(async () => {
    if (state.selectedOption === null) return;

    const isCorrect = state.selectedOption === quiz.correctAnswer;
    const score = isCorrect ? 100 : 0;
    const newAttemptCount = state.attemptCount + 1;

    setState(prev => ({
      ...prev,
      showFeedback: true,
      isCorrect,
      attemptCount: newAttemptCount,
      score,
      isSubmitted: true,
      showSimplified: !isCorrect && newAttemptCount >= 2
    }));

    await addAttempt(score, state.showSimplified);

    if (isCorrect) {
      onComplete({
        answers: [{
          questionId: quiz.id,
          selectedOption: state.selectedOption,
          isCorrect
        }],
        totalScore: score
      });
    }
  }, [state.selectedOption, quiz, addAttempt, onComplete]);

  return {
    state,
    setSelectedOption: (option: number) => 
      setState(prev => ({ ...prev, selectedOption: option })),
    handleSubmit,
    resetQuiz: () => 
      setState(prev => ({
        ...prev,
        showFeedback: false,
        selectedOption: null,
        isSubmitted: false,
        score: 0
      }))
  };
};