import React from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div<{ isCorrect: boolean }>`
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  background-color: ${props => props.isCorrect ? '#e8f5e9' : '#ffebee'};
`;

const Message = styled.p<{ isCorrect: boolean }>`
  margin: 0;
  color: ${props => props.isCorrect ? '#2e7d32' : '#c62828'};
  font-size: 16px;
  font-weight: 500;
`;

const Explanation = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
  color: #666;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

interface Props {
  isCorrect: boolean;
  explanation?: string; // Make explanation optional
  onNext: () => void;
  attemptCount: number;
  showSimplified: boolean;
}

const QuizFeedback: React.FC<Props> = ({
  isCorrect,
  explanation,
  onNext,
  attemptCount,
  showSimplified
}) => (
  <FeedbackContainer isCorrect={isCorrect}>
    <Message isCorrect={isCorrect}>
      {isCorrect ? 'Correct! Well done!' : 'Not quite right.'}
    </Message>
    {explanation && (
      <Explanation>{explanation}</Explanation>
    )}
    <ButtonGroup>
      <button onClick={onNext}>
        {showSimplified ? 'Try Simplified Version' : 'Next'}
      </button>
    </ButtonGroup>
  </FeedbackContainer>
);

export default QuizFeedback;