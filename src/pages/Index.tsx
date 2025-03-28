
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { FileText, Timer, CheckSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-quiz-accent/20 py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold gradient-heading tracking-tight">
              Transform Documents into Interactive Quizzes
            </h1>
            <p className="text-lg text-gray-600">
              Upload PDF, Word, or text files and QuizCraft will generate
              customized quizzes to test knowledge and enhance learning.
            </p>
            <button 
              onClick={() => navigate("/create")}
              className="quiz-button-primary text-lg px-8 py-3 mt-6"
            >
              Create Your Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 mt-2">Simple steps to create customized quizzes from your documents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="quiz-card p-6 flex flex-col items-center text-center">
              <div className="bg-quiz-accent p-4 rounded-full mb-5">
                <FileText className="h-6 w-6 text-quiz-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Upload Your Document</h3>
              <p className="text-gray-600">
                Upload any PDF, Word document, or text file containing your learning material.
              </p>
            </div>

            <div className="quiz-card p-6 flex flex-col items-center text-center">
              <div className="bg-quiz-accent p-4 rounded-full mb-5">
                <Timer className="h-6 w-6 text-quiz-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Configure Your Quiz</h3>
              <p className="text-gray-600">
                Choose the number of questions and set a time limit for your quiz.
              </p>
            </div>

            <div className="quiz-card p-6 flex flex-col items-center text-center">
              <div className="bg-quiz-accent p-4 rounded-full mb-5">
                <CheckSquare className="h-6 w-6 text-quiz-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Take and Review</h3>
              <p className="text-gray-600">
                Complete the interactive quiz and get instant feedback on your performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-quiz-primary/5">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Create Your Own Quiz?</h2>
            <p className="text-gray-600">
              Transform your documents into interactive learning experiences in minutes.
            </p>
            <button 
              onClick={() => navigate("/create")}
              className="quiz-button-primary text-lg px-8 py-3 mt-4"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
