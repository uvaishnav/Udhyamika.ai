import React from 'react';
import styled from 'styled-components';

type InputSize = 'small' | 'medium' | 'large';
type InputType = 'text' | 'number' | 'email' | 'password';

interface BaseInputProps {
    inputSize?: InputSize;  // Changed from size to inputSize
    error?: string;
    label?: string;
    fullWidth?: boolean;
    type?: InputType;
}

// Combine with HTML input props
type InputProps = BaseInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const StyledLabel = styled.label`
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
`;

const StyledInput = styled.input<{
  $size: InputSize;
  $hasError: boolean;
  $fullWidth: boolean;
}>`
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 12px';
      case 'large': return '16px 20px';
      default: return '12px 16px';
    }
  }};
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  border: 1px solid ${props => props.$hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#007bff'};
    box-shadow: 0 0 0 2px ${props => props.$hasError ? 'rgba(220,53,69,0.25)' : 'rgba(0,123,255,0.25)'};
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

export const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(({
    inputSize = 'medium',
    error,
    label,
    fullWidth = false,
    type = 'text',
    ...props
  }, ref) => (
    <InputWrapper $fullWidth={fullWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        ref={ref}
        type={type}
        $size={inputSize}
        $hasError={!!error}
        $fullWidth={fullWidth}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  ));

BaseInput.displayName = 'BaseInput';