import { Quiz, QuizSubmission, QuizState } from '../types/quiz';
import { ProgressManager } from './progressManager';

export class QuizManager {
  private progressManager: ProgressManager;

  constructor() {
    this.progressManager = new ProgressManager();
  }

  async processSubmission(
    courseId: string,
    chapterId: string,
    quiz: Quiz,
    submission: QuizSubmission,
    currentState: QuizState
  ): Promise<QuizState> {
    const isCorrect = submission.answers[0].selectedOption === quiz.correctAnswer;
    const score = isCorrect ? 100 : 0;
    
    // Update progress
    await this.progressManager.updateQuizAttempt(
      courseId,
      chapterId,
      quiz.id,
      score,
      currentState.showSimplified,
    );

    // Calculate new state
    const newState: QuizState = {
      attemptCount: currentState.attemptCount + 1, // Update to attemptCount
      score,
      showSimplified: !isCorrect && currentState.attemptCount >= 2, // Update to attemptCount
      isCorrect,
      selectedOption: submission.answers[0].selectedOption,
      showFeedback: true,
      isSubmitted: true
    };

    return newState;
  }

  async getQuizState(
    courseId: string,
    chapterId: string,
    quizId: string
  ): Promise<QuizState | null> {
    const progress = await this.progressManager.getProgress(courseId, 'current_user');
    if (!progress) return null;

    const attempts = progress.chapters
      .find(ch => ch.chapterId === chapterId)
      ?.quizAttempts.filter(qa => qa.quizId === quizId) || [];

    if (attempts.length === 0) return null;

    const lastAttempt = attempts[attempts.length - 1];
    
    return {
      attemptCount: attempts.length, // Update to attemptCount
      score: lastAttempt.score,
      showSimplified: this.shouldShowSimplified(attempts.length, lastAttempt.score),
      isCorrect: lastAttempt.isCorrect,
      selectedOption: null,
      showFeedback: false,
      isSubmitted: false
    };
  }

  shouldShowSimplified(attempts: number, lastScore: number): boolean {
    return attempts >= 2 && lastScore < 70;
  }
}