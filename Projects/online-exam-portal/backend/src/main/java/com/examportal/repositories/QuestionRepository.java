package com.examportal.repositories;

import com.examportal.models.Question;
import com.examportal.models.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExam(Exam exam);
    List<Question> findByExamId(Long examId);
    void deleteByExamId(Long examId);
    Long countByExamId(Long examId);
} 