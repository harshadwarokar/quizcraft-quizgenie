
import { ChangeEvent, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type. Please upload PDF, Word, or text files only.");
      return;
    }
    
    setFile(selectedFile);
    onFileSelected(selectedFile);
    toast.success("File uploaded successfully!");
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
  };

  return (
    <div className="w-full">
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
              <p className="text-sm text-gray-500 mt-1">PDF, Word, or text files only</p>
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
                <FileText className="h-5 w-5 text-quiz-primary" />
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
    </div>
  );
};

export default FileUpload;
