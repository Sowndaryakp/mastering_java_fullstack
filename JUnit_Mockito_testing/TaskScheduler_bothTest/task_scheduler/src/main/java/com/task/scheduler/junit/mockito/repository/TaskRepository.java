package com.task.scheduler.junit.mockito.repository;

import com.task.scheduler.junit.mockito.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    // No need to write any methods, JpaRepository gives all CRUD
}
