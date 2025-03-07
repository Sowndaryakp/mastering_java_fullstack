package com.examportal.controllers;

import com.examportal.models.Notification;
import com.examportal.models.User;
import com.examportal.repositories.NotificationRepository;
import com.examportal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<List<Notification>> getUserNotifications() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        return ResponseEntity.ok(notificationRepository.findByUserOrderByCreatedAtDesc(user));
    }

    @GetMapping("/unread")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        return ResponseEntity.ok(notificationRepository.findByUserAndReadFalseOrderByCreatedAtDesc(user));
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> createNotification(@Valid @RequestBody Notification notification, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        notification.setUser(user);
        Notification savedNotification = notificationRepository.save(notification);
        return ResponseEntity.ok(savedNotification);
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Notification not found."));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!notification.getUser().getUsername().equals(username)) {
            return ResponseEntity.badRequest()
                    .body(new com.examportal.dto.MessageResponse("Error: You can only mark your own notifications as read."));
        }

        notification.setRead(true);
        notificationRepository.save(notification);
        return ResponseEntity.ok(new com.examportal.dto.MessageResponse("Notification marked as read."));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Notification not found."));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!notification.getUser().getUsername().equals(username) &&
            !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.badRequest()
                    .body(new com.examportal.dto.MessageResponse("Error: You can only delete your own notifications."));
        }

        notificationRepository.delete(notification);
        return ResponseEntity.ok(new com.examportal.dto.MessageResponse("Notification deleted successfully!"));
    }
} 