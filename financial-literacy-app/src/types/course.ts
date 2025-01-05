export interface Course {
    id: string;
    title: string;
    description: string;
    totalChapters: number;
    duration: string;
    thumbnail?: string;
    progress?: number;
    chapters: Chapter[];
    currentChapter: string; // ID of currently unlocked chapter
    completedChapters: string[]; // Array of completed chapter IDs
}
  
export interface Chapter {
    id: string;
    title: string;
    videos: Video[];
    duration: string;
    completed: boolean;
    isLocked: boolean;
    prerequisites?: string[]; // IDs of chapters that must be completed first
}

export interface SimplifiedVideo {
    id: string;
    title: string;
    url: string;
}
  
export interface Video {
    id: string;
    title: string;
    url: string;
    quizzes: Quiz[];
    watched?: boolean;
    simplifiedVersion?: SimplifiedVideo;
}
  
export interface Quiz {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface QuizAnswer {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
}

export interface QuizSubmission {
    answers: Array<{
      questionId: string;
      selectedOption: number;
      isCorrect: boolean;
    }>;
    totalScore: number;
}

export interface QuizAttempt {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    timestamp: Date;
}

export interface QuizResult {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    passed: boolean;
    comment : string;
}
