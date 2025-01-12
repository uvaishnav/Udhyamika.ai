import { useState, useEffect, useCallback } from 'react';
import { QuizAttempt, Progress } from '../types/progress';
import { ProgressManager } from '../services/progressManager';

export const useQuizProgress = (
  courseId: string,
  chapterId: string,
  quizId: string
) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const progressManager = new ProgressManager();

  useEffect(() => {
    const loadAttempts = async () => {
      setIsLoading(true);
      try {
        const progress = await progressManager.getProgress(courseId, 'current_user');
        const serverAttempts = progress?.chapters
          ?.find(ch => ch.chapterId === chapterId)
          ?.quizAttempts.filter(qa => qa.quizId === quizId) || [];

        const localKey = `quiz_progress_${courseId}_${chapterId}_${quizId}`;
        const localAttempts = JSON.parse(localStorage.getItem(localKey) || '[]');

        const mergedAttempts = [...localAttempts, ...serverAttempts]
          .filter((attempt, index, self) => 
            index === self.findIndex(a => a.id === attempt.id)
          );

        setAttempts(mergedAttempts);
      } catch (error) {
        console.error('Failed to load attempts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttempts();
  }, [courseId, chapterId, quizId]);

  const addAttempt = useCallback(async (
    score: number, 
    isSimplifiedVersion: boolean // Update parameter name
  ): Promise<Progress | null> => {
    try {
      const progress = await progressManager.updateQuizAttempt(
        courseId,
        chapterId,
        quizId,
        score,
        isSimplifiedVersion, // Add selectedOption parameter
      );

      const newAttempt: QuizAttempt = {
        id: crypto.randomUUID(),
        quizId,
        score,
        isSimplifiedVersion, // Update property name
        timestamp: new Date(),
        isCorrect: score >= 70,
      };

      const localKey = `quiz_progress_${courseId}_${chapterId}_${quizId}`;
      const localAttempts = JSON.parse(localStorage.getItem(localKey) || '[]');
      localStorage.setItem(localKey, JSON.stringify([...localAttempts, newAttempt]));

      setAttempts(prev => [...prev, newAttempt]);
      
      return progress;
    } catch (error) {
      console.error('Failed to add attempt:', error);
      return null;
    }
  }, [courseId, chapterId, quizId]);

  return { attempts, isLoading, addAttempt };
};