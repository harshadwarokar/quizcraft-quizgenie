
import { CheckCircle, XCircle } from "lucide-react";

interface ResultsSummaryProps {
  score: number;
  correct: number;
  total: number;
  performanceLevel: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  score, 
  correct, 
  total, 
  performanceLevel 
}) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="quiz-card p-6 space-y-6">
      <div className="flex flex-col items-center py-6">
        <div className={`text-5xl font-bold ${getScoreColor()}`}>
          {score}%
        </div>
        <div className="text-gray-500 mt-2">
          {correct} out of {total} correct
        </div>
        <div className="mt-4 px-4 py-2 rounded-full bg-gray-100 text-gray-800">
          Performance: <span className="font-medium">{performanceLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Total Questions</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Correct Answers</div>
          <div className="text-2xl font-bold">{correct}</div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600">Correct answers are marked in green</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <XCircle className="h-5 w-5 text-red-500" />
          <span className="text-sm text-gray-600">Incorrect answers are marked in red</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
