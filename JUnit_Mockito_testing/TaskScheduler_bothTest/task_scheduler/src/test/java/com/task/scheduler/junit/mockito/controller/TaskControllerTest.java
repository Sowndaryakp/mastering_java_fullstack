package com.task.scheduler.junit.mockito.controller;

import com.task.scheduler.junit.mockito.model.Task;
import com.task.scheduler.junit.mockito.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDateTime;
import java.util.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

@WebMvcTest(TaskController.class) // Tells Spring to only load the TaskController for testing
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc; // Used to simulate HTTP requests and assert responses

    @MockBean
    private TaskService taskService; // Mock the service layer

    @Autowired
    private ObjectMapper objectMapper; // Converts Java objects to/from JSON

    private Task task; // Task object used in tests

    @BeforeEach
    void setUp() {
        task = new Task(1, "Test Task", 2,
                LocalDateTime.of(2025, 4, 10, 12, 0), // Deadline set to future date
                LocalDateTime.now()); // Timestamp is current time
    }

    @Test
    void testGetAllTasks() throws Exception {
        List<Task> tasks = List.of(task); // Mock a list with one task
        when(taskService.getAllTasks()).thenReturn(tasks); // Mock service method

        mockMvc.perform(get("/api/tasks")) // Perform GET request to /api/tasks
                .andExpect(status().isOk()) // Expect 200 OK
                .andExpect(jsonPath("$.size()").value(1)); // Expect JSON array of size 1
    }

    @Test
    void testGetTaskById_Found() throws Exception {
        when(taskService.getTaskById(1)).thenReturn(task); // Mock task found

        mockMvc.perform(get("/api/tasks/1")) // Perform GET request for task ID 1
                .andExpect(status().isOk()) // Expect 200 OK
                .andExpect(jsonPath("$.name").value("Test Task")); // Assert name matches
    }

    @Test
    void testGetTaskById_NotFound() throws Exception {
        when(taskService.getTaskById(99)).thenReturn(null); // Mock task not found

        mockMvc.perform(get("/tasks/99")) // Perform GET request for non-existent ID
                .andExpect(status().isNotFound()); // Expect 404 Not Found
    }

    @Test
    void testCreateTask() throws Exception {
        when(taskService.saveTask(any(Task.class))).thenReturn(task); // Mock saving the task

        mockMvc.perform(post("/api/tasks") // Perform POST request to create task
                        .contentType(MediaType.APPLICATION_JSON) // Set content type to JSON
                        .content(objectMapper.writeValueAsString(task))) // Convert task to JSON
                .andExpect(status().isCreated()) // Expect 201 Created
                .andExpect(jsonPath("$.name").value("Test Task")); // Assert name in response
    }

    @Test
    void testUpdateTask() throws Exception {
        when(taskService.updateTask(eq(1), any(Task.class))).thenReturn(task); // Mock updating task

        mockMvc.perform(put("/api/tasks/1") // Perform PUT request for task ID 1
                        .contentType(MediaType.APPLICATION_JSON) // Set content type to JSON
                        .content(objectMapper.writeValueAsString(task))) // Convert task to JSON
                .andExpect(status().isOk()); // Expect 200 OK
    }

    @Test
    void testDeleteTask_Found() throws Exception {
        when(taskService.deleteTask(1)).thenReturn(true); // Mock successful deletion

        mockMvc.perform(delete("/api/tasks/1")) // Perform DELETE request for task ID 1
                .andExpect(status().isNoContent()); // Expect 204 No Content
    }

    @Test
    void testDeleteTask_NotFound() throws Exception {
        when(taskService.deleteTask(99)).thenReturn(false); // Mock task not found

        mockMvc.perform(delete("/api/tasks/99")) // Perform DELETE request for non-existent ID
                .andExpect(status().isNotFound()); // Expect 404 Not Found
    }
}
