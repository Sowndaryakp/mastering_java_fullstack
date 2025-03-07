import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// Dashboard Components
import AdminDashboard from './components/dashboard/AdminDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';

// Exam Components
import ExamCreate from './components/exam/ExamCreate';
import ExamEdit from './components/exam/ExamEdit';
import ExamTake from './components/exam/ExamTake';
import ExamResults from './components/exam/ExamResults';
import StudentResults from './components/exam/StudentResults';

// Other Components
import Profile from './components/profile/Profile';
import PrivateRoute from './components/common/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <div className="app">
            <Header />
            <div className="main-container">
              <Sidebar />
              <main className="content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* Protected Routes */}
                  <Route path="/" element={<PrivateRoute />}>
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />

                    {/* Teacher Routes */}
                    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                    <Route path="/exam/create" element={<ExamCreate />} />
                    <Route path="/exam/edit/:id" element={<ExamEdit />} />
                    <Route path="/exam/results/:id" element={<ExamResults />} />

                    {/* Student Routes */}
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/exam/take/:id" element={<ExamTake />} />
                    <Route path="/student/results" element={<StudentResults />} />

                    {/* Common Routes */}
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Default Route */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App; 