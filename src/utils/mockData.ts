
import { Question } from "@/components/QuizQuestion";

export const generateMockQuestions = (count: number): Question[] => {
  const questions: Question[] = [];
  
  for (let i = 1; i <= count; i++) {
    // Create a mix of multiple choice and text questions
    const isMultipleChoice = i % 3 !== 0;
    
    if (isMultipleChoice) {
      questions.push({
        id: i,
        text: `Sample multiple-choice question ${i}. What is the correct answer?`,
        options: [
          `Option A for question ${i}`,
          `Option B for question ${i}`,
          `Option C for question ${i}`,
          `Option D for question ${i}`,
        ],
        correctAnswer: `Option ${String.fromCharCode(65 + (i % 4))} for question ${i}`,
      });
    } else {
      questions.push({
        id: i,
        text: `Sample text-based question ${i}. Please provide your answer below.`,
        correctAnswer: `This is the correct answer for text question ${i}.`,
      });
    }
  }
  
  return questions;
};
