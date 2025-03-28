
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import FileUpload from "@/components/FileUpload";
import QuizSettings from "@/components/QuizSettings";
import { toast } from "sonner";
import { generateMockQuestions } from "@/utils/mockData";
import { ArrowRight } from "lucide-react";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleSettingsChange = (numQuestions: number, timeMinutes: number) => {
    setQuestions(numQuestions);
    setMinutes(timeMinutes);
  };

  const handleCreateQuiz = () => {
    if (!file) {
      toast.error("Please upload a document first");
      return;
    }

    setIsGenerating(true);
    
    // In a real application, we would send the file to a backend for processing
    // For now, we'll simulate this with a timeout and use mock data
    setTimeout(() => {
      const mockQuestions = generateMockQuestions(questions);
      
      // In a real app, we would store this in a database or state management
      // For this demo, we'll use session storage to persist between pages
      sessionStorage.setItem('quizQuestions', JSON.stringify(mockQuestions));
      sessionStorage.setItem('quizTime', minutes.toString());
      sessionStorage.setItem('quizFile', file.name);
      
      setIsGenerating(false);
      navigate('/quiz');
    }, 2000);
  };

  return (
    <PageLayout>
      <section className="py-12">
        <div className="content-container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold gradient-heading mb-4">Create Your Quiz</h1>
            <p className="text-gray-600">
              Upload your document and customize quiz settings to get started
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="quiz-card p-6">
              <h2 className="text-xl font-semibold mb-6">Upload Document</h2>
              <FileUpload onFileSelected={handleFileSelected} />
              
              {file && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                  {file.name} uploaded successfully. Now customize your quiz settings.
                </div>
              )}
            </div>
            
            <div className="quiz-card p-6">
              <h2 className="text-xl font-semibold mb-6">Quiz Settings</h2>
              <QuizSettings onSettingsChange={handleSettingsChange} />
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleCreateQuiz}
                  disabled={!file || isGenerating}
                  className={`flex items-center space-x-2 ${
                    !file || isGenerating 
                      ? "bg-gray-300 cursor-not-allowed text-gray-500" 
                      : "quiz-button-primary"
                  } px-6 py-3`}
                >
                  <span>{isGenerating ? "Generating Quiz..." : "Create Quiz"}</span>
                  {!isGenerating && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-3">Tips for Best Results</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>Use clear, well-formatted documents for better question generation</li>
              <li>PDFs with selectable text work better than scanned documents</li>
              <li>For longer documents, consider breaking them into smaller sections</li>
              <li>Start with fewer questions for quicker generation</li>
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CreateQuiz;
