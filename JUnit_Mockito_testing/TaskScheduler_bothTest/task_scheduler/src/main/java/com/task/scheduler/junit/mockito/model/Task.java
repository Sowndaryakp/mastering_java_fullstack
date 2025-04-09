package com.task.scheduler.junit.mockito.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity // tells Spring it's a table in DB
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment ID
    private int id;

    private String name;
    private int priority;
    private LocalDateTime deadline;
    private LocalDateTime timestamp;

    // Getters and Setters
    // Used by Spring to read/write values

    // Constructor and toString() (optional)
}
