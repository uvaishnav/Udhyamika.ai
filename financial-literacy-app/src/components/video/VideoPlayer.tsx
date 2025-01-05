import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useVideoProgress } from '../../hooks/useVideoProgress';
import { Video } from '../../types/course';
import { ProgressUpdate } from '../../types/progress';

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 4px;
  background: #ddd;
  margin-top: 10px;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background: #007bff;
    transition: width 0.3s ease;
  }
`;


interface Props {
  video: Video;
  courseId: string;
  chapterId: string;
  onComplete: () => void;
  isSimplified?: boolean;
}

const VideoPlayer: React.FC<Props> = ({ 
  video, 
  courseId, 
  chapterId, 
  onComplete 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const { progress, updateProgress } = useVideoProgress(
    courseId,
    chapterId,
    video.id
  );

  useEffect(() => {
    if (videoRef.current && progress) {
      videoRef.current.currentTime = progress.lastPosition;
    }
  }, [progress]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && duration > 0) {
      const currentTime = videoRef.current.currentTime;
      
      const update: ProgressUpdate = {
        position: currentTime,
        watched: currentTime >= duration * 0.9
      };
      
      updateProgress(update);
    }
  };

  return (
    <VideoContainer>
      <video
        ref={videoRef}
        src={video.url}
        controls
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onComplete}
      />
      {progress && duration > 0 && (
        <ProgressBar $progress={(progress.position / duration) * 100} />
      )}
    </VideoContainer>
  );
};

export default VideoPlayer;