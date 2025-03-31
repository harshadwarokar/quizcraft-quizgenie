
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogIn, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, avatar: string} | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogin = () => {
    // In a real app, this would integrate with the Google OAuth API
    // For now, we'll mock the login
    setIsLoggedIn(true);
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=8B5CF6&color=fff"
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="content-container flex items-center justify-between">
        <div className="flex items-center space-x-2" onClick={() => navigateTo("/")} role="button">
          <BookOpen className="h-6 w-6 text-quiz-primary" />
          <span className="text-xl font-bold gradient-heading">AIExam</span>
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
          
          {isLoggedIn ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-2">
                  <img 
                    src={user?.avatar}
                    alt="User avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="flex flex-col space-y-2">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Button variant="ghost" className="w-full justify-start text-sm" onClick={handleLogout}>
                    Sign out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button 
              onClick={handleLogin} 
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign in with Google</span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {isLoggedIn ? (
            <button className="mr-2">
              <img 
                src={user?.avatar}
                alt="User avatar" 
                className="w-8 h-8 rounded-full"
              />
            </button>
          ) : (
            <Button 
              onClick={handleLogin} 
              variant="outline" 
              size="sm" 
              className="mr-2"
            >
              <LogIn className="h-4 w-4" />
            </Button>
          )}
          <button 
            className="focus:outline-none" 
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
            {isLoggedIn && (
              <button 
                onClick={handleLogout} 
                className="text-gray-700 hover:text-quiz-primary transition-colors py-2"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
