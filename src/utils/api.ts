
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with actual API URL in production

// Types for API interactions
export interface QuizQuestion {
  question: string;
  options: string[];
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

    if (response.data.success) {
      return response.data.data as GeneratedQuiz;
    } else {
      throw new Error(response.data.detail || 'Failed to generate quiz');
    }
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    throw new Error(error.response?.data?.detail || error.message || 'Failed to generate quiz');
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
    return response.status === 'healthy';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
