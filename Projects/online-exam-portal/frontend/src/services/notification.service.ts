import axios from 'axios';
import authService from './auth.service';

const API_URL = 'http://localhost:8080/api/notifications/';

class NotificationService {
  async getUserNotifications() {
    return axios.get(API_URL);
  }

  async getUnreadNotifications() {
    return axios.get(API_URL + 'unread');
  }

  async createNotification(userId: number, notificationData: any) {
    return axios.post(API_URL + `?userId=${userId}`, notificationData);
  }

  async markAsRead(notificationId: number) {
    return axios.put(API_URL + `${notificationId}/read`);
  }

  async deleteNotification(notificationId: number) {
    return axios.delete(API_URL + notificationId);
  }
}

export default new NotificationService(); 