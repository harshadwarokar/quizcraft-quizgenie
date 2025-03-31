
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ResultsSummary from "@/components/ResultsSummary";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/AdBanner";

interface QuizResult {
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  explanation: string;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    // Retrieve quiz results from session storage
    const storedResults = sessionStorage.getItem('quizResults');
    const storedPercentage = sessionStorage.getItem('quizScorePercentage');
    const storedCorrect = sessionStorage.getItem('quizCorrectAnswers');
    const storedTotal = sessionStorage.getItem('quizTotalQuestions');
    
    if (!storedResults || !storedPercentage || !storedCorrect || !storedTotal) {
      navigate('/create');
      return;
    }
    
    try {
      setResults(JSON.parse(storedResults));
      setScorePercentage(parseFloat(storedPercentage));
      setCorrectAnswers(parseInt(storedCorrect));
      setTotalQuestions(parseInt(storedTotal));
    } catch (error) {
      console.error("Error parsing results:", error);
      navigate('/create');
    }
  }, [navigate]);

  const getPerfLevel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Satisfactory";
    if (score >= 40) return "Needs Improvement";
    return "Poor";
  };

  return (
    <PageLayout>
      <section className="py-8">
        <div className="content-container max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-heading mb-4">Quiz Results</h1>
            <p className="text-gray-600">
              Here's how you performed on your quiz
            </p>
          </div>
          
          {/* Top ad banner */}
          <AdBanner size="medium" className="mb-8" />
          
          <ResultsSummary 
            score={scorePercentage} 
            correct={correctAnswers} 
            total={totalQuestions} 
            performanceLevel={getPerfLevel(scorePercentage)}
          />

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Detailed Question Analysis</h2>
            <Accordion type="single" collapsible className="w-full">
              {results.map((result, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg mb-4 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                    <div className="flex items-start text-left">
                      <div className={`min-w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        result.is_correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {result.is_correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <div className="text-base font-medium">
                        <span className="text-gray-500 mr-2">Q{index + 1}.</span>
                        {result.question}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 bg-gray-50">
                    <div className="space-y-4 pl-11">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Your answer:</p>
                        <p className={`mt-1 ${result.is_correct ? "text-green-700" : "text-red-700"}`}>
                          {result.user_answer || "No answer provided"}
                        </p>
                      </div>
                      
                      {!result.is_correct && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Correct answer:</p>
                          <p className="mt-1 text-green-700">{result.correct_answer}</p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">Explanation:</p>
                        <p className="mt-1 text-gray-800">{result.explanation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Middle ad banner */}
          <AdBanner size="small" className="my-8" />
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate('/create')}
              className="quiz-button-primary"
              size="lg"
            >
              Create New Quiz
            </Button>
            <Button
              onClick={() => {
                // Clear the current quiz and restart with the same content
                sessionStorage.removeItem('quizResults');
                sessionStorage.removeItem('quizScorePercentage');
                sessionStorage.removeItem('quizCorrectAnswers');
                sessionStorage.removeItem('quizTotalQuestions');
                navigate('/quiz');
              }}
              variant="outline"
              size="lg"
            >
              Retake Quiz
            </Button>
          </div>
          
          {/* Bottom ad banner */}
          <AdBanner size="large" className="mt-12" />
        </div>
      </section>
    </PageLayout>
  );
};

export default ResultsPage;
