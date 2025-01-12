export interface Quiz {
    id: string;
    courseId: string;
    chapterId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    simplifiedVersion?: {
      question: string;
      options: string[];
      correctAnswer: number;
    };
}

export interface QuizAnswer {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
}
  
export interface QuizState {
    selectedOption: number | null;
    showFeedback: boolean;
    isCorrect: boolean;
    attemptCount: number;
    showSimplified: boolean;
    score: number;
    isSubmitted: boolean;
}
  
export interface QuizSubmission {
    answers: QuizAnswer[];
    totalScore: number;
}

export interface QuizProgress {
    id: string;
    courseId: string;
    chapterId: string;
    quizId: string;
    attempts: QuizAttempt[];
    lastAttemptDate: Date;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    courseId: string; // Add courseId
    chapterId: string; // Add chapterId
    score: number;
    isCorrect: boolean;
    isSimplifiedVersion: boolean;
    timestamp: Date;
    selectedOption: number;
}

export interface ChapterProgress {
    chapterId: string;
    completed: boolean;
    quizAttempts: QuizAttempt[];
}
  
export interface Progress {
    courseId: string;
    userId: string;
    chapters: ChapterProgress[];
    lastAccessed: Date;
}

export interface QuizManagerState {
    selectedOption: number | null;
    showFeedback: boolean;
    isCorrect: boolean;
    attemptCount: number; // Update to attemptCount
    showSimplified: boolean;
    score: number;
    isSubmitted: boolean;
    currentStep: 'quiz' | 'simplified' | 'result';
}