import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </div>
  );
}

export default App; 