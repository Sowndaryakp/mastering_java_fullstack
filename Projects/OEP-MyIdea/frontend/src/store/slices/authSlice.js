import { createSlice } from '@reduxjs/toolkit';

// Hardcoded credentials for testing
export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: 'admin@oep.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'ADMIN'
  },
  TEACHER: {
    email: 'teacher@oep.com',
    password: 'teacher123',
    name: 'Teacher User',
    role: 'TEACHER'
  },
  STUDENT: {
    email: 'student@oep.com',
    password: 'student123',
    name: 'Student User',
    role: 'STUDENT'
  }
};

// Check if there's any stored auth state
const storedAuth = localStorage.getItem('auth');
const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = 'demo-token';
      state.loading = false;
      state.error = null;
      // Store auth state in localStorage
      localStorage.setItem('auth', JSON.stringify(state));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Clear stored auth state
      localStorage.removeItem('auth');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer; 