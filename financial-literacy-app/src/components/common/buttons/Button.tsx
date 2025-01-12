import React from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

const StyledButton = styled.button<{ $variant: ButtonVariant; $disabled: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.7 : 1};
  background-color: ${props => {
    switch (props.$variant) {
      case 'primary': return '#007bff';
      case 'secondary': return '#6c757d';
      case 'danger': return '#dc3545';
    }
  }};
  color: white;
  transition: all 0.2s;

  &:hover {
    opacity: ${props => props.$disabled ? 0.7 : 0.9};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
`;

interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  children,
  type = 'button'
}) => (
  <StyledButton
    type={type}
    onClick={onClick}
    $disabled={disabled || loading}
    $variant={variant}
    disabled={disabled || loading}
  >
    {loading ? 'Loading...' : children}
  </StyledButton>
);