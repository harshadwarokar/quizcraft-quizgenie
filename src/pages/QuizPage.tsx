import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuizQuestion, { QuizQuestion as QuizQuestionType } from "@/components/QuizQuestion";
import { Progress } from "@/components/ui/progress";
import Timer from "@/components/Timer";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { submitQuiz as submitQuizAPI } from "@/utils/api";
import AdBanner from "@/components/AdBanner";
import AdPopup from "@/components/AdPopup";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeInMinutes, setTimeInMinutes] = useState(15);
  const [fileTitle, setFileTitle] = useState<string>("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    const storedQuestions = sessionStorage.getItem('quizQuestions');
    const storedTime = sessionStorage.getItem('quizTime');
    const storedFile = sessionStorage.getItem('quizFile');
    const storedQuizId = sessionStorage.getItem('quizId');
    
    if (!storedQuestions) {
      toast.error("No quiz questions found. Please create a new quiz.");
      navigate('/create');
      return;
    }
    
    try {
      const parsedQuestions = JSON.parse(storedQuestions);
      setQuestions(parsedQuestions);
      if (storedTime) setTimeInMinutes(parseInt(storedTime));
      if (storedFile) setFileTitle(storedFile);
      if (storedQuizId) setQuizId(storedQuizId);
    } catch (error) {
      console.error("Error parsing questions:", error);
      toast.error("There was a problem loading the quiz. Please try again.");
      navigate('/create');
    }
  }, [navigate]);

  const handleAnswerSelect = (selectedOption: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = selectedOption;
    setQuestions(updatedQuestions);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
      // Show ad popup
      setShowAdPopup(true);
      
      // If we have a quizId, use the API to submit the quiz
      if (quizId) {
        const answers = questions.map(q => q.userAnswer || ""); // Get all user answers
        try {
          const results = await submitQuizAPI(quizId, answers);
          
          // Store results in session storage
          sessionStorage.setItem('quizResults', JSON.stringify(results.detailed_results));
          sessionStorage.setItem('quizScorePercentage', results.score_percentage.toString());
          sessionStorage.setItem('quizCorrectAnswers', results.correct_answers.toString());
          sessionStorage.setItem('quizTotalQuestions', results.total_questions.toString());
          
          // Navigate to results page
          setTimeout(() => {
            navigate('/results');
          }, 1000);
        } catch (error: any) {
          console.error("Error submitting quiz:", error);
          handleFallbackSubmission();
        }
      } else {
        // If no quizId, use the correct_answer field if available in questions
        handleFallbackSubmission();
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("There was a problem submitting your quiz. Please try again.");
      setIsQuizCompleted(false);
    }
  };
  
  const handleFallbackSubmission = () => {
    // Calculate results using correct_answer if available from the API
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    
    // Process detailed results
    const detailedResults = questions.map((q) => {
      // If we have the correct_answer from the API, use it
      const correctAnswer = q.correct_answer || q.options[0]; // Default to first option if no correct answer
      const userAnswer = q.userAnswer || "";
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect) correctAnswers++;
      
      return {
        question: q.question,
        user_answer: userAnswer,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
        explanation: q.explanation || `Explanation for ${q.question}`
      };
    });
    
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    
    // Store in session storage
    sessionStorage.setItem('quizResults', JSON.stringify(detailedResults));
    sessionStorage.setItem('quizScorePercentage', scorePercentage.toString());
    sessionStorage.setItem('quizCorrectAnswers', correctAnswers.toString());
    sessionStorage.setItem('quizTotalQuestions', totalQuestions.toString());
    
    // Navigate to results page
    setTimeout(() => {
      navigate('/results');
    }, 1000);
  };

  const getCompletionPercentage = () => {
    const answeredQuestions = questions.filter(q => q.userAnswer).length;
    return (answeredQuestions / questions.length) * 100;
  };

  if (questions.length === 0) {
    return (
      <PageLayout>
        <div className="content-container py-12 text-center">
          <p>Loading quiz questions...</p>
        </div>
      </PageLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = getCompletionPercentage();

  return (
    <PageLayout>
      <div className="content-container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold gradient-heading mb-1">Quiz in Progress</h1>
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                <span>{fileTitle}</span>
              </div>
            </div>
            
            <Timer 
              initialMinutes={timeInMinutes} 
              onTimeEnd={handleTimeEnd}
              isQuizCompleted={isQuizCompleted}
            />
          </div>
          
          {/* Top ad banner */}
          <AdBanner size="small" className="mb-6" />
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="quiz-card p-6 mb-6">
            <div className="mb-4 flex justify-between">
              <span className="font-medium text-quiz-primary">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              {currentQuestion.userAnswer && (
                <span className="text-green-600 text-sm">Answered</span>
              )}
            </div>
            
            <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={currentQuestion.userAnswer}
              onSelect={handleAnswerSelect}
              questionIndex={currentQuestionIndex}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={goToNextQuestion}
                className="flex items-center space-x-2 px-4 py-2 rounded text-quiz-primary hover:bg-quiz-accent/30"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={isQuizCompleted}
                className="quiz-button-secondary px-6 py-2"
              >
                {isQuizCompleted ? "Submitting..." : "Submit Quiz"}
              </button>
            )}
          </div>
          
          {/* Question navigation */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-3">Quick Navigation:</p>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${currentQuestionIndex === index ? 'bg-quiz-primary text-white' : 
                      q.userAnswer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom ad banner */}
          <AdBanner size="medium" className="mt-8" />
        </div>
      </div>
      
      {/* Ad popup when quiz is completed */}
      {showAdPopup && (
        <AdPopup
          trigger="quiz-completion"
          onClose={() => setShowAdPopup(false)}
        />
      )}
    </PageLayout>
  );
};

export default QuizPage;
