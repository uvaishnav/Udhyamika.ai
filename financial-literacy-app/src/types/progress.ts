export interface Progress {
    courseId: string;
    userId: string;
    chapters: ChapterProgress[];
    lastAccessed: Date;
}
  
  export interface ChapterProgress {
    chapterId: string;
    completed: boolean;
    videoProgress: VideoProgress[];
    quizAttempts: QuizAttempt[];
}
  
  export interface VideoProgress {
    videoId: string;
    watched: boolean;
    watchedDuration: number;
    lastPosition: number;
}
  
  export interface QuizAttempt {
    quizId: string;
    score: number;
    timestamp: Date;
    isSimplifiedVersion: boolean;
}

export interface VideoProgress {
    videoId: string;
    position: number;
    watched: boolean;
    lastPosition: number;
    watchedDuration: number;
}
  
export interface ProgressUpdate {
    position: number;
    watched: boolean;
}

export interface ProgressUpdate {
    position: number;
    watched: boolean;
}
  
export interface VideoProgress extends ProgressUpdate {
    videoId: string;
    lastPosition: number;
    watchedDuration: number;
}