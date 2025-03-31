
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AdPopupProps {
  onClose: () => void;
  trigger: 'quiz-generation' | 'quiz-completion' | 'login';
}

const AdPopup = ({ onClose, trigger }: AdPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    
    // Close automatically after 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  
  let title = 'Special Offer!';
  let description = 'Check out this exclusive offer for AIExam users.';
  
  if (trigger === 'quiz-generation') {
    title = 'Generating Your Quiz...';
    description = 'While we create your perfect quiz, check out this offer from our sponsors.';
  } else if (trigger === 'quiz-completion') {
    title = 'Great Job on Your Quiz!';
    description = 'While you review your results, check out this message from our sponsors.';
  } else if (trigger === 'login') {
    title = 'Welcome to AIExam!';
    description = 'Thanks for logging in. Check out this special offer for new users.';
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0" 
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <div className="h-[400px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-400">Google Ad Space</p>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Advertisement will close automatically in a few seconds</p>
            <Button onClick={handleClose} variant="outline">Close Now</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdPopup;
