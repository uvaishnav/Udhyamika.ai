import { useState, useEffect } from 'react';
import { VideoProgress, ProgressUpdate } from '../types/progress';
import { ProgressManager } from '../services/progressManager';

export const useVideoProgress = (
  courseId: string,
  chapterId: string,
  videoId: string
) => {
  const [progress, setProgress] = useState<VideoProgress | null>(null);
  const progressManager = new ProgressManager();

  useEffect(() => {
    const stored = progressManager.getProgress(courseId, 'current_user');
    if (!stored) return;

    const videoProgress = stored.chapters
      .find(ch => ch.chapterId === chapterId)
      ?.videoProgress
      .find(vp => vp.videoId === videoId);

    if (videoProgress) setProgress(videoProgress);
  }, [courseId, chapterId, videoId]);

  const updateProgress = (update: ProgressUpdate) => {
    progressManager.updateVideoProgress(courseId, chapterId, videoId, update);
  };

  return { progress, updateProgress };
};