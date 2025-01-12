import React from 'react';
import styled from 'styled-components';
import { Quiz } from '../../../types/quiz';
import { Button } from '../../common/buttons/Button';

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
  quiz: Quiz;
  isCorrect: boolean;
  showSimplified: boolean;
  onTrySimplified: () => void;
  onRetry: () => void;
}

const QuizFeedback: React.FC<Props> = ({
  quiz,
  isCorrect,
  showSimplified,
  onTrySimplified,
  onRetry
}) => (
  <FeedbackContainer isCorrect={isCorrect}>
    <Message isCorrect={isCorrect}>
      {isCorrect ? 'Correct! Well done!' : 'Not quite right.'}
    </Message>
    {!isCorrect && (
      <>
        <Explanation>{quiz.explanation}</Explanation>
        <ButtonGroup>
          {showSimplified ? (
            <Button variant="primary" onClick={onTrySimplified}>
              Try Simplified Version
            </Button>
          ) : (
            <Button variant="secondary" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </ButtonGroup>
      </>
    )}
  </FeedbackContainer>
);

export default QuizFeedback;