
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import FileUpload from "@/components/FileUpload";
import QuizSettings from "@/components/QuizSettings";
import { toast } from "sonner";
import { generateMockQuestions } from "@/utils/mockData";
import { ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { generateQuizFromFile } from "@/utils/api";
import { checkApiHealth } from "@/utils/api";
import { useEffect } from "react";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the API is available
    const checkApi = async () => {
      try {
        const isHealthy = await checkApiHealth();
        setApiAvailable(isHealthy);
      } catch (error) {
        setApiAvailable(false);
        console.error("API health check failed:", error);
      }
    };
    
    checkApi();
  }, []);

  const handleFileSelected = (
    selectedFile: File | null, 
    text: string | null, 
    video: string | null
  ) => {
    setFile(selectedFile);
    setTextContent(text);
    setVideoUrl(video);
  };

  const handleSettingsChange = (numQuestions: number, timeMinutes: number) => {
    setQuestions(numQuestions);
    setMinutes(timeMinutes);
  };

  const handleCreateQuiz = async () => {
    if (!file && !textContent && !videoUrl) {
      toast.error("Please upload a file, enter text, or provide a YouTube URL");
      return;
    }

    setIsGenerating(true);
    
    try {
      if (apiAvailable) {
        // Use the real API if available
        let mockFile = file;
        
        // If text was provided instead of a file, create a text file
        if (textContent && !file) {
          const blob = new Blob([textContent], { type: 'text/plain' });
          mockFile = new File([blob], 'text-input.txt', { type: 'text/plain' });
        }
        
        // For YouTube URL, we'd need to send it differently or adapt the API
        // For now, we'll create a text file with the URL
        if (videoUrl && !file && !textContent) {
          const blob = new Blob([videoUrl], { type: 'text/plain' });
          mockFile = new File([blob], 'youtube-url.txt', { type: 'text/plain' });
        }
        
        if (mockFile) {
          const quiz = await generateQuizFromFile(mockFile, questions, minutes);
          
          // Store in session storage for the quiz page
          sessionStorage.setItem('quizQuestions', JSON.stringify(quiz.questions));
          sessionStorage.setItem('quizTime', minutes.toString());
          sessionStorage.setItem('quizId', quiz.quiz_id);
          
          if (file) sessionStorage.setItem('quizFile', file.name);
          else if (textContent) sessionStorage.setItem('quizFile', 'Text Input');
          else if (videoUrl) sessionStorage.setItem('quizFile', 'YouTube Video');
          
          navigate('/quiz');
        }
      } else {
        // Fallback to mock data
        setTimeout(() => {
          const mockQuestions = generateMockQuestions(questions);
          
          sessionStorage.setItem('quizQuestions', JSON.stringify(mockQuestions));
          sessionStorage.setItem('quizTime', minutes.toString());
          
          if (file) sessionStorage.setItem('quizFile', file.name);
          else if (textContent) sessionStorage.setItem('quizFile', 'Text Input');
          else if (videoUrl) sessionStorage.setItem('quizFile', 'YouTube Video');
          
          navigate('/quiz');
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageLayout>
      <section className="py-12">
        <div className="content-container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold gradient-heading mb-4">Create Your Quiz</h1>
            <p className="text-gray-600">
              Upload your document, paste text, or provide a YouTube URL to get started
            </p>
          </div>

          {apiAvailable === false && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>API Connection Failed</AlertTitle>
              <AlertDescription>
                Could not connect to the quiz generation API. You can still proceed, but we'll use mock data instead of generating real questions.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="quiz-card p-6">
              <h2 className="text-xl font-semibold mb-6">Upload Content</h2>
              <FileUpload onFileSelected={handleFileSelected} />
              
              {(file || textContent || videoUrl) && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                  {file ? `${file.name} uploaded successfully.` : 
                   textContent ? "Text content ready for quiz generation." :
                   "YouTube URL ready for quiz generation."}
                  {" Now customize your quiz settings."}
                </div>
              )}
            </div>
            
            <div className="quiz-card p-6">
              <h2 className="text-xl font-semibold mb-6">Quiz Settings</h2>
              <QuizSettings onSettingsChange={handleSettingsChange} />
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleCreateQuiz}
                  disabled={(!file && !textContent && !videoUrl) || isGenerating}
                  className={`flex items-center space-x-2 ${
                    (!file && !textContent && !videoUrl) || isGenerating 
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
              <li>Text input is limited to 25,000 characters and files to 4MB</li>
              <li>YouTube videos should be educational and contain clear information</li>
            </ul>
          </div>

          {/* Google Ad Banner */}
          <div className="mt-8 p-4 bg-gray-100 text-center rounded">
            <div className="text-sm text-gray-500">Advertisement</div>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-gray-300">
              <p className="text-gray-400">Google Ad Space</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CreateQuiz;
