export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-3 (①-④)
  explanation?: string;
}

export interface TestData {
  year: string; // "令和6年度" 
  difficulty: "初級" | "上級";
  timeLimit: number; // minutes
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  answers: UserAnswer[];
  timeSpent: number; // minutes
}