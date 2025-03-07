package com.oep.service;

import com.oep.model.User;
import java.util.List;

public interface UserService {
    User registerUser(User user);
    User approveUser(Long userId, Long approverId);
    User rejectUser(Long userId, Long approverId);
    List<User> getPendingApprovals(User.Role role);
    User getCurrentUser();
    User updateUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUser(Long id);
    boolean isEmailTaken(String email);
} 