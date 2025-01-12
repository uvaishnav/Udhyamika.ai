import React from 'react';
import { Quiz } from '../../types/quiz';
import { useQuizStore } from '../../store/quizStore';
import QuizContainer from './QuizContainer';
import QuizResult from './QuizResult';
import SimplifiedQuiz from './simplified/SimplifiedQuiz';

interface Props {
  quiz: Quiz;
  courseId: string;
  chapterId: string;
  onComplete: () => void;
}

const QuizManager: React.FC<Props> = ({
  quiz,
  courseId,
  chapterId,
  onComplete
}) => {
  const { state, actions } = useQuizStore();
  
  React.useEffect(() => {
    actions.setQuiz(quiz);
    return () => actions.resetQuiz();
  }, [quiz, actions]);

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      onComplete();
    }
  };

  if (state.isSubmitted) {
    return (
      <QuizResult
        result={{
          score: state.score,
          passed: state.score >= 70,
          correctAnswers: state.score >= 70 ? 1 : 0,
          totalQuestions: 1,
          comment: state.score >= 70 
            ? 'Great job! You can move to the next section.'
            : 'Keep trying, you\'ll get it!'
        }}
        attemptCount={state.attemptCount}
        onContinue={onComplete}
        onRetry={() => actions.resetQuiz()}
      />
    );
  }

  return state.showSimplified ? (
    <SimplifiedQuiz
      quiz={quiz}
      courseId={courseId}
      chapterId={chapterId}
      onComplete={() => handleQuizComplete(true)}
    />
  ) : (
    <QuizContainer
      quiz={quiz}
      courseId={courseId}
      chapterId={chapterId}
      onComplete={() => handleQuizComplete(true)}
    />
  );
};

export default QuizManager;