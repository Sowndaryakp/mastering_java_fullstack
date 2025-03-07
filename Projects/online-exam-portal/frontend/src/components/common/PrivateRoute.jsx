import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../../services/auth.service';

const PrivateRoute = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Check if user has access to the route based on role
  const path = window.location.pathname;
  const role = user.role;

  if (
    (path.startsWith('/admin') && role !== 'ADMIN') ||
    (path.startsWith('/teacher') && role !== 'TEACHER') ||
    (path.startsWith('/student') && role !== 'STUDENT')
  ) {
    // Redirect to appropriate dashboard based on role
    switch (role) {
      case 'ADMIN':
        return <Navigate to="/admin/dashboard" replace />;
      case 'TEACHER':
        return <Navigate to="/teacher/dashboard" replace />;
      case 'STUDENT':
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // Authorized, render component
  return <Outlet />;
};

export default PrivateRoute; 