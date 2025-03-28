
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface QuizSettingsProps {
  onSettingsChange: (questions: number, minutes: number) => void;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({ onSettingsChange }) => {
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(15);

  const handleQuestionsChange = (value: number[]) => {
    const newValue = value[0];
    setQuestions(newValue);
    onSettingsChange(newValue, minutes);
  };

  const handleMinutesChange = (value: number[]) => {
    const newValue = value[0];
    setMinutes(newValue);
    onSettingsChange(questions, newValue);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label htmlFor="questions" className="text-sm font-medium">
            Number of Questions
          </label>
          <span className="text-sm font-semibold bg-quiz-accent px-3 py-1 rounded-full text-quiz-primary">
            {questions}
          </span>
        </div>
        <Slider
          id="questions"
          min={5}
          max={40}
          step={5}
          value={[questions]}
          onValueChange={handleQuestionsChange}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5</span>
          <span>40</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label htmlFor="time" className="text-sm font-medium">
            Time Limit (minutes)
          </label>
          <span className="text-sm font-semibold bg-quiz-accent px-3 py-1 rounded-full text-quiz-primary">
            {minutes}
          </span>
        </div>
        <Slider
          id="time"
          min={5}
          max={60}
          step={5}
          value={[minutes]}
          onValueChange={handleMinutesChange}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5</span>
          <span>60</span>
        </div>
      </div>
    </div>
  );
};

export default QuizSettings;
