import React from 'react';
import styled from 'styled-components';

interface FeedbackContainerProps {
    $isCorrect: boolean;
}

const FeedbackContainer = styled.div<FeedbackContainerProps>`
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: ${props => props.$isCorrect ? '#d4edda' : '#f8d7da'};
`;

interface Props {
    isCorrect: boolean;
    explanation: string;
    onNext: () => void;
}

const QuizFeedback: React.FC<Props> = ({ isCorrect, explanation, onNext }) => {
    return (
      <FeedbackContainer $isCorrect={isCorrect}>
        <h3>{isCorrect ? 'Correct!' : 'Not quite right'}</h3>
        <p>{explanation}</p>
        <button onClick={onNext}>Continue</button>
      </FeedbackContainer>
    );
};

export default QuizFeedback;