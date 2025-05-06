import {
  MOCK_ANSWER,
  MOCK_EVALUATION,
  MOCK_FLASHCARDS,
  MOCK_NOTES,
  MOCK_PRACTICE_QUESTIONS,
  MOCK_SUBJECTS,
} from "./constants";

export const getSubjects = () => Promise.resolve({ data: MOCK_SUBJECTS });

export const getNotes = (subject) =>
  Promise.resolve({
    data: MOCK_NOTES.filter((note) => note.subject === subject),
  });

export const uploadNote = (subject, files) =>
  Promise.resolve({
    data: files.map((file) => ({
      subject,
      file_name: file.name,
      created_at: new Date().toISOString(),
    })),
  });

export const askQuestion = (question, subject) =>
  Promise.resolve({ data: { question, answer: MOCK_ANSWER } });

export const generatePracticeQuestions = (subject, num_questions) =>
  Promise.resolve({
    data: MOCK_PRACTICE_QUESTIONS.slice(0, num_questions),
  });

export const evaluateAnswer = (question, user_answer, subject) =>
  Promise.resolve({ data: MOCK_EVALUATION });

export const generateFlashcards = (subject, num_flashcards) =>
  Promise.resolve({
    data: MOCK_FLASHCARDS.slice(0, num_flashcards),
  });
