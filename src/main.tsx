
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set up environment variables for the API
// Note: In a real application, these would be set through proper environment configuration
if (!window.GROQ_API_KEY) {
  window.GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
}

createRoot(document.getElementById("root")!).render(<App />);
