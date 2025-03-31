
import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  userAnswer?: string;
  correct_answer?: string;
  explanation?: string;
}

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  questionIndex: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelect,
  questionIndex
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{question}</h3>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full text-left p-3 border rounded-md transition-colors 
              ${selectedOption === option
                ? "bg-quiz-primary text-white"
                : "bg-white hover:bg-quiz-accent/30"
              }`}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full border inline-flex items-center justify-center mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export { type QuizQuestion };
export default QuizQuestion;
