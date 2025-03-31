
import { ChangeEvent, useState } from "react";
import { FileText, Upload, X, Youtube, FileType } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FileUploadProps {
  onFileSelected: (file: File | null, text: string | null, videoUrl: string | null) => void;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const MAX_TEXT_CHARS = 25000;

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("file");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'text/plain'
    ];
    
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type. Please upload PDF, Word, or text files only.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Maximum size is 4MB.");
      return;
    }
    
    setFile(selectedFile);
    onFileSelected(selectedFile, null, null);
    toast.success("File uploaded successfully!");
  };

  const handleTextSubmit = () => {
    if (text.length === 0) {
      toast.error("Please enter some text.");
      return;
    }

    if (text.length > MAX_TEXT_CHARS) {
      toast.error(`Text is too long. Maximum ${MAX_TEXT_CHARS} characters allowed.`);
      return;
    }

    onFileSelected(null, text, null);
    toast.success("Text submitted successfully!");
  };

  const handleVideoSubmit = () => {
    // YouTube URL validation regex
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    
    if (!ytRegex.test(videoUrl)) {
      toast.error("Please enter a valid YouTube URL.");
      return;
    }

    onFileSelected(null, null, videoUrl);
    toast.success("YouTube URL submitted successfully!");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelected(null, null, null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset previously selected input
    setFile(null);
    setText("");
    setVideoUrl("");
    onFileSelected(null, null, null);
  };

  return (
    <Tabs defaultValue="file" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="file">File Upload</TabsTrigger>
        <TabsTrigger value="text">Text Input</TabsTrigger>
        <TabsTrigger value="video">YouTube URL</TabsTrigger>
      </TabsList>
      
      <TabsContent value="file" className="w-full">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive 
              ? "border-quiz-primary bg-quiz-accent/30" 
              : "border-gray-300 hover:border-quiz-primary hover:bg-quiz-accent/10"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {!file ? (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-quiz-accent rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-quiz-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">Drag and drop your file here</p>
                <p className="text-sm text-gray-500 mt-1">PDF, Word, or text files only (Max 4MB)</p>
              </div>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label
                  htmlFor="file-upload"
                  className="quiz-button-primary inline-block cursor-pointer"
                >
                  Browse Files
                </label>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white p-4 rounded-md border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-quiz-accent/50 p-2 rounded">
                  {file.type.includes('pdf') ? (
                    <FileText className="h-5 w-5 text-quiz-primary" />
                  ) : (
                    <FileType className="h-5 w-5 text-quiz-primary" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Remove file"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="text" className="w-full">
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-5 w-5 text-quiz-primary" />
            <Label htmlFor="text-input" className="text-lg font-medium">Enter your text</Label>
          </div>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here (maximum 25,000 characters)"
            className="w-full min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-quiz-primary"
            maxLength={MAX_TEXT_CHARS}
          />
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">{text.length} / {MAX_TEXT_CHARS} characters</p>
            <button
              onClick={handleTextSubmit}
              className="quiz-button-primary px-4 py-2"
            >
              Use This Text
            </button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="video" className="w-full">
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Youtube className="h-5 w-5 text-quiz-primary" />
            <Label htmlFor="video-input" className="text-lg font-medium">Enter YouTube URL</Label>
          </div>
          <Input
            id="video-input"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=example"
            className="w-full p-3"
          />
          <div className="flex justify-end">
            <button
              onClick={handleVideoSubmit}
              className="quiz-button-primary px-4 py-2"
            >
              Use This Video
            </button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FileUpload;
