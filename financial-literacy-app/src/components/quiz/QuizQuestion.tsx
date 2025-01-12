import React from 'react';
import styled from 'styled-components';

const QuestionWrapper = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
`;

interface Props {
  question: string;
}

const QuizQuestion: React.FC<Props> = ({ question }) => (
  <QuestionWrapper>
    <h3>{question}</h3>
  </QuestionWrapper>
);

export default QuizQuestion;