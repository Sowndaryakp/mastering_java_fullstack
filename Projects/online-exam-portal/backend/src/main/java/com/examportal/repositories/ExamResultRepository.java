package com.examportal.repositories;

import com.examportal.models.ExamResult;
import com.examportal.models.User;
import com.examportal.models.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByUser(User user);
    List<ExamResult> findByExam(Exam exam);
    Optional<ExamResult> findByUserAndExam(User user, Exam exam);
    List<ExamResult> findByUserOrderByEndTimeDesc(User user);
    List<ExamResult> findByExamOrderByPercentageScoreDesc(Exam exam);
} 