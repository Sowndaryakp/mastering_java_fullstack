import axios from 'axios';
import authService from './auth.service';

const API_URL = 'http://localhost:8080/api/';

// Add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class ExamService {
  async getAllExams() {
    return axios.get(API_URL + 'exams');
  }

  async getActiveExams() {
    return axios.get(API_URL + 'exams/active');
  }

  async getExam(id: number) {
    return axios.get(API_URL + `exams/${id}`);
  }

  async createExam(examData: any) {
    return axios.post(API_URL + 'exams', examData);
  }

  async updateExam(id: number, examData: any) {
    return axios.put(API_URL + `exams/${id}`, examData);
  }

  async deleteExam(id: number) {
    return axios.delete(API_URL + `exams/${id}`);
  }

  async getTeacherExams() {
    return axios.get(API_URL + 'exams/teacher');
  }

  async getExamQuestions(examId: number) {
    return axios.get(API_URL + `questions/exam/${examId}`);
  }

  async getExamQuestionsForStudent(examId: number) {
    return axios.get(API_URL + `questions/exam/${examId}/student`);
  }

  async addQuestion(examId: number, questionData: any) {
    return axios.post(API_URL + `questions/exam/${examId}`, questionData);
  }

  async updateQuestion(questionId: number, questionData: any) {
    return axios.put(API_URL + `questions/${questionId}`, questionData);
  }

  async deleteQuestion(questionId: number) {
    return axios.delete(API_URL + `questions/${questionId}`);
  }

  async submitExam(examId: number, resultData: any) {
    return axios.post(API_URL + `results/submit/${examId}`, resultData);
  }

  async getStudentResults() {
    return axios.get(API_URL + 'results/student');
  }

  async getExamResults(examId: number) {
    return axios.get(API_URL + `results/exam/${examId}`);
  }

  async provideFeedback(resultId: number, feedback: string) {
    return axios.put(API_URL + `results/${resultId}/feedback`, feedback);
  }
}

export default new ExamService(); 