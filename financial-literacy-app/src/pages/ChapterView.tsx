import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideoPlayer from '../components/video/VideoPlayer';
import QuizComponent from '../components/quiz/QuizComponent';
import QuizResultComponent from '../components/quiz/QuizResult';
import { Chapter, Video, QuizSubmission, QuizResult } from '../types/course';
import { mockCourses } from '../constants/courses';
import { updateCourseProgress } from '../utils/progressManager';
import VideoNavigation from '../components/video/VideoNavigation';
import NavigationControls from '../components/navigation/NavigationControls';
import CourseProgress from '../components/progress/CourseProgress';
import QuizHistory from '../components/progress/QuizHistory';
import { ProgressManager } from '../services/progressManager';
import { Progress, ChapterProgress } from '../types/progress';


const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background: #eee;
  margin-bottom: 20px;
  
  &:after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background: #007bff;
    transition: width 0.3s ease;
  }
`;

const mockCourse = mockCourses[0];

const ChapterView = () => {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const THRESHOLD_SCORE = 70;
  
  const currentChapter: Chapter | undefined = mockCourse.chapters.find(ch => ch.id === chapterId);
  const currentVideo: Video | undefined = currentChapter?.videos[currentVideoIndex];

  const [showSimplifiedVideo, setShowSimplifiedVideo] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const [progress, setProgress] = useState<Progress | null>(null);
  const progressManager = new ProgressManager();

  useEffect(() => {
    if (courseId) {
      const savedProgress = progressManager.getProgress(courseId, 'current_user');
      setProgress(savedProgress);
    }
  }, [courseId]);

  const isNextEnabled = () => {
    if (!currentVideo || !chapterId) return false;
    if (showQuiz) return false;
    if (quizResult?.passed) return true;
    
    return progress?.chapters
      .find(ch => ch.chapterId === chapterId)
      ?.videoProgress
      .find(vp => vp.videoId === currentVideo.id)
      ?.watched || false;
  };

  if (!currentChapter || !currentVideo) {
    return <div>Chapter or video not found</div>;
  }

  const handleVideoComplete = () => {
    if (!courseId || !chapterId || !currentVideo) {
      console.error('Missing required data for video progress update');
      return;
    }
  
    progressManager.updateVideoProgress(
      courseId,
      chapterId,
      currentVideo.id,
      {
        position: 100,
        watched: true
      }
    );
    setShowQuiz(true);
  };

  const getResultComment = (score: number): string => {
    if (score >= 90) return "Excellent! You've mastered this concept.";
    if (score >= 70) return "Good job! You're ready to move forward.";
    return "Let's review this concept with a simpler explanation.";
  };

  const handleQuizComplete = (submission: QuizSubmission) => {
    const score = (submission.totalScore / submission.answers.length) * 100;
    const result: QuizResult = {
      score,
      correctAnswers: submission.totalScore,
      totalQuestions: submission.answers.length,
      passed: score >= THRESHOLD_SCORE,
      comment: getResultComment(score)
    };
    
    setQuizResult(result);
    setAttemptCount(prev => prev + 1);
  };

  const handleContinue = () => {
    if (!currentChapter) return;

    if (currentVideoIndex + 1 < currentChapter.videos.length) {
      setCurrentVideoIndex(prev => prev + 1);
      setShowSimplifiedVideo(false);
      setAttemptCount(0);
    } else {
      if (courseId && chapterId) {
        const updatedCourse = updateCourseProgress(mockCourse, chapterId);
        navigate(`/courses/${courseId}`);
      }
    }
    setQuizResult(null);
    setShowQuiz(false);
  };

  const handleRetry = () => {
    if (attemptCount >= 2) {
      // Show simplified video after 2 failed attempts
      setShowSimplifiedVideo(true);
    }
    setShowQuiz(false);
    setQuizResult(null);
  };


  if (!currentChapter || !currentVideo) {
    return <div>Chapter not found</div>;
  }

  return (
    <Container>
      <ProgressBar 
        progress={(currentVideoIndex / currentChapter.videos.length) * 100} 
      />

      {progress && (
        <CourseProgress 
          progress={progress} 
          currentChapterId={chapterId || ''} 
        />
      )}

      {!showQuiz && (
        <VideoNavigation
          currentIndex={currentVideoIndex}
          totalVideos={currentChapter.videos.length}
          onNext={() => setCurrentVideoIndex(prev => prev + 1)}
          onPrevious={() => setCurrentVideoIndex(prev => prev - 1)}
        />
      )}

      <NavigationControls
        currentStep={currentVideoIndex + 1}
        totalSteps={currentChapter?.videos.length || 0}
        onNext={handleContinue}
        onPrevious={() => setCurrentVideoIndex(prev => prev - 1)}
        isNextEnabled={isNextEnabled()}
      />
      
      {quizResult ? (
        <QuizResultComponent 
          result={quizResult}
          onContinue={handleContinue}
          onRetry={handleRetry}
          attemptCount={attemptCount}
        />
      ) : !showQuiz ? (
        <VideoPlayer 
          video={showSimplifiedVideo && currentVideo.simplifiedVersion 
            ? { 
                id: `${currentVideo.id}-simplified`,
                title: currentVideo.simplifiedVersion.title,
                url: currentVideo.simplifiedVersion.url,
                quizzes: []
              } 
            : currentVideo}
          onComplete={() => setShowQuiz(true)}
          isSimplified={showSimplifiedVideo}
          courseId={courseId || ''}
          chapterId={chapterId || ''}
        />
      ) : (
        <QuizComponent
          quiz={currentVideo.quizzes[0]}
          onComplete={handleQuizComplete}
          attemptCount={attemptCount}
        />
      )}

      {progress && chapterId && (
        <QuizHistory 
          attempts={progress.chapters
            .find((ch: ChapterProgress) => ch.chapterId === chapterId)
            ?.quizAttempts || []}
        />
      )}
      
    </Container>
  );
};

export default ChapterView;