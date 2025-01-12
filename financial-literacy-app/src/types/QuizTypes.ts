export interface QuizManager {
    currentState: QuizState;
    attempts: QuizAttempt[];
    progress: QuizProgress;
    actions: {
      submitAnswer: (answer: number) => Promise<void>;
      resetQuiz: () => void;
      showSimplified: () => void;
    };
}
  
export interface QuizState {
    currentQuestion: number;
    selectedAnswer: number | null;
    isSubmitted: boolean;
    isCorrect: boolean;
    showFeedback: boolean;
    attemptCount: number;
    showSimplified: boolean;
}
  
export interface QuizAttempt {
    questionId: string;
    answer: number;
    isCorrect: boolean;
    timestamp: Date;
    usedSimplified: boolean;
}
  
export interface QuizProgress {
    totalAttempts: number;
    correctAnswers: number;
    lastAttemptDate: Date;
}