import { Progress, VideoProgress, ProgressUpdate } from '../types/progress';

export class ProgressManager {
  private storageKey = 'course_progress';

  saveProgress(progress: Progress): void {
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  getProgress(courseId: string, userId: string): Progress | null {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return null;
    return JSON.parse(stored);
  }

  updateVideoProgress(
    courseId: string,
    chapterId: string,
    videoId: string,
    update: ProgressUpdate
  ): void {
    const progress = this.getProgress(courseId, 'current_user');
    if (!progress) return;

    const chapter = progress.chapters.find(ch => ch.chapterId === chapterId);
    if (!chapter) return;

    const videoProgress = chapter.videoProgress.find(vp => vp.videoId === videoId);
    if (videoProgress) {
      videoProgress.lastPosition = update.position;
      videoProgress.watched = update.watched;
      videoProgress.watchedDuration = update.position;
    } else {
      chapter.videoProgress.push({
        videoId,
        position: update.position,
        watched: update.watched,
        lastPosition: update.position,
        watchedDuration: update.position
      });
    }

    this.saveProgress(progress);
  }

  updateQuizAttempt(
    courseId: string,
    chapterId: string,
    quizId: string,
    score: number,
    isSimplified: boolean
  ): void {
    const progress = this.getProgress(courseId, 'current_user');
    if (!progress) return;
    
    const chapter = progress.chapters.find(ch => ch.chapterId === chapterId);
    if (!chapter) return;

    chapter.quizAttempts.push({
      quizId,
      score,
      timestamp: new Date(),
      isSimplifiedVersion: isSimplified
    });

    this.saveProgress(progress);
  }
}