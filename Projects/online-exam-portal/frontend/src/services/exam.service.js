import api from '../utils/api';

const examService = {
  // Teacher endpoints
  createExam: async (examData) => {
    return await api.post('/exams', examData);
  },

  updateExam: async (examId, examData) => {
    return await api.put(`/exams/${examId}`, examData);
  },

  deleteExam: async (examId) => {
    return await api.delete(`/exams/${examId}`);
  },

  getExam: async (examId) => {
    return await api.get(`/exams/${examId}`);
  },

  getTeacherExams: async () => {
    return await api.get('/exams/teacher');
  },

  getExamResults: async (examId) => {
    return await api.get(`/exams/${examId}/results`);
  },

  provideFeedback: async (resultId, feedback) => {
    return await api.post(`/exam-results/${resultId}/feedback`, { feedback });
  },

  // Student endpoints
  getAvailableExams: async () => {
    return await api.get('/exams/available');
  },

  getExamQuestionsForStudent: async (examId) => {
    return await api.get(`/exams/${examId}/questions`);
  },

  submitExam: async (examId, answers) => {
    return await api.post(`/exams/${examId}/submit`, answers);
  },

  getStudentResults: async () => {
    return await api.get('/exam-results/student');
  },

  getStudentExamResult: async (examId) => {
    return await api.get(`/exam-results/student/${examId}`);
  },
};

export default examService; 