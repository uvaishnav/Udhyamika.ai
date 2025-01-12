import { Progress, ChapterProgress, VideoProgress, ProgressUpdate, QuizAttempt } from '../types/progress';

export class ProgressManager {
  private readonly STORAGE_KEY = 'course_progress';

  private getStorageKey(courseId: string, userId: string): string {
    return `${this.STORAGE_KEY}_${courseId}_${userId}`;
  }

  private async saveProgress(courseId: string, userId: string, progress: Progress): Promise<void> {
    localStorage.setItem(this.getStorageKey(courseId, userId), JSON.stringify(progress));
  }

  async getProgress(courseId: string, userId: string): Promise<Progress | null> {
    const data = localStorage.getItem(this.getStorageKey(courseId, userId));
    return data ? JSON.parse(data) : null;
  }

  async getOrCreateProgress(courseId: string, userId: string): Promise<Progress> {
    const existing = await this.getProgress(courseId, userId);
    if (existing) return existing;

    const progress: Progress = {
      courseId,
      userId,
      chapters: [],
      completedChapters: [], // Initialize completedChapters
      lastAccessed: new Date()
    };
    await this.saveProgress(courseId, userId, progress);
    return progress;
  }

  async updateVideoProgress(
    courseId: string,
    chapterId: string,
    videoId: string,
    update: ProgressUpdate
  ): Promise<Progress | null> {
    const progress = await this.getOrCreateProgress(courseId, 'current_user');
    const chapter = this.getOrCreateChapter(progress, chapterId);
    
    const videoProgress = this.updateOrCreateVideoProgress(chapter, videoId, update);
    chapter.videoProgress = chapter.videoProgress.map(v => 
      v.videoId === videoId ? videoProgress : v
    );

    await this.saveProgress(courseId, 'current_user', progress);
    return progress;
  }

  async updateQuizAttempt(
    courseId: string,
    chapterId: string,
    quizId: string,
    score: number,
    isSimplified: boolean,
  ): Promise<Progress | null> {
    const progress = await this.getOrCreateProgress(courseId, 'current_user');
    const chapter = this.getOrCreateChapter(progress, chapterId);
    
    const attempt: QuizAttempt = {
      id: crypto.randomUUID(),
      quizId,
      score,
      timestamp: new Date(),
      isSimplifiedVersion: isSimplified,
      isCorrect: score >= 70,
    };
    
    chapter.quizAttempts.push(attempt);
    await this.saveProgress(courseId, 'current_user', progress);
    
    return progress;
  }

  getOrCreateChapter(progress: Progress, chapterId: string): ChapterProgress {
    let chapter = progress.chapters.find(ch => ch.chapterId === chapterId);
    if (!chapter) {
      chapter = {
        chapterId,
        completed: false,
        videoProgress: [],
        quizAttempts: []
      };
      progress.chapters.push(chapter);
    }
    return chapter;
  }

  private updateOrCreateVideoProgress(
    chapter: ChapterProgress,
    videoId: string,
    update: ProgressUpdate
  ): VideoProgress {
    const existingProgress = chapter.videoProgress.find(v => v.videoId === videoId);
    const videoProgress: VideoProgress = existingProgress || {
      videoId,
      position: 0,
      watched: false,
      watchedDuration: 0,
      lastPosition: 0,
      watchedPercentage: 0,
      lastWatched: new Date()
    };

    videoProgress.position = update.position;
    videoProgress.lastPosition = update.position;
    videoProgress.watched = update.watched;
    videoProgress.watchedDuration = Math.max(
      videoProgress.watchedDuration,
      update.position
    );
    videoProgress.watchedPercentage = update.watchedPercentage;
    videoProgress.lastWatched = update.lastWatched;

    return videoProgress;
  }

  async completeChapter(courseId: string, chapterId: string): Promise<Progress | null> {
    const progress = await this.getOrCreateProgress(courseId, 'current_user');
    if (!progress.completedChapters.includes(chapterId)) {
      progress.completedChapters.push(chapterId);
    }
    await this.saveProgress(courseId, 'current_user', progress);
    return progress;
  }
}