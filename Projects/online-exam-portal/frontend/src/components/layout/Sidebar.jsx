import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  School,
  Assignment,
  Person,
  Assessment,
  Add,
} from '@mui/icons-material';
import authService from '../../services/auth.service';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const adminMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Users', icon: <Person />, path: '/admin/users' },
  ];

  const teacherMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/teacher/dashboard' },
    { text: 'Create Exam', icon: <Add />, path: '/exam/create' },
    { text: 'My Exams', icon: <Assignment />, path: '/teacher/exams' },
  ];

  const studentMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/student/dashboard' },
    { text: 'My Exams', icon: <School />, path: '/student/exams' },
    { text: 'Results', icon: <Assessment />, path: '/student/results' },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'ADMIN':
        return adminMenuItems;
      case 'TEACHER':
        return teacherMenuItems;
      case 'STUDENT':
        return studentMenuItems;
      default:
        return [];
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px', // Height of AppBar
        },
      }}
      open={open}
      onClose={onClose}
    >
      <List>
        {getMenuItems().map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <ListItem
          button
          onClick={() => handleNavigate('/profile')}
          selected={location.pathname === '/profile'}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; 