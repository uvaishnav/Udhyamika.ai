import { useState, useEffect } from 'react';
import { VideoProgress, Progress, ChapterProgress, ProgressUpdate } from '../types/progress';
import { ProgressManager } from '../services/progressManager';

export const useVideoProgress = (
  courseId: string,
  chapterId: string,
  videoId: string
) => {
  const [progress, setProgress] = useState<VideoProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const progressManager = new ProgressManager();

  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);
      const courseProgress: Progress | null = await progressManager.getProgress(courseId, 'current_user');
      if (courseProgress) {
        const videoProgress = courseProgress.chapters
          .find((ch: ChapterProgress) => ch.chapterId === chapterId)
          ?.videoProgress
          .find((vp: VideoProgress) => vp.videoId === videoId);
        
        if (videoProgress) setProgress(videoProgress);
      }
      setIsLoading(false);
    };

    loadProgress();
  }, [courseId, chapterId, videoId]);

  const updateProgress = async (update: ProgressUpdate): Promise<Progress | null> => {
    try {
      const updatedProgress = await progressManager.updateVideoProgress(
        courseId,
        chapterId,
        videoId,
        update
      );
      setProgress(prev => prev ? ({ ...prev, ...update }) : null);
      return updatedProgress;
    } catch (error) {
      console.error('Failed to update progress:', error);
      return null;
    }
  };

  return { progress, isLoading, updateProgress };
};