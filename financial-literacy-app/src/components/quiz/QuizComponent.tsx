import React, { useState } from 'react';
import styled from 'styled-components';
import { Quiz, QuizSubmission } from '../../types/course';
import QuizFeedback from './QuizFeedback';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Option = styled.div<{ $selected: boolean }>`
  padding: 15px;
  margin: 10px 0;
  border: 2px solid ${props => props.$selected ? '#007bff' : '#dee2e6'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

interface Props {
  quiz: Quiz;
  onComplete: (submission: QuizSubmission) => void;
  attemptCount: number;
}

const QuizComponent: React.FC<Props> = ({ quiz, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === quiz.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    onComplete({
      answers: [{
        questionId: quiz.id,
        selectedOption: selectedOption!,
        isCorrect
      }],
      totalScore: isCorrect ? 1 : 0
    });
  };

  if (showFeedback) {
    return (
      <QuizFeedback
        isCorrect={isCorrect}
        explanation={quiz.explanation}
        onNext={handleContinue}
      />
    );
  }
  
  return (
    <QuizContainer>
      <h2>{quiz.question}</h2>
      {quiz.options.map((option, index) => (
        <Option
          key={index}
          $selected={selectedOption === index}
          onClick={() => setSelectedOption(index)}
        >
          {option}
        </Option>
      ))}
      <button 
        onClick={handleSubmit}
        disabled={selectedOption === null}
      >
        Submit Answer
      </button>
    </QuizContainer>
  );
  
};

export default QuizComponent;