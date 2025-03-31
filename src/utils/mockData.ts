
import { QuizQuestion } from "@/components/QuizQuestion";

export const generateMockQuestions = (count: number): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  
  for (let i = 1; i <= count; i++) {
    // Create a mix of multiple choice questions
    questions.push({
      question: `Sample multiple-choice question ${i}. What is the correct answer?`,
      options: [
        `Option A for question ${i}`,
        `Option B for question ${i}`,
        `Option C for question ${i}`,
        `Option D for question ${i}`,
      ],
      userAnswer: undefined
    });
  }
  
  return questions;
};
