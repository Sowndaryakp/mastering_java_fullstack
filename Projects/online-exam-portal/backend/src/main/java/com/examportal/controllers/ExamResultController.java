package com.examportal.controllers;

import com.examportal.models.ExamResult;
import com.examportal.models.Exam;
import com.examportal.models.User;
import com.examportal.repositories.ExamResultRepository;
import com.examportal.repositories.ExamRepository;
import com.examportal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/results")
public class ExamResultController {
    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ExamResult>> getStudentResults() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        return ResponseEntity.ok(examResultRepository.findByUserOrderByEndTimeDesc(user));
    }

    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<List<ExamResult>> getExamResults(@PathVariable Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Error: Exam not found."));
        return ResponseEntity.ok(examResultRepository.findByExamOrderByPercentageScoreDesc(exam));
    }

    @PostMapping("/submit/{examId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> submitExam(@PathVariable Long examId, @Valid @RequestBody ExamResult result) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Error: Exam not found."));

        // Check if student has already taken this exam
        if (examResultRepository.findByUserAndExam(user, exam).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new com.examportal.dto.MessageResponse("Error: You have already taken this exam."));
        }

        result.setUser(user);
        result.setExam(exam);
        result.setPassed(result.getMarksObtained() >= exam.getPassingMarks());
        result.setPercentageScore((double) result.getMarksObtained() / exam.getMaxMarks() * 100);

        ExamResult savedResult = examResultRepository.save(result);
        return ResponseEntity.ok(savedResult);
    }

    @PutMapping("/{id}/feedback")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> provideFeedback(@PathVariable Long id, @RequestBody String feedback) {
        ExamResult result = examResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Result not found."));

        result.setFeedback(feedback);
        examResultRepository.save(result);
        return ResponseEntity.ok(new com.examportal.dto.MessageResponse("Feedback provided successfully!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<ExamResult> getResult(@PathVariable Long id) {
        ExamResult result = examResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Result not found."));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!result.getUser().getUsername().equals(username) &&
            !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER") || a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(result);
    }
} 