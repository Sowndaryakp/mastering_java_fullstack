package com.examportal.repositories;

import com.examportal.models.Exam;
import com.examportal.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCreatedBy(User user);
    List<Exam> findByActiveTrue();
    List<Exam> findByActiveTrueAndStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Exam> findBySubjectContainingIgnoreCase(String subject);
} 