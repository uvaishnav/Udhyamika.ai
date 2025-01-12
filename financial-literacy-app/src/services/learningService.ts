import { Progress, ChapterProgress, ProgressUpdate } from '../types/progress';
import { ProgressManager } from './progressManager';

export class LearningService {
  private progressService: ProgressManager;
  
  constructor() {
    this.progressService = new ProgressManager();
  }

  async startLearning(courseId: string, chapterId: string): Promise<void> {
    const progress = await this.progressService.getOrCreateProgress(courseId, 'current_user');
    const chapter = this.getOrCreateChapter(progress, chapterId);
    await this.loadVideoContent(chapter);
  }

  private getOrCreateChapter(progress: Progress, chapterId: string): ChapterProgress {
    return this.progressService['getOrCreateChapter'](progress, chapterId);
  }

  private async loadVideoContent(chapter: ChapterProgress): Promise<void> {
    // Implementation for loading video content
    return Promise.resolve();
  }

  async completeVideo(
    courseId: string, 
    chapterId: string, 
    videoId: string
  ): Promise<boolean> {
    const progress = await this.progressService.updateVideoProgress(
      courseId,
      chapterId,
      videoId,
      { 
        position: 100, 
        watched: true,
        watchedDuration: 100,
        lastPosition: 100,
        watchedPercentage: 100,
        lastWatched: new Date()
      }
    );
    if (!progress) return false;
    
    return this.shouldShowQuiz(progress, chapterId, videoId);
  }

  private shouldShowQuiz(
    progress: Progress, 
    chapterId: string, 
    videoId: string
  ): boolean {
    const chapter = progress.chapters.find(ch => ch.chapterId === chapterId);
    return chapter?.videoProgress.find(v => v.videoId === videoId)?.watched || false;
  }
}