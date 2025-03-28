
import { useEffect, useState } from "react";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  totalSeconds: number;
  onTimeEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ totalSeconds, onTimeEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeEnd();
      return;
    }

    // Set warning state when less than 20% of time remains
    if (timeRemaining <= totalSeconds * 0.2 && !isWarning) {
      setIsWarning(true);
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, totalSeconds, onTimeEnd, isWarning]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Calculate progress percentage
  const progressPercentage = (timeRemaining / totalSeconds) * 100;

  return (
    <div className="fixed top-20 right-4 z-40 md:right-8">
      <div 
        className={`p-3 rounded-lg shadow-md flex items-center space-x-2 transition-colors ${
          isWarning ? "bg-red-100" : "bg-white"
        }`}
      >
        <TimerIcon 
          className={`h-5 w-5 ${isWarning ? "text-red-500" : "text-quiz-primary"}`} 
        />
        <div className="text-sm font-bold">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full ${isWarning ? "bg-red-500" : "bg-quiz-primary"}`} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
