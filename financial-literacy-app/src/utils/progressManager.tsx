import { Course } from '../types/course';

export const isChapterUnlocked = (
  chapterId: string,
  course: Course
): boolean => {
  if (chapterId === course.chapters[0].id) return true; // First chapter always unlocked
  
  const currentChapterIndex = course.chapters.findIndex(ch => ch.id === chapterId);
  const previousChapterId = course.chapters[currentChapterIndex - 1]?.id;
  
  return previousChapterId ? course.completedChapters.includes(previousChapterId) : false;
};

export const updateCourseProgress = (
  course: Course,
  completedChapterId: string
): Course => {
  return {
    ...course,
    completedChapters: [...course.completedChapters, completedChapterId],
    currentChapter: course.chapters[course.chapters.findIndex(ch => ch.id === completedChapterId) + 1]?.id
  };
};