import type { TestResult, UserAnswer } from '../types';

export const calculateScore = (
  answers: UserAnswer[],
  timeSpent: number
): TestResult => {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  return {
    totalQuestions,
    correctAnswers,
    score,
    answers,
    timeSpent,
  };
};