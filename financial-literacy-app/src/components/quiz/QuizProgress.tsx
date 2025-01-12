import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress}%;
    background: #28a745;
    transition: width 0.3s ease;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Attempt = styled.span`
  color: #6c757d;
  font-size: 0.9rem;
`;

const Score = styled.span`
  font-weight: 600;
  color: #28a745;
`;

const SimplifiedBadge = styled.div`
  margin-top: 10px;
  padding: 4px 8px;
  background: #17a2b8;
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  display: inline-block;
`;

interface Props {
  attempts: number;
  score: number;
  showSimplified: boolean;
}


export const QuizProgress: React.FC<Props> = ({ attempts, score, showSimplified }) => {

  return (
    <Container>
      <ProgressBar $progress={score} />
      <Stats>
        <Attempt>Attempt {attempts} of 3</Attempt>
        <Score>{score}%</Score>
      </Stats>
      {showSimplified && (
        <SimplifiedBadge>
          Simplified Mode Available
        </SimplifiedBadge>
      )}
    </Container>
  );
};