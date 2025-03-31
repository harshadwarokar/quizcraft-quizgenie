
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with actual API URL in production

// Types for API interactions
export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer?: string;
  explanation?: string;
  userAnswer?: string;
}

export interface GeneratedQuiz {
  quiz_id: string;
  questions: QuizQuestion[];
  time_limit: number;
  total_questions: number;
}

export interface QuizResults {
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  detailed_results: {
    question: string;
    user_answer: string;
    correct_answer: string;
    is_correct: boolean;
    explanation: string;
  }[];
  quiz_id: string;
}

// Configure axios with defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    console.error('API Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// Extract questions from API response that could be in various formats
function extractQuestionsFromResponse(responseData: any): QuizQuestion[] {
  // Check if response is a string (containing JSON)
  if (typeof responseData === 'string') {
    try {
      // Look for JSON array in the response
      const jsonMatch = responseData.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        const parsedQuestions = JSON.parse(jsonMatch[0]);
        
        // Validate if it's an array of questions with the expected structure
        if (Array.isArray(parsedQuestions) && 
            parsedQuestions.length > 0 && 
            parsedQuestions[0].question && 
            parsedQuestions[0].options) {
          return parsedQuestions.map((q: any) => ({
            question: q.question,
            options: q.options,
            correct_answer: q.correct_answer,
            explanation: q.explanation
          }));
        }
      }
      throw new Error('Could not extract valid questions from response');
    } catch (err) {
      console.error('Error parsing JSON from response:', err);
      throw new Error('Failed to parse quiz data from API response');
    }
  } 
  // Check if response is already an array of questions
  else if (Array.isArray(responseData)) {
    if (responseData.length > 0 && responseData[0].question && responseData[0].options) {
      return responseData;
    }
    throw new Error('Received invalid question format from API');
  }
  // If response contains a questions field
  else if (responseData && responseData.questions && Array.isArray(responseData.questions)) {
    return responseData.questions;
  }
  
  throw new Error('Unexpected response format from API');
}

// Generate quiz from PDF file or text
export const generateQuizFromFile = async (
  file: File,
  numQuestions: number,
  timeLimit: number
): Promise<GeneratedQuiz> => {
  try {
    const formData = new FormData();
    formData.append('pdf_file', file);
    formData.append('num_questions', numQuestions.toString());
    formData.append('time_limit', timeLimit.toString());

    // Use axios directly here since we need to set different headers
    const response = await axios.post(`${API_URL}/generate-quiz`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the API response which might be in various formats
    try {
      // Extract questions from the response
      const questions = extractQuestionsFromResponse(response.data);
      
      // Create a structured quiz object
      const generatedQuiz: GeneratedQuiz = {
        quiz_id: new Date().getTime().toString(), // Generate a temporary quiz ID
        questions: questions,
        time_limit: timeLimit,
        total_questions: questions.length
      };
      
      return generatedQuiz;
    } catch (parseError: any) {
      console.error('Error processing API response:', parseError);
      throw new Error(`Failed to process quiz data: ${parseError.message}`);
    }
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

// Submit quiz answers
export const submitQuiz = async (
  quizId: string,
  answers: string[]
): Promise<QuizResults> => {
  try {
    const response = await api.post(`/submit-quiz/${quizId}`, { answers });
    return response as unknown as QuizResults;
  } catch (error: any) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};

// Health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    // Fix the type comparison issue by checking the response structure
    return response && 
           typeof response === 'object' && 
           'status' in response && 
           response.status === "healthy";
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
