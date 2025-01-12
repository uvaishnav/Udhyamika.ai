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
            url: 'https://drive.google.com/file/d/1DXcUlhTBXbkQxLRN-ZcTgprVE37L1g9U/preview', // Updated URL
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
                correctAnswer: 1,
                explanation: 'Understanding money management is the main purpose of financial literacy.'
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
            url: 'https://drive.google.com/file/d/1DXcUlhTBXbkQxLRN-ZcTgprVE37L1g9U/preview', // Updated URL
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
                correctAnswer: 3,
                explanation: 'Budgeting is important to track expenses, plan savings, and manage money better.'
              }
            ]
          }
        ]
      },
      {
        id: 'ch3',
        title: 'Investing Basics',
        duration: '1h 15m',
        completed: false,
        isLocked: true,
        videos: [
          {
            id: 'v3',
            title: 'Introduction to Investing',
            url: 'https://drive.google.com/file/d/1FWaEagZGkcxAiDlQxRshGdGOSAi1jd1f/preview', // Updated URL
            quizzes: [
              {
                id: 'q3',
                question: 'What is the primary goal of investing?',
                options: [
                  'To save money',
                  'To grow wealth over time',
                  'To avoid taxes',
                  'To spend money'
                ],
                correctAnswer: 1,
                explanation: 'The primary goal of investing is to grow wealth over time.'
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
            url: '../../../public/TASK-3(VEDIO).mov', // Updated URL
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
                correctAnswer: 1,
                explanation: 'A business plan is a roadmap for business success.'
              }
            ]
          }
        ]
      },
      {
        id: 'ch2',
        title: 'Market Research',
        duration: '1h',
        completed: false,
        isLocked: true,
        videos: [
          {
            id: 'v2',
            title: 'Conducting Market Research',
            url: 'https://drive.google.com/file/d/1FWaEagZGkcxAiDlQxRshGdGOSAi1jd1f/preview', // Updated URL
            quizzes: [
              {
                id: 'q2',
                question: 'Why is market research important?',
                options: [
                  'To understand customer needs',
                  'To identify market trends',
                  'To make informed business decisions',
                  'All of the above'
                ],
                correctAnswer: 3,
                explanation: 'Market research is important to understand customer needs, identify market trends, and make informed business decisions.'
              }
            ]
          }
        ]
      }
    ]
  }
];

export { mockCourses };