
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { FileText, Timer, CheckSquare, Youtube, FileWord, MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-quiz-accent/20 py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold gradient-heading tracking-tight">
              Transform Content into Interactive Quizzes
            </h1>
            <p className="text-lg text-gray-600">
              Upload PDF, Word, or text files, paste text, or link YouTube videos, and AIExam will generate
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

      {/* Google Ad Banner */}
      <div className="py-6 bg-gray-50">
        <div className="content-container">
          <div className="text-sm text-gray-500 text-center mb-2">Advertisement</div>
          <div className="h-[90px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <p className="text-gray-400">Google Ad Space</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 mt-2">Simple steps to create customized quizzes from your content</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="quiz-card p-6 flex flex-col items-center text-center">
              <div className="bg-quiz-accent p-4 rounded-full mb-5">
                <FileText className="h-6 w-6 text-quiz-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Upload Your Content</h3>
              <p className="text-gray-600">
                Upload PDF, Word document, paste text, or add a YouTube video URL.
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

      {/* Content Types Section */}
      <section className="py-16 bg-quiz-primary/5">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Supported Content Types</h2>
            <p className="text-gray-600 mt-2">Generate quizzes from various types of content</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-quiz-primary" />
                <h3 className="font-medium">PDF Documents</h3>
              </div>
              <p className="text-sm text-gray-600">
                Upload PDF files up to 4MB. Perfect for course materials and research papers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <FileWord className="h-5 w-5 text-quiz-primary" />
                <h3 className="font-medium">Word Documents</h3>
              </div>
              <p className="text-sm text-gray-600">
                Upload DOC or DOCX files up to 4MB. Great for essays and written content.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="h-5 w-5 text-quiz-primary" />
                <h3 className="font-medium">Text Input</h3>
              </div>
              <p className="text-sm text-gray-600">
                Paste text up to 25,000 characters. Ideal for quick quizzes from notes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Youtube className="h-5 w-5 text-quiz-primary" />
                <h3 className="font-medium">YouTube Videos</h3>
              </div>
              <p className="text-sm text-gray-600">
                Enter a YouTube URL to generate questions from educational videos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Ad Banner */}
      <div className="py-6 bg-white">
        <div className="content-container">
          <div className="text-sm text-gray-500 text-center mb-2">Advertisement</div>
          <div className="h-[250px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <p className="text-gray-400">Google Ad Space</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-quiz-primary/5">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Create Your Own Quiz?</h2>
            <p className="text-gray-600">
              Transform your documents, text, or videos into interactive learning experiences in minutes.
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
