import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useVideoProgress } from '../../hooks/useVideoProgress';
import { Video } from '../../types/course';
import { ProgressUpdate } from '../../types/progress';

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
`;

const VideoOverlay = styled.div<{ $isPlaying: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  opacity: ${props => props.$isPlaying ? 0 : 1};
  transition: opacity 0.3s;
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

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const IframeElement = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CompleteButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && duration > 0) {
      const currentTime = videoRef.current.currentTime;
      updateProgress({
        position: currentTime,
        watched: currentTime >= duration * 0.9,
        watchedDuration: currentTime,
        lastPosition: currentTime,
        watchedPercentage: (currentTime / duration) * 100,
        lastWatched: new Date()
      });
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const isGoogleDriveLink = (url: string) => {
    return url.includes('drive.google.com');
  };

  return (
    <div>
      <VideoContainer>
        {isGoogleDriveLink(video.url) ? (
          <IframeElement
            src={video.url}
            allow="autoplay"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <VideoElement
            ref={videoRef}
            src={video.url}
            controls
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={onComplete}
          />
        )}
        {!isLoading && (
          <VideoOverlay $isPlaying={isPlaying}>
            {!isPlaying && <button onClick={() => videoRef.current?.play()}>Play</button>}
          </VideoOverlay>
        )}
        <ProgressBar $progress={progress ? progress.watchedPercentage : 0} />
      </VideoContainer>
      {isGoogleDriveLink(video.url) && (
        <CompleteButton onClick={onComplete}>Mark as Complete</CompleteButton>
      )}
    </div>
  );
};

export default VideoPlayer;