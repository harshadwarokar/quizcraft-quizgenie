
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuizQuestion, { Question } from "@/components/QuizQuestion";
import Timer from "@/components/Timer";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { submitQuiz as submitQuizAPI } from "@/utils/api";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [timeMinutes, setTimeMinutes] = useState(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch this data from a state management store or API
    const storedQuestions = sessionStorage.getItem('quizQuestions');
    const storedTime = sessionStorage.getItem('quizTime');
    const storedFile = sessionStorage.getItem('quizFile');
    const storedQuizId = sessionStorage.getItem('quizId');
    
    if (!storedQuestions || !storedTime) {
      // If no quiz data, redirect back to create page
      toast.error("No quiz data found. Please create a new quiz.");
      navigate('/create');
      return;
    }
    
    setQuestions(JSON.parse(storedQuestions));
    setTimeMinutes(parseInt(storedTime, 10));
    setFileName(storedFile || "Document");
    if (storedQuizId) setQuizId(storedQuizId);
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
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    // Mark the quiz as completed to prevent multiple submissions
    if (isQuizCompleted) return;
    setIsQuizCompleted(true);
    
    try {
      // If we have a quizId, use the API to submit the quiz
      if (quizId) {
        const answers = questions.map(q => q.userAnswer || ""); // Get all user answers
        const results = await submitQuizAPI(quizId, answers);
        
        // Store results in session storage
        sessionStorage.setItem('quizResults', JSON.stringify(results.detailed_results));
        sessionStorage.setItem('quizScore', results.score_percentage.toString());
        sessionStorage.setItem('quizCorrect', results.correct_answers.toString());
        sessionStorage.setItem('quizTotal', results.total_questions.toString());
      } else {
        // Fallback to local storage if no quizId (mock mode)
        sessionStorage.setItem('quizResults', JSON.stringify(questions));
      }
      
      navigate('/results');
    } catch (error: any) {
      toast.error(error.message || "Failed to submit quiz. Your answers have been saved locally.");
      // Store results locally as fallback
      sessionStorage.setItem('quizResults', JSON.stringify(questions));
      navigate('/results');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter(q => q.userAnswer).length;
  
  // Set page title
  useEffect(() => {
    document.title = `Quiz in Progress | AIExam`;
    return () => {
      document.title = "AIExam";
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

      {/* Google Ad Banner - Top */}
      <div className="content-container py-4">
        <div className="text-sm text-gray-500 text-center">Advertisement</div>
        <div className="h-[90px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
          <p className="text-gray-400">Google Ad Space</p>
        </div>
      </div>

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
            onClick={handleSubmitQuiz}
            disabled={isQuizCompleted}
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

        {/* Google Ad Banner - Bottom */}
        <div className="mt-8">
          <div className="text-sm text-gray-500 text-center">Advertisement</div>
          <div className="h-[250px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <p className="text-gray-400">Google Ad Space</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizPage;
