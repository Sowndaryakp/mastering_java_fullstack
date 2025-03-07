package com.oep.service.impl;

import com.oep.model.Notification;
import com.oep.model.User;
import com.oep.repository.NotificationRepository;
import com.oep.service.NotificationService;
import com.oep.service.EmailService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public NotificationServiceImpl(NotificationRepository notificationRepository,
                                 EmailService emailService) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    @Override
    public Notification sendNotification(User user, String title, String message) {
        return sendNotification(user, title, message, null, null);
    }

    @Override
    public Notification sendNotification(User user, String title, String message,
                                       Notification.NotificationType type, Long referenceId) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type != null ? type : Notification.NotificationType.REGISTRATION_APPROVED);
        notification.setReferenceId(referenceId);
        notification.setRead(false);

        Notification savedNotification = notificationRepository.save(notification);

        // Send email notification
        emailService.sendEmail(
            user.getEmail(),
            title,
            message
        );

        return savedNotification;
    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
} 