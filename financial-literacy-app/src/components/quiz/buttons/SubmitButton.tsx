import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ $variant: 'primary' | 'secondary'; $disabled: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.7 : 1};
  background-color: ${props => 
    props.$variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  transition: all 0.2s;

  &:hover {
    opacity: ${props => props.$disabled ? 0.7 : 0.9};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
`;

interface Props {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<Props> = ({
  onClick,
  disabled = false,
  variant = 'primary',
  loading = false,
  children
}) => (
  <Button
    onClick={onClick}
    $disabled={disabled || loading}
    $variant={variant}
    disabled={disabled || loading}
  >
    {loading ? 'Submitting...' : children}
  </Button>
);

export default SubmitButton;