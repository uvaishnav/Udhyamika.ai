import { Course } from '../types/course';

const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Financial Basics',
      description: 'Learn the fundamentals of financial management',
      totalChapters: 3,
      duration: '2h 30m',
      progress: 0,
      currentChapter: 'ch1',
      completedChapters: [],
      chapters: [
        {
          id: 'ch1',
          title: 'Introduction to Finance',
          duration: '30m',
          completed: false,
          isLocked: false,
          videos: [
            {
              id: 'v1',
              title: 'What is Financial Literacy?',
              url: 'https://www.youtube.com/watch?v=HZ_Q20ir-gg',
              quizzes: [
                {
                  id: 'q1',
                  question: 'What is the main purpose of financial literacy?',
                  options: [
                    'Making quick money',
                    'Understanding money management',
                    'Becoming rich overnight',
                    'Avoiding all expenses'
                  ],
                  correctAnswer: 1
                }
              ]
            }
          ]
        },
        {
          id: 'ch2',
          title: 'Savings and Budgeting',
          duration: '45m',
          completed: false,
          isLocked: true,
          videos: [
            {
              id: 'v2',
              title: 'Basic Budgeting',
              url: 'https://www.youtube.com/watch?v=ARGbxFY9McA',
              quizzes: [
                {
                  id: 'q2',
                  question: 'Why is budgeting important?',
                  options: [
                    'To track expenses',
                    'To plan savings',
                    'To manage money better',
                    'All of the above'
                  ],
                  correctAnswer: 3
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Business Planning',
      description: 'Create your business plan step by step',
      totalChapters: 2,
      duration: '2h',
      progress: 0,
      currentChapter: 'ch1',
      completedChapters: [],
      chapters: [
        {
          id: 'ch1',
          title: 'Business Basics',
          duration: '60m',
          completed: false,
          isLocked: false,
          videos: [
            {
              id: 'v1',
              title: 'What is a Business Plan?',
              url: 'https://www.youtube.com/watch?v=ARGbxFY9McA',
              quizzes: [
                {
                  id: 'q1',
                  question: 'What is a business plan?',
                  options: [
                    'A daily schedule',
                    'A roadmap for business success',
                    'A list of expenses',
                    'A marketing strategy'
                  ],
                  correctAnswer: 1
                }
              ]
            }
          ]
        }
      ]
    }
  ];

export { mockCourses };