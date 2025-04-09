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
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    private Task task;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        task = new Task(1, "Test Task", 2,
                LocalDateTime.of(2025, 4, 10, 12, 0),
                LocalDateTime.now());
    }

    @Test
    void testGetAllTasks() {
        List<Task> list = List.of(task);
        when(taskRepository.findAll()).thenReturn(list);

        List<Task> result = taskService.getAllTasks();

        assertEquals(1, result.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById_Positive() {
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1);
        assertNotNull(result);
        assertEquals("Test Task", result.getName());
    }

    @Test
    void testGetTaskById_Negative() {
        when(taskRepository.findById(99)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskService.getTaskById(99);
        });

        assertEquals("Task not found with ID: 99", exception.getMessage());
    }


    @Test
    void testSaveTask() {
        when(taskRepository.save(task)).thenReturn(task);

        Task saved = taskService.saveTask(task);
        assertEquals(task.getName(), saved.getName());
        verify(taskRepository).save(task);
    }

    @Test
    void testUpdateTask() {
        Task updated = new Task(1, "Updated Task", 1,
                task.getDeadline(), task.getTimestamp());

        when(taskRepository.findById(1)).thenReturn(Optional.of(task));
        when(taskRepository.save(updated)).thenReturn(updated);

        Task result = taskService.updateTask(1, updated);
        assertEquals("Updated Task", result.getName());
    }

    @Test
    void testDeleteTask() {
        when(taskRepository.existsById(1)).thenReturn(true);
        doNothing().when(taskRepository).deleteById(1);

        boolean result = taskService.deleteTask(1);
        assertTrue(result);
        verify(taskRepository).deleteById(1);
    }

    @Test
    void testDeleteTask_NotFound() {
        when(taskRepository.existsById(99)).thenReturn(false);
        boolean result = taskService.deleteTask(99);
        assertFalse(result);
    }
}
