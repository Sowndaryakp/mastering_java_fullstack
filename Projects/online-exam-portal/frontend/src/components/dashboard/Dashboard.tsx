import React from 'react';
import { Navigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import authService from '../../services/auth.service';

const Dashboard: React.FC = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.roles.includes('ROLE_ADMIN')) {
    return <AdminDashboard />;
  }

  if (user.roles.includes('ROLE_TEACHER')) {
    return <TeacherDashboard />;
  }

  if (user.roles.includes('ROLE_STUDENT')) {
    return <StudentDashboard />;
  }

  return <Navigate to="/unauthorized" />;
};

export default Dashboard; 