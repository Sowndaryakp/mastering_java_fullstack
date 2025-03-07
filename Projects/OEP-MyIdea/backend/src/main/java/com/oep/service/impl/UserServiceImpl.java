package com.oep.service.impl;

import com.oep.model.User;
import com.oep.repository.UserRepository;
import com.oep.service.UserService;
import com.oep.service.NotificationService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;

    public UserServiceImpl(UserRepository userRepository, 
                         PasswordEncoder passwordEncoder,
                         NotificationService notificationService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationService = notificationService;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setApproved(false);
        return userRepository.save(user);
    }

    @Override
    public User approveUser(Long userId, Long approverId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        User approver = userRepository.findById(approverId)
                .orElseThrow(() -> new EntityNotFoundException("Approver not found"));

        validateApproval(user, approver);
        
        user.setApproved(true);
        user.setApprover(approver);
        User savedUser = userRepository.save(user);

        notificationService.sendNotification(
            savedUser,
            "Registration Approved",
            "Your registration has been approved by " + approver.getFullName()
        );

        return savedUser;
    }

    @Override
    public User rejectUser(Long userId, Long approverId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        User approver = userRepository.findById(approverId)
                .orElseThrow(() -> new EntityNotFoundException("Approver not found"));

        validateApproval(user, approver);
        
        notificationService.sendNotification(
            user,
            "Registration Rejected",
            "Your registration has been rejected by " + approver.getFullName()
        );

        userRepository.delete(user);
        return user;
    }

    @Override
    public List<User> getPendingApprovals(User.Role role) {
        return userRepository.findPendingApprovalsByRole(role);
    }

    @Override
    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    private void validateApproval(User user, User approver) {
        if (user.isApproved()) {
            throw new RuntimeException("User is already approved");
        }

        switch (user.getRole()) {
            case STUDENT:
                if (approver.getRole() != User.Role.TEACHER && 
                    approver.getRole() != User.Role.ADMIN) {
                    throw new RuntimeException("Only teachers can approve students");
                }
                break;
            case TEACHER:
                if (approver.getRole() != User.Role.HOD && 
                    approver.getRole() != User.Role.ADMIN) {
                    throw new RuntimeException("Only HODs can approve teachers");
                }
                break;
            case HOD:
                if (approver.getRole() != User.Role.PRINCIPAL && 
                    approver.getRole() != User.Role.ADMIN) {
                    throw new RuntimeException("Only principals can approve HODs");
                }
                break;
            case PRINCIPAL:
                if (approver.getRole() != User.Role.ADMIN) {
                    throw new RuntimeException("Only admins can approve principals");
                }
                break;
            default:
                throw new RuntimeException("Invalid role");
        }
    }
} 