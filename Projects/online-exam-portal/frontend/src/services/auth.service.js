import api from '../utils/api';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    delete api.defaults.headers.common['Authorization'];
  }
};

const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    setAuthToken(token);
    setUser(user);
    return response;
  },

  register: async (fullName, email, password, role) => {
    return await api.post('/auth/register', {
      fullName,
      email,
      password,
      role,
    });
  },

  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token, password) => {
    return await api.post('/auth/reset-password', { token, password });
  },

  logout: () => {
    setAuthToken(null);
    setUser(null);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },
};

// Initialize auth token from storage
const token = localStorage.getItem(AUTH_TOKEN_KEY);
if (token) {
  setAuthToken(token);
}

export default authService; 