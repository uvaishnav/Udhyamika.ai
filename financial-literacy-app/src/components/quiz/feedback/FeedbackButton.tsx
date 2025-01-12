import styled from 'styled-components';

export const FeedbackButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.variant === 'primary' ? '#1976d2' : '#d32f2f'};
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;