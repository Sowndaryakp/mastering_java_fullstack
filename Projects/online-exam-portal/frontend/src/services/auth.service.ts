import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(API_URL + 'signin', { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(username: string, email: string, password: string, fullName: string, phoneNumber: string) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
      fullName,
      phoneNumber,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: string) {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) ?? false;
  }
}

export default new AuthService(); 