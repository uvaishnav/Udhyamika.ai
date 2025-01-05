import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

interface Props {
  currentIndex: number;
  totalVideos: number;
  onNext: () => void;
  onPrevious: () => void;
}

const VideoNavigation: React.FC<Props> = ({ 
  currentIndex, 
  totalVideos, 
  onNext, 
  onPrevious 
}) => {
  return (
    <NavContainer>
      <button 
        onClick={onPrevious} 
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <span>{currentIndex + 1} of {totalVideos}</span>
      <button 
        onClick={onNext} 
        disabled={currentIndex === totalVideos - 1}
      >
        Next
      </button>
    </NavContainer>
  );
};

export default VideoNavigation;