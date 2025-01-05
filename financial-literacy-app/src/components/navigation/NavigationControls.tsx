import React, { useEffect } from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;

const NavButton = styled.button<{ $disabled?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: ${props => props.$disabled ? '#dee2e6' : '#007bff'};
  color: white;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.7 : 1};

  &:hover {
    background: ${props => props.$disabled ? '#dee2e6' : '#0056b3'};
  }
`;

const ProgressIndicator = styled.div`
  text-align: center;
  font-size: 0.9em;
  color: #6c757d;
`;

interface Props {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextEnabled: boolean;
}

const NavigationControls: React.FC<Props> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextEnabled
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && isNextEnabled) {
        onNext();
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, isNextEnabled, onNext, onPrevious]);

  return (
    <NavContainer>
      <NavButton
        onClick={onPrevious}
        $disabled={currentStep <= 1}
      >
        ← Previous
      </NavButton>
      
      <ProgressIndicator>
        Step {currentStep} of {totalSteps}
      </ProgressIndicator>
      
      <NavButton
        onClick={onNext}
        $disabled={!isNextEnabled}
      >
        Next →
      </NavButton>
    </NavContainer>
  );
};

export default NavigationControls;