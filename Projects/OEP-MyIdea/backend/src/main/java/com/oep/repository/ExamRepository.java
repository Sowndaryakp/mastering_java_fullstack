package com.oep.repository;

import com.oep.model.Exam;
import com.oep.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCreatedBy(User teacher);
    
    @Query("SELECT e FROM Exam e WHERE e.status = 'PUBLISHED' AND e.startTime <= CURRENT_TIMESTAMP AND e.endTime >= CURRENT_TIMESTAMP")
    List<Exam> findActiveExams();
    
    @Query("SELECT e FROM Exam e WHERE e.status = 'PUBLISHED' AND e.startTime > CURRENT_TIMESTAMP")
    List<Exam> findUpcomingExams();
    
    @Query("SELECT e FROM Exam e WHERE e.status = 'COMPLETED' AND e.endTime < CURRENT_TIMESTAMP")
    List<Exam> findCompletedExams();
} 