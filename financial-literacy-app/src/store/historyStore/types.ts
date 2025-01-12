export interface HistoryEntry {
    id: string;
    courseId: string;
    chapterId: string;
    quizId: string;
    timestamp: Date;
    score: number;
    isCorrect: boolean;
    usedSimplified: boolean;
    attempts: number;
}
  
export interface HistoryState {
    entries: HistoryEntry[];
    loading: boolean;
    error: string | null;
}
  
export interface HistoryActions {
    addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
    clearHistory: () => void;
    loadHistory: (courseId: string, chapterId: string) => Promise<void>;
}