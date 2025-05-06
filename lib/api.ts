import axios from "axios";

const API_URL = "http://localhost:8001"; // Replace with your FastAPI URL

export const getSubjects = () => axios.get(`${API_URL}/subjects`);
export const getNotes = (subject) => axios.get(`${API_URL}/notes/${subject}`);
export const uploadNote = (subject, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return axios.post(`${API_URL}/upload?subject=${subject}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const askQuestion = (question, subject) =>
  axios.post(`${API_URL}/ask`, { question, subject });
export const generatePracticeQuestions = (subject, num_questions) =>
  axios.post(`${API_URL}/practice`, { subject, num_questions });
export const evaluateAnswer = (question, user_answer, subject) =>
  axios.post(`${API_URL}/evaluate`, { question, user_answer, subject });
export const generateFlashcards = (subject, num_flashcards) =>
  axios.post(`${API_URL}/flashcards`, { subject, num_flashcards });
