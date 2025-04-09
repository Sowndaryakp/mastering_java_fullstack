package com.task.scheduler.junit.mockito.service;

import com.task.scheduler.junit.mockito.model.Task;
import com.task.scheduler.junit.mockito.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @InjectMocks
    private TaskService taskService; // Automatically injects mocks into taskService

    @Mock
    private TaskRepository taskRepository; // Creates a mock of TaskRepository

    private Task task; // Task object used for test cases

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this); // Initializes mocks before each test

        task = new Task(1, "Test Task", 2,
                LocalDateTime.of(2025, 4, 10, 12, 0), // Sets deadline
                LocalDateTime.now()); // Sets current timestamp
    }

    @Test
    void testGetAllTasks() {
        List<Task> list = List.of(task); // Mock list with one task
        when(taskRepository.findAll()).thenReturn(list); // Mock findAll() to return the list

        List<Task> result = taskService.getAllTasks(); // Call service method

        assertEquals(1, result.size()); // Assert that one task is returned
        verify(taskRepository, times(1)).findAll(); // Verify findAll() was called once
    }

    @Test
    void testGetTaskById_Positive() {
        when(taskRepository.findById(1)).thenReturn(Optional.of(task)); // Mock task found

        Task result = taskService.getTaskById(1); // Call service method

        assertNotNull(result); // Assert task is not null
        assertEquals("Test Task", result.getName()); // Assert task name matches
    }

    @Test
    void testGetTaskById_Negative() {
        when(taskRepository.findById(99)).thenReturn(Optional.empty()); // Mock task not found

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskService.getTaskById(99); // Expect exception for non-existing task
        });

        assertEquals("Task not found with ID: 99", exception.getMessage()); // Assert exception message
    }

    @Test
    void testSaveTask() {
        when(taskRepository.save(task)).thenReturn(task); // Mock save to return the same task

        Task saved = taskService.saveTask(task); // Call service method
        assertEquals(task.getName(), saved.getName()); // Assert saved task name matches
        verify(taskRepository).save(task); // Verify save() was called
    }

    @Test
    void testUpdateTask() {
        Task updated = new Task(1, "Updated Task", 1,
                task.getDeadline(), task.getTimestamp()); // Updated task object

        when(taskRepository.findById(1)).thenReturn(Optional.of(task)); // Mock existing task found
        when(taskRepository.save(updated)).thenReturn(updated); // Mock save() for updated task

        Task result = taskService.updateTask(1, updated); // Call update method
        assertEquals("Updated Task", result.getName()); // Assert name updated
    }

    @Test
    void testDeleteTask() {
        when(taskRepository.existsById(1)).thenReturn(true); // Mock task exists
        doNothing().when(taskRepository).deleteById(1); // Mock delete operation

        boolean result = taskService.deleteTask(1); // Call delete method
        assertTrue(result); // Assert deletion successful
        verify(taskRepository).deleteById(1); // Verify deleteById was called
    }

    @Test
    void testDeleteTask_NotFound() {
        when(taskRepository.existsById(99)).thenReturn(false); // Mock task does not exist
        boolean result = taskService.deleteTask(99); // Try deleting non-existing task
        assertFalse(result); // Assert deletion returns false
    }
}
