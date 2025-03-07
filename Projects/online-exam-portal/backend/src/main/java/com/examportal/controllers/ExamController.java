package com.examportal.controllers;

import com.examportal.models.Exam;
import com.examportal.models.User;
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
@RequestMapping("/api/exams")
public class ExamController {
    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examRepository.findAll());
    }

    @GetMapping("/active")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Exam>> getActiveExams() {
        return ResponseEntity.ok(examRepository.findByActiveTrue());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Exam> getExam(@PathVariable Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Exam not found."));
        return ResponseEntity.ok(exam);
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> createExam(@Valid @RequestBody Exam exam) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        exam.setCreatedBy(user);
        Exam savedExam = examRepository.save(exam);
        return ResponseEntity.ok(savedExam);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateExam(@PathVariable Long id, @Valid @RequestBody Exam examDetails) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Exam not found."));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!exam.getCreatedBy().getUsername().equals(username) &&
            !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.badRequest()
                    .body(new com.examportal.dto.MessageResponse("Error: You can only update your own exams."));
        }

        exam.setTitle(examDetails.getTitle());
        exam.setDescription(examDetails.getDescription());
        exam.setDuration(examDetails.getDuration());
        exam.setMaxMarks(examDetails.getMaxMarks());
        exam.setPassingMarks(examDetails.getPassingMarks());
        exam.setStartTime(examDetails.getStartTime());
        exam.setEndTime(examDetails.getEndTime());
        exam.setActive(examDetails.isActive());
        exam.setSubject(examDetails.getSubject());
        exam.setInstructions(examDetails.getInstructions());

        examRepository.save(exam);
        return ResponseEntity.ok(exam);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteExam(@PathVariable Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Exam not found."));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!exam.getCreatedBy().getUsername().equals(username) &&
            !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.badRequest()
                    .body(new com.examportal.dto.MessageResponse("Error: You can only delete your own exams."));
        }

        examRepository.delete(exam);
        return ResponseEntity.ok(new com.examportal.dto.MessageResponse("Exam deleted successfully!"));
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<Exam>> getTeacherExams() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        return ResponseEntity.ok(examRepository.findByCreatedBy(user));
    }
} 