import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/course/CourseCard';
import { mockCourses } from '../constants/courses';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Header = styled.div`
  padding: 20px;
  h1 {
    color: #333;
    margin-bottom: 10px;
  }
`;

const Courses = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <>
      <Header>
        <h1>Available Courses</h1>
        <p>Start your financial literacy journey today</p>
      </Header>
      <Grid>
        {mockCourses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onClick={() => handleCourseClick(course.id)}
          />
        ))}
      </Grid>
    </>
  );
};

export default Courses;