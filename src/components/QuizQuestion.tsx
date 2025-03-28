
import { useState } from "react";

export interface Question {
  id: number;
  text: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
}

interface QuizQuestionProps {
  question: Question;
  onAnswerSubmit: (questionId: number, answer: string) => void;
  showResult?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswerSubmit,
  showResult = false,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(question.userAnswer || "");
  const [textAnswer, setTextAnswer] = useState<string>(question.userAnswer || "");
  
  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    onAnswerSubmit(question.id, option);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (showResult) return;
    
    setTextAnswer(e.target.value);
  };
  
  const handleTextSubmit = () => {
    if (showResult || !textAnswer.trim()) return;
    
    onAnswerSubmit(question.id, textAnswer);
  };

  const getOptionClassName = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option
        ? "bg-quiz-primary text-white"
        : "bg-white hover:bg-quiz-accent/30";
    }
    
    if (option === question.correctAnswer) {
      return "bg-green-100 border-green-300 text-green-800";
    }
    
    if (selectedAnswer === option && option !== question.correctAnswer) {
      return "bg-red-100 border-red-300 text-red-800";
    }
    
    return "bg-white opacity-50";
  };

  return (
    <div className="quiz-card p-6 space-y-6">
      <div className="flex items-start space-x-3">
        <span className="bg-quiz-primary text-white font-medium rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
          {question.id}
        </span>
        <h3 className="text-lg font-medium">{question.text}</h3>
      </div>

      <div>
        {question.options ? (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={showResult}
                className={`w-full text-left p-3 border rounded-md transition-colors ${getOptionClassName(
                  option
                )}`}
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
        ) : (
          <div className="space-y-3">
            <textarea
              className={`w-full p-3 border rounded-md min-h-[100px] ${
                showResult ? "bg-gray-50" : "bg-white"
              }`}
              placeholder="Type your answer here..."
              value={textAnswer}
              onChange={handleTextChange}
              disabled={showResult}
            />
            
            {!showResult && (
              <button
                onClick={handleTextSubmit}
                className="quiz-button-secondary text-sm px-3 py-1"
              >
                Save Answer
              </button>
            )}
            
            {showResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                <div className="font-medium text-sm text-gray-700 mb-2">Correct Answer:</div>
                <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800">
                  {question.correctAnswer}
                </div>
                
                {question.userAnswer && (
                  <>
                    <div className="font-medium text-sm text-gray-700 mt-4 mb-2">Your Answer:</div>
                    <div className={`p-3 rounded border ${
                      question.userAnswer.toLowerCase() === question.correctAnswer.toLowerCase() 
                        ? "bg-green-50 border-green-200 text-green-800" 
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}>
                      {question.userAnswer}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
