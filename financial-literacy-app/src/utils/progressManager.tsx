import { Course } from '../types/course';
import { Progress } from '../types/progress';

export const isChapterUnlocked = (
  chapterId: string,
  course: Course
): boolean => {
  if (chapterId === course.chapters[0].id) return true; // First chapter always unlocked
  
  const currentChapterIndex = course.chapters.findIndex(ch => ch.id === chapterId);
  const previousChapterId = course.chapters[currentChapterIndex - 1]?.id;
  
  return previousChapterId ? course.completedChapters.includes(previousChapterId) : false;
};

export const updateCourseProgress = (course: Course, chapterId: string): Course => {
  const updatedCourse = { ...course };
  const chapterIndex = updatedCourse.chapters.findIndex(ch => ch.id === chapterId);

  if (chapterIndex !== -1) {
    updatedCourse.chapters[chapterIndex].completed = true;
    if (!updatedCourse.completedChapters.includes(chapterId)) {
      updatedCourse.completedChapters.push(chapterId);
    }

    if (chapterIndex + 1 < updatedCourse.chapters.length) {
      updatedCourse.chapters[chapterIndex + 1].isLocked = false;
    }
  }

  return updatedCourse;
};
