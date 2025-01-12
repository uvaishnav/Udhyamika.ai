import React from 'react';
import styled from 'styled-components';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  $size: ButtonSize;
  $variant: ButtonVariant;
  $disabled: boolean;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.7 : 1};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Size variants */
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};

  /* Color variants */
  background-color: ${props => {
    switch (props.$variant) {
      case 'primary': return '#007bff';
      case 'secondary': return '#6c757d';
      case 'danger': return '#dc3545';
      case 'success': return '#28a745';
    }
  }};
  color: white;
  transition: all 0.2s;

  &:hover {
    opacity: ${props => props.$disabled ? 0.7 : 0.9};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
`;

export const BaseButton: React.FC<ButtonProps> = ({
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children
}) => (
  <StyledButton
    type={type}
    onClick={onClick}
    $size={size}
    $variant={variant}
    $disabled={disabled || loading}
    $fullWidth={fullWidth}
    disabled={disabled || loading}
  >
    {loading ? 'Loading...' : children}
  </StyledButton>
);