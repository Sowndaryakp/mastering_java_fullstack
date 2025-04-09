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

@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    private Task task;

    @BeforeEach
    void setUp() {
        task = new Task(1, "Test Task", 2,
                LocalDateTime.of(2025, 4, 10, 12, 0),
                LocalDateTime.now());
    }

    @Test
    void testGetAllTasks() throws Exception {
        List<Task> tasks = List.of(task);
        when(taskService.getAllTasks()).thenReturn(tasks);

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    @Test
    void testGetTaskById_Found() throws Exception {
        when(taskService.getTaskById(1)).thenReturn(task);

        mockMvc.perform(get("/api/tasks/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Task"));
    }

    @Test
    void testGetTaskById_NotFound() throws Exception {
        when(taskService.getTaskById(99)).thenReturn(null);

        mockMvc.perform(get("/tasks/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateTask() throws Exception {
        when(taskService.saveTask(any(Task.class))).thenReturn(task);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Task"));
    }



    @Test
    void testUpdateTask() throws Exception {
        when(taskService.updateTask(eq(1), any(Task.class))).thenReturn(task);

        mockMvc.perform(put("/api/tasks/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteTask_Found() throws Exception {
        when(taskService.deleteTask(1)).thenReturn(true);

        mockMvc.perform(delete("/api/tasks/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteTask_NotFound() throws Exception {
        when(taskService.deleteTask(99)).thenReturn(false);

        mockMvc.perform(delete("/api/tasks/99"))
                .andExpect(status().isNotFound());
    }
}
