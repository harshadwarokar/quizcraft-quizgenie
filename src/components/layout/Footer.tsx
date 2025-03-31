
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      {/* Google Ad Banner */}
      <div className="content-container mb-8">
        <div className="text-sm text-gray-500 text-center mb-2">Advertisement</div>
        <div className="h-[90px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
          <p className="text-gray-400">Google Ad Space</p>
        </div>
      </div>
      
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen className="h-5 w-5 text-quiz-primary" />
            <span className="text-lg font-bold gradient-heading">AIExam</span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AIExam. All rights reserved.
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-3">About AIExam</h4>
            <p className="text-gray-500">AIExam helps you create quizzes from documents, text, and videos using artificial intelligence.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="/" className="hover:text-quiz-primary">Home</a></li>
              <li><a href="/create" className="hover:text-quiz-primary">Create Quiz</a></li>
              <li><a href="/about" className="hover:text-quiz-primary">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-quiz-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-quiz-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
