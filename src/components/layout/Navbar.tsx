
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="content-container flex items-center justify-between">
        <div className="flex items-center space-x-2" onClick={() => navigateTo("/")} role="button">
          <BookOpen className="h-6 w-6 text-quiz-primary" />
          <span className="text-xl font-bold gradient-heading">QuizCraft</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigateTo("/")} 
            className="text-gray-700 hover:text-quiz-primary transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo("/create")} 
            className="text-gray-700 hover:text-quiz-primary transition-colors"
          >
            Create Quiz
          </button>
          <button 
            onClick={() => navigateTo("/about")} 
            className="text-gray-700 hover:text-quiz-primary transition-colors"
          >
            About
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4 p-4">
            <button 
              onClick={() => navigateTo("/")} 
              className="text-gray-700 hover:text-quiz-primary transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo("/create")} 
              className="text-gray-700 hover:text-quiz-primary transition-colors py-2"
            >
              Create Quiz
            </button>
            <button 
              onClick={() => navigateTo("/about")} 
              className="text-gray-700 hover:text-quiz-primary transition-colors py-2"
            >
              About
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
