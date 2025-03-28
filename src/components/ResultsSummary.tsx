
import { Question } from "./QuizQuestion";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultsSummaryProps {
  questions: Question[];
  totalTime: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ questions, totalTime }) => {
  const totalQuestions = questions.length;
  const attemptedQuestions = questions.filter(q => q.userAnswer).length;
  const correctAnswers = questions.filter(
    q => q.userAnswer && q.userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()
  ).length;
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="quiz-card">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Quiz Results</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center py-6">
          <div className={`text-5xl font-bold ${getScoreColor()}`}>
            {score}%
          </div>
          <div className="text-gray-500 mt-2">
            {correctAnswers} out of {totalQuestions} correct
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Questions</div>
            <div className="text-2xl font-bold">{totalQuestions}</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Attempted</div>
            <div className="text-2xl font-bold">{attemptedQuestions}</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Time Taken</div>
            <div className="text-2xl font-bold">{totalTime} min</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Question Summary</h3>
          
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {questions.map((question) => (
              <div 
                key={question.id} 
                className="flex items-center p-3 border rounded-md bg-white"
              >
                <div className="mr-3">
                  {question.userAnswer?.toLowerCase() === question.correctAnswer.toLowerCase() ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium line-clamp-1">{question.text}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                  Question {question.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
