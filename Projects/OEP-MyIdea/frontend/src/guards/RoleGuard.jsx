import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RoleGuard = ({ roles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RoleGuard; 