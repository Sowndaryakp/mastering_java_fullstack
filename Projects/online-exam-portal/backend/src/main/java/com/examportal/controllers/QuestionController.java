package com.examportal.controllers;

import com.examportal.models.Question;
import com.examportal.models.Exam;
import com.examportal.repositories.QuestionRepository;
import com.examportal.repositories.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<List<Question>> getExamQuestions(@PathVariable Long examId) {
        return ResponseEntity.ok(questionRepository.findByExamId(examId));
    }

    @PostMapping("/exam/{examId}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> addQuestion(@PathVariable Long examId, @Valid @RequestBody Question question) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Error: Exam not found."));
        
        question.setExam(exam);
        Question savedQuestion = questionRepository.save(question);
        return ResponseEntity.ok(savedQuestion);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @Valid @RequestBody Question questionDetails) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Question not found."));

        question.setContent(questionDetails.getContent());
        question.setOptions(questionDetails.getOptions());
        question.setCorrectOption(questionDetails.getCorrectOption());
        question.setMarks(questionDetails.getMarks());
        question.setExplanation(questionDetails.getExplanation());
        question.setType(questionDetails.getType());

        questionRepository.save(question);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Question not found."));

        questionRepository.delete(question);
        return ResponseEntity.ok(new com.examportal.dto.MessageResponse("Question deleted successfully!"));
    }

    @GetMapping("/exam/{examId}/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Question>> getExamQuestionsForStudent(@PathVariable Long examId) {
        List<Question> questions = questionRepository.findByExamId(examId);
        questions.forEach(question -> question.setCorrectOption(null)); // Hide correct answers
        return ResponseEntity.ok(questions);
    }
} 