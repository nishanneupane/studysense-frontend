import axios from "axios";

const API_URL =
  "https://08bf-2400-1a00-b080-e82f-a523-d34a-5bd7-aedf.ngrok-free.app";

const axiosInstance = axios.create({
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getSubjects = () => axiosInstance.get(`${API_URL}/subjects`);

export const getNotes = (subject) =>
  axiosInstance.get(`${API_URL}/notes/${subject}`);

export const uploadNote = (subject, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return axiosInstance.post(`${API_URL}/upload?subject=${subject}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const askQuestion = (question, subject) =>
  axiosInstance.post(`${API_URL}/ask`, { question, subject });

export const generatePracticeQuestions = (subject, num_questions) =>
  axiosInstance.post(`${API_URL}/practice`, { subject, num_questions });

export const evaluateAnswer = (question, user_answer, subject) =>
  axiosInstance.post(`${API_URL}/evaluate`, { question, user_answer, subject });

export const getFlashcards = (subject) =>
  axiosInstance.get(`${API_URL}/flashcards/${subject}`).then((res) => res.data);

export const generateFlashcards = (subject, num_flashcards) =>
  axiosInstance.post(`${API_URL}/flashcards`, { subject, num_flashcards });

export const createSubject = (subject: string) =>
  axiosInstance.post(`${API_URL}/subjects`, { subject });

export const deleteSubject = (subject) => {
  return axiosInstance.delete(`${API_URL}/subjects/${subject}`); // Added return and fixed endpoint
};

export const deleteSingleFlashCard = (subject, flashcard) => {
  return axiosInstance.delete(
    `${API_URL}/flashcard/${subject}/${flashcard.id}`
  );
};

export const saveFlashcards = (flashcards, subject) => {
  return Promise.all(
    flashcards.map((card) =>
      axiosInstance.post(`${API_URL}/flashcards/save/`, {
        question: card.question,
        answer: card.answer,
        subject: subject,
      })
    )
  );
};

export const saveSingleFlashcard = (flashcard, subject) => {
  return axiosInstance.post(`${API_URL}/flashcards/save/`, {
    question: flashcard.question,
    answer: flashcard.answer,
    subject: subject,
  });
};
