import React from 'react';
import styled from 'styled-components';
import { Quiz } from '../../../types/quiz';
import { useQuizState } from '../../../hooks/useQuizState';
import QuizQuestion from '../QuizQuestion';
import QuizOptions from '../QuizOptions';
import QuizFeedback from '../feedback/QuizFeedback';

const Container = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

interface Props {
  quiz: Quiz;
  courseId: string;
  chapterId: string;
  onComplete: () => void;
}

const SimplifiedQuiz: React.FC<Props> = ({
  quiz,
  courseId,
  chapterId,
  onComplete
}) => {
  const {
    state,
    setSelectedOption,
    handleSubmit,
    resetQuiz
  } = useQuizState(quiz, courseId, chapterId, onComplete);

  return (
    <Container>
      <Header>
        <h3>Simplified Version</h3>
        <p>Try this simpler version of the question</p>
      </Header>

      <QuizQuestion 
        question={quiz.simplifiedVersion?.question || quiz.question} 
      />

      <QuizOptions
        options={quiz.simplifiedVersion?.options || quiz.options}
        selectedOption={state.selectedOption}
        onSelect={setSelectedOption}
        disabled={state.showFeedback}
      />

      {state.showFeedback && (
        <QuizFeedback
          quiz={quiz}
          isCorrect={state.isCorrect}
          showSimplified={false}
          onTrySimplified={() => {}}
          onRetry={resetQuiz}
        />
      )}

      <button 
        onClick={handleSubmit}
        disabled={state.selectedOption === null || state.showFeedback}
      >
        Submit Answer
      </button>
    </Container>
  );
};

export default SimplifiedQuiz;