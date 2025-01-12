export interface Progress {
    courseId: string;
    userId: string;
    chapters: ChapterProgress[];
    completedChapters: string[]; // Add this property
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
    position: number;
    watchedDuration: number;
    lastPosition: number;
    watchedPercentage: number; // Add new property
    lastWatched: Date; // Add new property
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    score: number;
    isCorrect: boolean;
    isSimplifiedVersion: boolean; // Update property name
    timestamp: Date;
}

export interface VideoProgress {
    videoId: string;
    watched: boolean;
    position: number;
    watchedDuration: number;
    lastPosition: number;
    watchedPercentage: number;
    lastWatched: Date;
}
  
export interface ProgressUpdate {
    watched: boolean;
    position: number;
    watchedDuration: number;
    lastPosition: number;
    watchedPercentage: number;
    lastWatched: Date;
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

export interface CourseProgress {
    courseId: string;
    chapters: ChapterProgress[];
    lastAccessed: Date;
}

export interface ChapterProgress {
    chapterId: string;
    completed: boolean;
    quizAttempts: QuizAttempt[];
    videoProgress: VideoProgress[];
}