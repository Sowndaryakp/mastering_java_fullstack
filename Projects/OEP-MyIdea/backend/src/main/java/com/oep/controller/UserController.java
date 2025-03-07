package com.oep.controller;

import com.oep.model.User;
import com.oep.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/pending/{role}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER')")
    public ResponseEntity<List<User>> getPendingApprovals(@PathVariable User.Role role) {
        List<User> pendingUsers = userService.getPendingApprovals(role);
        return ResponseEntity.ok(pendingUsers);
    }

    @PostMapping("/{userId}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER')")
    public ResponseEntity<User> approveUser(@PathVariable Long userId) {
        User currentUser = userService.getCurrentUser();
        User approvedUser = userService.approveUser(userId, currentUser.getId());
        return ResponseEntity.ok(approvedUser);
    }

    @PostMapping("/{userId}/reject")
    @PreAuthorize("hasAnyRole('ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER')")
    public ResponseEntity<User> rejectUser(@PathVariable Long userId) {
        User currentUser = userService.getCurrentUser();
        User rejectedUser = userService.rejectUser(userId, currentUser.getId());
        return ResponseEntity.ok(rejectedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
} 