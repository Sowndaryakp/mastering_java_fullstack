import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import ExamCreate from './components/exam/ExamCreate';
import ExamEdit from './components/exam/ExamEdit';
import ExamTake from './components/exam/ExamTake';
import ExamResults from './components/exam/ExamResults';
import StudentResults from './components/exam/StudentResults';
import Notifications from './components/Notifications';
import Unauthorized from './components/Unauthorized';

// Import other components as needed

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />

            {/* Teacher Routes */}
            <Route
              path="/exam/create"
              element={
                <PrivateRoute roles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <ExamCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/exam/:id/edit"
              element={
                <PrivateRoute roles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <ExamEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/exam/:id/results"
              element={
                <PrivateRoute roles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <ExamResults />
                </PrivateRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/exam/:id"
              element={
                <PrivateRoute roles={['ROLE_STUDENT']}>
                  <ExamTake />
                </PrivateRoute>
              }
            />
            <Route
              path="/results"
              element={
                <PrivateRoute roles={['ROLE_STUDENT']}>
                  <StudentResults />
                </PrivateRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
