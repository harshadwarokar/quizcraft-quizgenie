
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuizQuestion, { Question } from "@/components/QuizQuestion";
import ResultsSummary from "@/components/ResultsSummary";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeMinutes, setTimeMinutes] = useState(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionDetails, setShowQuestionDetails] = useState(false);

  useEffect(() => {
    // Get quiz results from session storage
    const storedResults = sessionStorage.getItem('quizResults');
    const storedTime = sessionStorage.getItem('quizTime');
    
    if (!storedResults) {
      // If no results, redirect to home
      navigate('/');
      return;
    }
    
    setQuestions(JSON.parse(storedResults));
    if (storedTime) {
      setTimeMinutes(parseInt(storedTime, 10));
    }
  }, [navigate]);

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

  const handleStartNew = () => {
    // Clear session storage and redirect to create page
    sessionStorage.removeItem('quizQuestions');
    sessionStorage.removeItem('quizResults');
    sessionStorage.removeItem('quizTime');
    sessionStorage.removeItem('quizFile');
    navigate('/create');
  };

  const toggleQuestionDetails = () => {
    setShowQuestionDetails(!showQuestionDetails);
  };

  return (
    <PageLayout>
      <div className="content-container py-8">
        {questions.length > 0 ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold gradient-heading mb-4">Quiz Results</h1>
              <p className="text-gray-600">
                Review your performance and see correct answers
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <ResultsSummary 
                  questions={questions} 
                  totalTime={timeMinutes} 
                />
                <div className="mt-6 flex flex-col space-y-3">
                  <button
                    onClick={toggleQuestionDetails}
                    className="quiz-button-secondary w-full"
                  >
                    {showQuestionDetails ? "Hide" : "Review"} Question Details
                  </button>
                  <button
                    onClick={handleStartNew}
                    className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Create New Quiz</span>
                  </button>
                </div>
              </div>

              {showQuestionDetails && (
                <div className="lg:col-span-2">
                  <div className="quiz-card">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                      <h3 className="font-medium">Question Details</h3>
                      <span className="text-sm text-gray-500">
                        {currentQuestionIndex + 1} of {questions.length}
                      </span>
                    </div>
                    
                    <div className="p-6">
                      <QuizQuestion 
                        question={questions[currentQuestionIndex]} 
                        onAnswerSubmit={() => {}} 
                        showResult={true} 
                      />
                      
                      <div className="flex justify-between mt-6">
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
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-xl text-gray-600">No quiz results found.</p>
              <button
                onClick={() => navigate('/create')}
                className="quiz-button-primary mt-4"
              >
                Create a Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ResultsPage;
