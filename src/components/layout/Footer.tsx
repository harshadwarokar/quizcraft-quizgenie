
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen className="h-5 w-5 text-quiz-primary" />
            <span className="text-lg font-bold gradient-heading">QuizCraft</span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} QuizCraft. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
