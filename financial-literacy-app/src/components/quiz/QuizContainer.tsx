import React from 'react';
import { Quiz } from '../../types/quiz';
import { useQuizManager } from '../../hooks/useQuizManager';
import QuizQuestion from './QuizQuestion';
import QuizOptions from './QuizOptions';
import {QuizProgress} from './QuizProgress';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

interface Props {
  quiz: Quiz;
  courseId: string;
  chapterId: string;
  onComplete: () => void;
}

const QuizContainer: React.FC<Props> = ({ quiz, courseId, chapterId, onComplete }) => {
  const { state, handleSubmit, setSelectedOption } = useQuizManager(
    courseId, 
    chapterId, 
    quiz, 
    onComplete
  );

  const attempts = state.attemptCount;
  const score = state.score;
  const showSimplified = state.showSimplified;

  return (
    <Container>
      <QuizQuestion question={quiz.question} />
      <QuizOptions
        options={quiz.options}
        selectedOption={state.selectedOption}
        onSelect={setSelectedOption}
      />
      <button 
        onClick={handleSubmit}
        disabled={state.selectedOption === null}
      >
        Submit Answer
      </button>
      <QuizProgress 
        attempts={attempts}
        showSimplified={showSimplified}
        score={score}
      />
    </Container>
  );
};

export default QuizContainer;