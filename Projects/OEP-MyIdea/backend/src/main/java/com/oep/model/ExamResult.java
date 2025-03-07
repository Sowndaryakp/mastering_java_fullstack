package com.oep.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "exam_results")
public class ExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @OneToMany(mappedBy = "examResult", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<>();

    private Integer totalMarks;

    private Integer obtainedMarks;

    @Column(nullable = false)
    private Status status = Status.SUBMITTED;

    @ManyToOne
    @JoinColumn(name = "evaluated_by")
    private User evaluatedBy;

    private LocalDateTime submittedAt;

    private LocalDateTime evaluatedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum Status {
        SUBMITTED,
        UNDER_EVALUATION,
        EVALUATED
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
        answer.setExamResult(this);
    }

    public void removeAnswer(Answer answer) {
        answers.remove(answer);
        answer.setExamResult(null);
    }
} 