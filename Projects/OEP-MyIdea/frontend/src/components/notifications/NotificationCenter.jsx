import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotificationCenter = () => {
  const { user } = useSelector((state) => state.auth);
  
  // Sample notifications - replace with API call
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'EXAM_SCHEDULED',
      title: 'New Exam Scheduled',
      message: 'Mathematics Final Exam scheduled for March 20, 2024',
      examId: '123',
      date: '2024-03-15T10:00:00',
      read: false
    },
    {
      id: 2,
      type: 'RESULT_PUBLISHED',
      title: 'Exam Results Published',
      message: 'Results for Physics Mid-term are now available',
      examId: '456',
      date: '2024-03-14T15:30:00',
      read: true
    }
  ]);

  const markAsRead = async (id) => {
    try {
      // TODO: Replace with actual API call
      setNotifications(notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case 'EXAM_SCHEDULED':
        return `/exams/${notification.examId}`;
      case 'RESULT_PUBLISHED':
        return `/results/${notification.examId}`;
      default:
        return '#';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'EXAM_SCHEDULED':
        return (
          <div className="flex-shrink-0">
            <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              📝
            </span>
          </div>
        );
      case 'RESULT_PUBLISHED':
        return (
          <div className="flex-shrink-0">
            <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              📊
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white shadow rounded-lg p-4 ${
              !notification.read ? 'border-l-4 border-indigo-500' : ''
            }`}
          >
            <div className="flex items-start">
              {getNotificationIcon(notification.type)}
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <Link
                    to={getNotificationLink(notification)}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-8 bg-white shadow rounded-lg">
            <p className="text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter; 