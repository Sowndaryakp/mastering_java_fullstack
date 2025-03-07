import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import userService from '../../services/user.service';
import examService from '../../services/exam.service';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

const AdminDashboard: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalExams: 0,
    activeExams: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [usersResponse, examsResponse] = await Promise.all([
        userService.getPendingUsers(),
        examService.getAllExams(),
      ]);
      setPendingUsers(usersResponse.data);
      const exams = examsResponse.data;
      setStats({
        totalExams: exams.length,
        activeExams: exams.filter((exam: any) => exam.active).length,
        totalUsers: pendingUsers.length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleApproveUser = async (userId: number) => {
    try {
      await userService.approveUser(userId);
      loadDashboardData();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Exams
            </Typography>
            <Typography variant="h3">{stats.totalExams}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Active Exams
            </Typography>
            <Typography variant="h3">{stats.activeExams}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Pending Approvals
            </Typography>
            <Typography variant="h3">{stats.totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pending User Approvals
            </Typography>
            <List>
              {pendingUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemText
                      primary={user.fullName}
                      secondary={`Username: ${user.username} | Email: ${user.email}`}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApproveUser(user.id)}
                      >
                        Approve
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            {pendingUsers.length === 0 && (
              <Box p={3} textAlign="center">
                <Typography color="textSecondary">
                  No pending user approvals
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 