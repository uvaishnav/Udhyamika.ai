import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChapterCard from '../components/course/ChapterCard';
import { mockCourses } from '../constants/courses';
import { isChapterUnlocked } from '../utils/progressManager';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CourseHeader = styled.div`
  margin-bottom: 2rem;
`;

const ChapterWrapper = styled.div<{ isLocked: boolean }>`
  opacity: ${props => props.isLocked ? 0.5 : 1};
  pointer-events: ${props => props.isLocked ? 'none' : 'auto'};
`;

const LockIcon = styled.span`
  margin-left: 10px;
  color: #666;
`;

const mockCourse = mockCourses[0];


const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleChapterSelect = (chapterId: string) => {
    if (isChapterUnlocked(chapterId, mockCourse)) {
      navigate(`/courses/${courseId}/chapters/${chapterId}`);
    }
  };

  return (
    <Container>
      <CourseHeader>
        <h1>{mockCourse.title}</h1>
      </CourseHeader>
      
      <div>
        {mockCourse.chapters.map(chapter => (
          <ChapterWrapper 
            key={chapter.id}
            isLocked={!isChapterUnlocked(chapter.id, mockCourse)}
          >
            <ChapterCard 
              chapter={chapter}
              onSelect={handleChapterSelect}
            />
            {!isChapterUnlocked(chapter.id, mockCourse) && 
              <LockIcon>🔒</LockIcon>
            }
          </ChapterWrapper>
        ))}
      </div>
    </Container>
  );
};

export default CourseDetail;