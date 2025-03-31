
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogIn, UserCircle, Settings, LogOut, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserProfile from "@/components/UserProfile";
import AdPopup from "@/components/AdPopup";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, avatar: string} | null>(null);
  const [showLoginAd, setShowLoginAd] = useState(false);
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
    
    // Show ad after login
    setShowLoginAd(true);
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
            <Sheet>
              <SheetTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-quiz-primary text-white">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Your Profile</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {user && <UserProfile user={user} />}
                  
                  <div className="mt-6 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start"
                      onClick={() => navigateTo("/profile")}
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start"
                      onClick={() => navigateTo("/results")}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      My Results
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start"
                      onClick={() => navigateTo("/settings")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start text-red-500 hover:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
            <Sheet>
              <SheetTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer mr-2">
                  <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-quiz-primary text-white">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Profile</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {user && <UserProfile user={user} />}
                  
                  <div className="mt-6 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start"
                      onClick={() => {
                        navigateTo("/profile");
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start"
                      onClick={() => {
                        navigateTo("/results");
                        setIsMenuOpen(false);
                      }}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      My Results
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start"
                      onClick={() => {
                        navigateTo("/settings");
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-start text-red-500 hover:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
      
      {/* Ad popup after login */}
      {showLoginAd && (
        <AdPopup 
          trigger="login" 
          onClose={() => setShowLoginAd(false)} 
        />
      )}
    </nav>
  );
};

export default Navbar;
