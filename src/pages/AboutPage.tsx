import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { BookOpen, FileText, Shield, Youtube, FileType, MessageSquare, Brain } from 'lucide-react';

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="content-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold gradient-heading mb-6">About AIExam</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              AIExam is an innovative educational tool that uses artificial intelligence to transform various content 
              formats into interactive quizzes. Our platform supports PDFs, Word documents, text input, and YouTube 
              videos as sources for generating comprehensive multiple-choice quizzes.
            </p>
            
            {/* Google Ad Banner */}
            <div className="my-8">
              <div className="text-sm text-gray-500 text-center mb-2">Advertisement</div>
              <div className="h-[90px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                <p className="text-gray-400">Google Ad Space</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-8">
              We believe in making education more interactive, accessible, and effective. Our mission is to provide 
              educators, students, and self-learners with tools that transform passive content consumption into 
              active learning experiences through personalized quizzes.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-quiz-accent/50 rounded-full mr-3">
                    <Brain className="h-5 w-5 text-quiz-primary" />
                  </div>
                  <h3 className="font-semibold">AI-Powered Quiz Generation</h3>
                </div>
                <p className="text-gray-600">
                  Our advanced AI analyzes your content and creates relevant quiz questions that test comprehension and retention.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-quiz-accent/50 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-quiz-primary" />
                  </div>
                  <h3 className="font-semibold">Multiple Content Sources</h3>
                </div>
                <p className="text-gray-600">
                  Generate quizzes from PDFs, Word documents, text input, or YouTube videos to suit your learning materials.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-quiz-accent/50 rounded-full mr-3">
                    <Shield className="h-5 w-5 text-quiz-primary" />
                  </div>
                  <h3 className="font-semibold">Secure & Private</h3>
                </div>
                <p className="text-gray-600">
                  Your content and quiz data are processed securely, with strict privacy controls to protect your information.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-quiz-accent/50 rounded-full mr-3">
                    <BookOpen className="h-5 w-5 text-quiz-primary" />
                  </div>
                  <h3 className="font-semibold">Customizable Quizzes</h3>
                </div>
                <p className="text-gray-600">
                  Configure the number of questions and time limits to create the perfect quiz for your needs.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Supported Content Types</h2>
            <div className="mb-8">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-quiz-primary mr-2 mt-1" />
                  <span><strong>PDF Documents</strong> - Up to 4MB, ideal for academic papers, books, and course materials.</span>
                </li>
                <li className="flex items-start">
                  <FileType className="h-5 w-5 text-quiz-primary mr-2 mt-1" />
                  <span><strong>Word Documents</strong> - Up to 4MB, perfect for essays, reports, and written assignments.</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-quiz-primary mr-2 mt-1" />
                  <span><strong>Text Input</strong> - Up to 25,000 characters, great for notes, articles, or custom content.</span>
                </li>
                <li className="flex items-start">
                  <Youtube className="h-5 w-5 text-quiz-primary mr-2 mt-1" />
                  <span><strong>YouTube Videos</strong> - Generate quizzes from educational videos and lectures.</span>
                </li>
              </ul>
            </div>
            
            {/* Google Ad Banner */}
            <div className="my-8">
              <div className="text-sm text-gray-500 text-center mb-2">Advertisement</div>
              <div className="h-[250px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                <p className="text-gray-400">Google Ad Space</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              We'd love to hear from you! If you have questions, feedback, or need assistance, please reach out to our team.
            </p>
            <p>
              Email: <a href="mailto:support@aiexam.com" className="text-quiz-primary hover:underline">support@aiexam.com</a>
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => window.location.href = '/create'} 
              className="quiz-button-primary inline-block px-8 py-3"
            >
              Create Your First Quiz
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
