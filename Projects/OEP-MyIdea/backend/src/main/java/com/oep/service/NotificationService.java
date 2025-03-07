package com.oep.service;

import com.oep.model.Notification;
import com.oep.model.User;
import java.util.List;

public interface NotificationService {
    Notification sendNotification(User user, String title, String message);
    Notification sendNotification(User user, String title, String message, Notification.NotificationType type, Long referenceId);
    List<Notification> getUserNotifications(Long userId);
    void markAsRead(Long notificationId);
    void deleteNotification(Long notificationId);
} 