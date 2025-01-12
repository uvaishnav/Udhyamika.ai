import React from 'react';
import styled from 'styled-components';
import type { QuizResult as QuizResultType } from '../../types/course';

const ResultContainer = styled.div`
  padding: 24px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Score = styled.div<{ $passed: boolean }>`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.$passed ? '#28a745' : '#dc3545'};
  margin: 20px 0;
`;

const StatRow = styled.div`
  font-size: 18px;
  color: #6c757d;
  margin: 10px 0;
`;

const CommentSection = styled.div`
  margin: 20px 0;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-style: italic;
  color: #666;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button<{ $variant: 'success' | 'danger' }>`
  padding: 12px 24px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.$variant === 'success' ? '#28a745' : '#dc3545'};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface Props {
  result: QuizResultType;
  onContinue: () => void;
  onRetry: () => void;
  attemptCount: number;
  maxAttempts?: number;
}

const QuizResult: React.FC<Props> = ({ 
  result, 
  onContinue, 
  onRetry, 
  attemptCount,
  maxAttempts = 3
}) => {
  const { score, passed, correctAnswers, totalQuestions, comment } = result;
  const attemptsRemaining = maxAttempts - attemptCount;
  
  const getRetryButtonText = () => {
    if (attemptsRemaining === 1) return "Try Simplified Version";
    return `Try Again (${attemptsRemaining} attempts remaining)`;
  };

  return (
    <ResultContainer>
      <h2>Quiz Results</h2>
      <Score $passed={passed}>
        {score}%
      </Score>
      <StatRow>
        {correctAnswers} of {totalQuestions} questions correct
      </StatRow>
      <StatRow>
        Attempt {attemptCount} of {maxAttempts}
      </StatRow>
      {comment && (
        <CommentSection>
          {comment}
        </CommentSection>
      )}
      <ButtonGroup>
        {passed ? (
          <Button $variant="success" onClick={onContinue}>
            Continue to Next Section
          </Button>
        ) : (
          <Button 
            $variant="danger" 
            onClick={onRetry}
            disabled={attemptCount >= maxAttempts}
          >
            {getRetryButtonText()}
          </Button>
        )}
      </ButtonGroup>
    </ResultContainer>
  );
};

export default QuizResult;