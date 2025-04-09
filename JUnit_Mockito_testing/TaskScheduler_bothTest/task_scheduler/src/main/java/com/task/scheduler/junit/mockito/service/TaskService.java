package com.task.scheduler.junit.mockito.service;

import com.task.scheduler.junit.mockito.model.Task;
import com.task.scheduler.junit.mockito.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TaskService {
    @Autowired // injects repository
    private TaskRepository taskRepo;

    // Method to return sorted tasks based on logic
    public List<Task> getSortedTasks() {
        List<Task> tasks = taskRepo.findAll(); // get all tasks from DB

        // sort: Priority (desc) → Deadline (asc) → Timestamp (FIFO)
        tasks.sort(Comparator.comparing(Task::getPriority).reversed()
                .thenComparing(Task::getDeadline)
                .thenComparing(Task::getTimestamp));

        return tasks; // return sorted list
    }

    // Optional: Add methods to create, update, delete tasks

    // Save a new task to the database
    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }

    // ✅ Get all tasks
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    // ✅ Get task by ID
    public Task getTaskById(int id) {
        return taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));
    }

    // Update an existing task by ID
    public Task updateTask(int id, Task updatedTask) {
        return taskRepo.findById(id).map(task -> {
            task.setName(updatedTask.getName());
            task.setPriority(updatedTask.getPriority());
            task.setDeadline(updatedTask.getDeadline());
            task.setTimestamp(updatedTask.getTimestamp());
            return taskRepo.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));
    }

    // Delete task by ID
    public boolean deleteTask(int id) {
        if (taskRepo.existsById(id)) {
            taskRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
