import axios from 'axios';
import authService from './auth.service';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {
  async getProfile() {
    return axios.get(API_URL + 'profile');
  }

  async updateProfile(profileData: any) {
    return axios.put(API_URL + 'profile', profileData);
  }

  async getPendingUsers() {
    return axios.get(API_URL + 'pending');
  }

  async approveUser(userId: number) {
    return axios.put(API_URL + `approve/${userId}`);
  }
}

export default new UserService(); 