import React from 'react';
import styled from 'styled-components';
import { useQuizStore } from '../../../store/quizStore';

const HistoryContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;

interface Props {
  courseId: string;
  chapterId: string;
}

const QuizHistory: React.FC<Props> = ({ courseId, chapterId }) => {
  const { progress } = useQuizStore();

  const filteredAttempts = React.useMemo(() => 
    progress.attempts.filter(attempt => 
      attempt.courseId === courseId && 
      attempt.chapterId === chapterId
    ),
    [progress.attempts, courseId, chapterId]
  );

  const stats = React.useMemo(() => ({
    total: filteredAttempts.length,
    correct: filteredAttempts.filter(a => a.isCorrect).length,
    successRate: filteredAttempts.length > 0 
      ? Math.round((filteredAttempts.filter(a => a.isCorrect).length / filteredAttempts.length) * 100)
      : 0
  }), [filteredAttempts]);

  return (
    <HistoryContainer>
      <h3>Quiz History</h3>
      <p>Total Attempts: {stats.total}</p>
      <p>Correct Attempts: {stats.correct}</p>
      <p>Success Rate: {stats.successRate}%</p>
    </HistoryContainer>
  );
};

export default QuizHistory;