import React from 'react';
import styled from 'styled-components';
import { QuizAttempt } from '../../types/progress';

const HistoryContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
`;

const AttemptItem = styled.div<{ $passed: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border-left: 4px solid ${props => props.$passed ? '#28a745' : '#dc3545'};
  background: #f8f9fa;
`;

interface Props {
  attempts: QuizAttempt[];
}

const QuizHistory: React.FC<Props> = ({ attempts }) => {
  return (
    <HistoryContainer>
      <h4>Quiz Attempts</h4>
      {attempts.map((attempt, index) => (
        <AttemptItem key={index} $passed={attempt.score >= 70}>
          <div>Score: {attempt.score}%</div>
          <div>Date: {new Date(attempt.timestamp).toLocaleDateString()}</div>
          {attempt.isSimplifiedVersion && <div>Simplified Version</div>}
        </AttemptItem>
      ))}
    </HistoryContainer>
  );
};

export default QuizHistory;