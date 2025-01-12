import React from 'react';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
`;

const Option = styled.div<{ $selected: boolean; $disabled: boolean }>`
  padding: 15px;
  border: 2px solid ${props => props.$selected ? '#007bff' : '#dee2e6'};
  border-radius: 8px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.7 : 1};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => !props.$disabled && (props.$selected ? '#e7f1ff' : '#f8f9fa')};
    border-color: ${props => !props.$disabled && '#007bff'};
  }
`;

interface Props {
  options: string[];
  selectedOption: number | null;
  onSelect: (option: number) => void;
  disabled?: boolean;  // Add disabled prop
}

const QuizOptions: React.FC<Props> = ({ 
  options, 
  selectedOption, 
  onSelect,
  disabled = false 
}) => {
  return (
    <OptionsContainer>
      {options.map((option, index) => (
        <Option
          key={index}
          $selected={selectedOption === index}
          $disabled={disabled}
          onClick={() => !disabled && onSelect(index)}
        >
          {option}
        </Option>
      ))}
    </OptionsContainer>
  );
};

export default QuizOptions;