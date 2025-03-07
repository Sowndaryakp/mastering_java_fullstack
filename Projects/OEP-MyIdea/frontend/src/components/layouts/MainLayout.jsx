import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Dashboard from '../dashboard/Dashboard';
import UsersManagement from '../admin/UsersManagement';
import CreateExam from '../teacher/CreateExam';
import AvailableExams from '../student/AvailableExams';

const MainLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const getNavItems = () => {
    switch (user?.role) {
      case 'ADMIN':
        return [
          { path: '/', label: 'Dashboard' },
          { path: '/users', label: 'Users Management' },
          { path: '/exams', label: 'All Exams' },
          { path: '/approvals', label: 'Pending Approvals' },
          { path: '/reports', label: 'Reports' }
        ];
      case 'TEACHER':
        return [
          { path: '/', label: 'Dashboard' },
          { path: '/exams/create', label: 'Create Exam' },
          { path: '/exams/my', label: 'My Exams' },
          { path: '/students', label: 'My Students' },
          { path: '/results', label: 'Results' }
        ];
      case 'STUDENT':
        return [
          { path: '/', label: 'Dashboard' },
          { path: '/exams/available', label: 'Available Exams' },
          { path: '/exams/completed', label: 'Completed Exams' },
          { path: '/results', label: 'My Results' },
          { path: '/profile', label: 'My Profile' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-semibold text-indigo-600">OEP</span>
              <span className="ml-2 text-sm text-gray-500">{user?.role}</span>
            </div>
            <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="sticky top-0 z-10 flex h-16 bg-white border-b">
            <div className="flex items-center justify-between flex-1 px-4">
              <div className="flex items-center md:hidden">
                <span className="text-xl font-semibold text-indigo-600">OEP</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">
                  {user?.name} ({user?.email})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {user?.role === 'ADMIN' && (
                <>
                  <Route path="/users" element={<UsersManagement />} />
                  <Route path="/exams" element={<div>All Exams</div>} />
                  <Route path="/approvals" element={<div>Pending Approvals</div>} />
                  <Route path="/reports" element={<div>Reports</div>} />
                </>
              )}
              {user?.role === 'TEACHER' && (
                <>
                  <Route path="/exams/create" element={<CreateExam />} />
                  <Route path="/exams/my" element={<div>My Exams</div>} />
                  <Route path="/students" element={<div>My Students</div>} />
                  <Route path="/results" element={<div>Results</div>} />
                </>
              )}
              {user?.role === 'STUDENT' && (
                <>
                  <Route path="/exams/available" element={<AvailableExams />} />
                  <Route path="/exams/completed" element={<div>Completed Exams</div>} />
                  <Route path="/results" element={<div>My Results</div>} />
                  <Route path="/profile" element={<div>My Profile</div>} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 