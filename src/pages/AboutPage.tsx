
import PageLayout from "@/components/layout/PageLayout";

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="content-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold gradient-heading mb-8">About QuizCraft</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              QuizCraft is an advanced quiz generation platform that transforms your documents into 
              interactive quizzes. Our powerful AI technology analyzes your PDFs, Word documents, and 
              text files to create relevant questions that test understanding and retention.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that the best way to learn is through active recall and testing. QuizCraft 
              makes it easy to create customized quizzes from your learning materials, helping 
              students, educators, and professionals reinforce knowledge and identify areas that 
              need more attention.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Upload any PDF, Word document, or text file</li>
              <li>Customize the number of questions and time limits</li>
              <li>Support for both multiple-choice and text-based questions</li>
              <li>Real-time quiz taking with an interactive timer</li>
              <li>Comprehensive results with performance analytics</li>
              <li>Review correct answers and explanations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
            <p>
              QuizCraft uses natural language processing to understand the content in your documents. 
              Our algorithms identify key concepts, facts, and relationships to generate meaningful 
              questions that test comprehension rather than just memorization.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Use Cases</h2>
            <p>QuizCraft is perfect for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Students preparing for exams</li>
              <li>Teachers creating assessments</li>
              <li>Corporate trainers evaluating learning</li>
              <li>Self-learners testing their knowledge</li>
              <li>Anyone looking to improve retention of material</li>
            </ul>
            
            <div className="bg-quiz-accent/30 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-medium mb-3">Get Started Today</h3>
              <p className="mb-4">
                Ready to transform your documents into interactive quizzes? Create your first quiz 
                in minutes with no technical expertise required.
              </p>
              <a 
                href="/create" 
                className="quiz-button-primary inline-block"
              >
                Create Your First Quiz
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
