package com.oep.service;

import com.oep.model.Exam;
import com.oep.model.ExamResult;
import com.oep.model.Question;
import com.oep.model.Answer;

import java.util.List;
import java.util.Map;

public interface ExamService {
    Exam createExam(Exam exam);
    Exam updateExam(Long id, Exam exam);
    void deleteExam(Long id);
    Exam getExamById(Long id);
    List<Exam> getAllExams();
    List<Exam> getActiveExams();
    List<Exam> getUpcomingExams();
    List<Exam> getCompletedExams();
    List<Exam> getTeacherExams(Long teacherId);
    
    Question addQuestion(Long examId, Question question);
    void removeQuestion(Long examId, Long questionId);
    List<Question> getExamQuestions(Long examId);
    
    ExamResult submitExam(Long examId, Long studentId, Map<Long, String> answers);
    ExamResult evaluateExam(Long examResultId, Map<Long, Integer> marks);
    List<ExamResult> getExamResults(Long examId);
    ExamResult getStudentExamResult(Long examId, Long studentId);
    List<ExamResult> getStudentResults(Long studentId);
    
    void publishExam(Long examId);
    void startExam(Long examId);
    void endExam(Long examId);
} 