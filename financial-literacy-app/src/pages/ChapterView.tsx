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
  const [showSimplifiedVideo, setShowSimplifiedVideo] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [videoWatched, setVideoWatched] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const THRESHOLD_SCORE = 70;

  const currentChapter: Chapter | undefined = mockCourse.chapters.find(ch => ch.id === chapterId);
  const currentVideo: Video | undefined = currentChapter?.videos[currentVideoIndex];

  const progressManager = new ProgressManager();
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (courseId) {
        const savedProgress = await progressManager.getProgress(courseId, 'current_user');
        setProgress(savedProgress);
      }
    };
    fetchProgress();
  }, [courseId]);

  // Check if the "Next" button should be enabled
  const checkIsNextEnabled = () => {
    if (!currentVideo || !chapterId) return false;
    if (showQuiz) return false;
    if (quizResult?.passed) return true;
    return videoWatched; // Ensure video is watched before enabling "Next"
  };

  useEffect(() => {
    setIsNextEnabled(checkIsNextEnabled());
  }, [progress, quizResult, videoWatched, currentVideoIndex, showQuiz]);

  useEffect(() => {
    if (progress && chapterId && currentVideo) {
      const isWatched = progress.chapters
        .find(ch => ch.chapterId === chapterId)
        ?.videoProgress
        .find(vp => vp.videoId === currentVideo.id)
        ?.watched || false;
      setIsNextEnabled(isWatched);
    }
  }, [progress, chapterId, currentVideo]);  

  if (!currentChapter || !currentVideo) {
    return <div>Chapter or video not found</div>;
  }

  const handleVideoComplete = async () => {
    if (!courseId || !chapterId || !currentVideo) {
      console.error('Missing required data for video progress update');
      return;
    }
  
    const updatedProgress = await progressManager.updateVideoProgress(
      courseId,
      chapterId,
      currentVideo.id,
      {
        position: 100,
        watched: true,
        watchedDuration: 100,
        lastPosition: 100,
        watchedPercentage: 100,
        lastWatched: new Date()
      }
    );
    setProgress(updatedProgress);
    setVideoWatched(true);
    setShowQuiz(true);
    setIsNextEnabled(true); // Enable "Next" button after watching the video
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
      setShowSimplifiedVideo(true); // Show simplified video after 2 failed attempts
    }
    setShowQuiz(false);
    setQuizResult(null);
  };

  const calculateProgress = () => {
    if (!progress || !currentChapter) return 0;
    const completedChapters = progress.completedChapters.length;
    const totalChapters = mockCourse.chapters.length;
    return (completedChapters / totalChapters) * 100;
  };

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
        isNextEnabled={isNextEnabled}  
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
          onComplete={handleVideoComplete}
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