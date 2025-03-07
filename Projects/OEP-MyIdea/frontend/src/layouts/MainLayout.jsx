import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BellIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: AcademicCapIcon, roles: ['ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER', 'STUDENT'] },
    { name: 'Users', href: '/users', icon: UserGroupIcon, roles: ['ADMIN'] },
    { name: 'Approvals', href: '/approvals', icon: UserGroupIcon, roles: ['ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER'] },
    { name: 'Exams', href: '/exams', icon: DocumentTextIcon, roles: ['TEACHER', 'STUDENT'] },
    { name: 'Results', href: '/results', icon: DocumentTextIcon, roles: ['TEACHER', 'STUDENT'] },
    { name: 'Profile', href: '/profile', icon: UserIcon, roles: ['ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER', 'STUDENT'] },
  ].filter(item => item.roles.includes(user?.role));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h2 className="text-2xl font-bold text-gray-900">OEP</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-4 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-2xl font-bold text-gray-900">OEP</h2>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-4 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1"></div>
            <div className="ml-4 flex items-center gap-4">
              <Link to="/notifications">
                <BellIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 