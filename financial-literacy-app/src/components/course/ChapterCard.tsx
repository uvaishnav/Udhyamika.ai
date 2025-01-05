import React from 'react';
import styled from 'styled-components';
import { Chapter } from '../../types/course';

const Card = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Progress = styled.div<{ completed: boolean }>`
  color: ${props => props.completed ? '#28a745' : '#6c757d'};
`;

interface Props {
  chapter: Chapter;
  onSelect: (chapterId: string) => void;
}

const ChapterCard = ({ chapter, onSelect }: Props) => {
  return (
    <Card onClick={() => onSelect(chapter.id)}>
      <h3>{chapter.title}</h3>
      <Progress completed={chapter.completed}>
        {chapter.completed ? 'Completed' : `Duration: ${chapter.duration}`}
      </Progress>
    </Card>
  );
};

export default ChapterCard;