import React from 'react';
import styled from 'styled-components';
import { QuizResult } from '../../types/course';

const ResultContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Score = styled.div<{ passed: boolean }>`
  font-size: 24px;
  color: ${props => props.passed ? '#28a745' : '#dc3545'};
  margin: 20px 0;
`;

const CommentSection = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-style: italic;
  color: #666;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px;
  
  &.continue {
    background-color: #28a745;
    color: white;
    &:hover {
      background-color: #218838;
    }
  }
  
  &.retry {
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  }
`;

const AttemptInfo = styled.div`
  color: #666;
  margin: 10px 0;
  font-size: 14px;
`;

interface Props {
  result: QuizResult;
  onContinue: () => void;
  onRetry: () => void;
  attemptCount: number;
}

const QuizResultComponent: React.FC<Props> = ({ 
    result, 
    onContinue, 
    onRetry, 
    attemptCount 
  }) => {
    const { score, passed, correctAnswers, totalQuestions, comment } = result;
    const MAX_ATTEMPTS = 3;
  
    const getRetryButtonText = () => {
      if (attemptCount >= MAX_ATTEMPTS - 1) return "Try Simplified Version";
      return `Try Again (${MAX_ATTEMPTS - attemptCount} attempts remaining)`;
    };
  
    return (
      <ResultContainer>
        <h2>Quiz Results</h2>
        <Score passed={passed}>
          Score: {score}% ({correctAnswers}/{totalQuestions})
        </Score>
        <AttemptInfo>
          Attempt {attemptCount} of {MAX_ATTEMPTS}
        </AttemptInfo>
        <CommentSection>
          {comment}
        </CommentSection>
        {passed ? (
          <Button className="continue" onClick={onContinue}>
            Continue to Next Video
          </Button>
        ) : (
          <Button className="retry" onClick={onRetry}>
            {getRetryButtonText()}
          </Button>
        )}
      </ResultContainer>
    );
  };
  
  export default QuizResultComponent;