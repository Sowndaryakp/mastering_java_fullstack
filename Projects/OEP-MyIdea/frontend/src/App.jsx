import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { websocket } from './services/websocket';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ExamList from './pages/exam/ExamList';
import ExamCreate from './pages/exam/ExamCreate';
import ExamTake from './pages/exam/ExamTake';
import ExamResults from './pages/exam/ExamResults';
import ExamSubmission from './pages/exam/ExamSubmission';
import Results from './pages/Results';
import UserManagement from './pages/admin/UserManagement';
import ApprovalRequests from './pages/approvals/ApprovalRequests';
import NotFound from './pages/NotFound';

// Guards
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      websocket.connect();
    } else {
      websocket.disconnect();
    }

    return () => {
      websocket.disconnect();
    };
  }, [user]);

  if (!user) {
    return (
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route element={<RoleGuard roles={['STUDENT']} />}>
              <Route path="/exams" element={<ExamList />} />
              <Route path="/exam/:id" element={<ExamTake />} />
              <Route path="/results" element={<Results />} />
            </Route>

            <Route element={<RoleGuard roles={['TEACHER']} />}>
              <Route path="/exam/create" element={<ExamCreate />} />
              <Route path="/exam/edit/:id" element={<ExamCreate />} />
            </Route>

            <Route element={<RoleGuard roles={['ADMIN']} />}>
              <Route path="/users" element={<UserManagement />} />
            </Route>

            <Route 
              element={
                <RoleGuard 
                  roles={['ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER']} 
                />
              }
            >
              <Route path="/approvals" element={<ApprovalRequests />} />
            </Route>

            <Route path="exam/:id/results" element={<ExamResults />} />
            <Route
              path="exam/:examId/submission/:submissionId"
              element={<ExamSubmission />}
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App; 