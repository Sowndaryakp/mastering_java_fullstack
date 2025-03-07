package com.oep.repository;

import com.oep.model.Exam;
import com.oep.model.ExamResult;
import com.oep.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByStudent(User student);
    List<ExamResult> findByExam(Exam exam);
    Optional<ExamResult> findByExamAndStudent(Exam exam, User student);
    List<ExamResult> findByExamAndStatus(Exam exam, ExamResult.Status status);
} 