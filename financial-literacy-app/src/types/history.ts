export interface QuizHistoryEntry {
    id: string;
    quizId: string;
    courseId: string;
    chapterId: string;
    timestamp: Date;
    score: number;
    isCorrect: boolean;
    usedSimplified: boolean;
    attempts: number;
}
  
export interface HistoryState {
    entries: QuizHistoryEntry[];
    loading: boolean;
    error: string | null;
}