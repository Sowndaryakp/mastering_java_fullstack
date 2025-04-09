package com.task.scheduler.junit.mockito.controller;

import com.task.scheduler.junit.mockito.model.Task;
import com.task.scheduler.junit.mockito.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    // ✅ GET: Get all sorted tasks
    @GetMapping("/sorted")
    public List<Task> getSortedTasks() {
        return taskService.getSortedTasks();
    }


    // Optional: Add methods to create, update, delete tasks

    // ✅ POST: Create a new task
    // URL: POST http://localhost:8080/api/tasks
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }


    // ✅ GET: Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // ✅ GET: Get task by ID
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable int id) {
        return taskService.getTaskById(id);
    }

    // ✅ PUT: Update an existing task
    // URL: PUT http://localhost:8080/api/tasks/{id}
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable int id, @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    // ✅ DELETE: Delete a task by ID
    // URL: DELETE http://localhost:8080/api/tasks/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        boolean deleted = taskService.deleteTask(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }
}
