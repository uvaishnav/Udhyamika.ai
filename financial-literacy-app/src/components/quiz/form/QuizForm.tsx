import React from 'react';
import styled from 'styled-components';
import { Quiz, QuizState, QuizSubmission } from '../../../types/quiz';
import { BaseButton } from '../../common/BaseButton';

const FormContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
`;

const Option = styled.div<{ $selected: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.$selected ? '#007bff' : '#dee2e6'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007bff;
    background: ${props => props.$selected ? '#e7f1ff' : '#f8f9fa'};
  }
`;

interface Props {
    quiz: Quiz;
    onSubmit: (submission: QuizSubmission) => void;
    disabled?: boolean;
    state?: QuizState;
}

const QuizForm: React.FC<Props> = ({ quiz, onSubmit, disabled = false }) => {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === quiz.correctAnswer;
    const score = isCorrect ? 100 : 0;

    onSubmit({
        answers: [{
          questionId: quiz.id,
          selectedOption,
          isCorrect
        }],
        totalScore: score
      });
    };

  return (
    <FormContainer>
      <h3>{quiz.question}</h3>
      <OptionsContainer>
        {quiz.options.map((option, index) => (
          <Option
            key={index}
            $selected={selectedOption === index}
            onClick={() => !disabled && setSelectedOption(index)}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
      <BaseButton
        onClick={handleSubmit}
        disabled={disabled || selectedOption === null}
        fullWidth
      >
        Submit Answer
      </BaseButton>
    </FormContainer>
  );
};

export default QuizForm;