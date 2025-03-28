
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuizQuestion, { Question } from "@/components/QuizQuestion";
import Timer from "@/components/Timer";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, FileText } from "lucide-react";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [timeMinutes, setTimeMinutes] = useState(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch this data from a state management store or API
    const storedQuestions = sessionStorage.getItem('quizQuestions');
    const storedTime = sessionStorage.getItem('quizTime');
    const storedFile = sessionStorage.getItem('quizFile');
    
    if (!storedQuestions || !storedTime) {
      // If no quiz data, redirect back to create page
      toast.error("No quiz data found. Please create a new quiz.");
      navigate('/create');
      return;
    }
    
    setQuestions(JSON.parse(storedQuestions));
    setTimeMinutes(parseInt(storedTime, 10));
    setFileName(storedFile || "Document");
  }, [navigate]);

  const handleAnswerSubmit = (questionId: number, answer: string) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.id === questionId ? { ...q, userAnswer: answer } : q
      )
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleTimeEnd = () => {
    toast.warning("Time's up! Your quiz has been submitted.");
    submitQuiz();
  };

  const submitQuiz = () => {
    // In a real app, we would send the answers to an API for evaluation
    // For now, we'll just store them in session storage and navigate to results
    sessionStorage.setItem('quizResults', JSON.stringify(questions));
    setIsQuizCompleted(true);
    navigate('/results');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter(q => q.userAnswer).length;
  
  // Set page title
  useEffect(() => {
    document.title = `Quiz in Progress | QuizCraft`;
    return () => {
      document.title = "QuizCraft";
    };
  }, []);

  if (questions.length === 0) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse-light text-center">
            <p className="text-xl text-gray-600">Loading quiz...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Timer */}
      <Timer 
        totalSeconds={timeMinutes * 60} 
        onTimeEnd={handleTimeEnd} 
      />

      <div className="content-container py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{fileName}</span>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Quiz in Progress
            </h1>
            <div className="bg-quiz-accent text-quiz-primary px-3 py-1 rounded-full text-sm font-medium">
              {answeredCount}/{questions.length} Answered
            </div>
          </div>
        </div>

        {currentQuestion && (
          <div className="mb-8">
            <QuizQuestion 
              question={currentQuestion} 
              onAnswerSubmit={handleAnswerSubmit} 
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                currentQuestionIndex === questions.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={submitQuiz}
            className="quiz-button-secondary px-6 py-2"
          >
            Submit Quiz
          </button>
        </div>

        <div className="mt-8">
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="flex overflow-x-auto py-2 space-x-2">
              {questions.map((q, index) => (
                <button 
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? "bg-quiz-primary text-white"
                      : q.userAnswer
                      ? "bg-quiz-accent text-quiz-primary"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizPage;
