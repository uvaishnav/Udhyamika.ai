import React from 'react';
import styled from 'styled-components';
import { Progress, ChapterProgress } from '../../types/progress';

const ProgressWrapper = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChapterItem = styled.div<{ $completed: boolean }>`
  padding: 10px;
  background: ${props => props.$completed ? '#d4edda' : '#fff'};
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;

interface Props {
  progress: Progress;
  currentChapterId: string;
}

const CourseProgress: React.FC<Props> = ({ progress, currentChapterId }) => {
  const calculateProgress = (chapter: ChapterProgress) => {
    const total = chapter.videoProgress.length;
    const watched = chapter.videoProgress.filter(v => v.watched).length;
    return (watched / total) * 100;
  };

  return (
    <ProgressWrapper>
      <h3>Course Progress</h3>
      <ChapterList>
        {progress.chapters.map(chapter => (
          <ChapterItem 
            key={chapter.chapterId}
            $completed={chapter.completed}
          >
            <h4>Chapter {chapter.chapterId}</h4>
            <div>Progress: {calculateProgress(chapter)}%</div>
            {chapter.chapterId === currentChapterId && <span>Current →</span>}
          </ChapterItem>
        ))}
      </ChapterList>
    </ProgressWrapper>
  );
};

export default CourseProgress;