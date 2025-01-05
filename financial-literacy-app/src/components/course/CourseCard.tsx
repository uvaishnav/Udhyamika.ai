import React from 'react';
import styled from 'styled-components';
import { Course } from '../../types/course';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  background: white;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 15px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9em;
`;

interface Props {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<Props> = ({ course, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{course.title}</Title>
      <Description>{course.description}</Description>
      <Meta>
        <span>{course.totalChapters} Chapters</span>
        <span>{course.duration}</span>
      </Meta>
    </Card>
  );
};

export default CourseCard;