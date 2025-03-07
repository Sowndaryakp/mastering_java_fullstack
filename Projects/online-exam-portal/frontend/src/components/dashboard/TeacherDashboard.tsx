import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import examService from '../../services/exam.service';

interface Exam {
  id: number;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  active: boolean;
}

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const response = await examService.getTeacherExams();
      setExams(response.data);
    } catch (error) {
      console.error('Error loading exams:', error);
    }
  };

  const handleDeleteExam = async (examId: number) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await examService.deleteExam(examId);
        loadExams();
      } catch (error) {
        console.error('Error deleting exam:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">My Exams</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/exam/create')}
            >
              Create New Exam
            </Button>
          </Box>
          <Paper>
            <List>
              {exams.map((exam) => (
                <React.Fragment key={exam.id}>
                  <ListItem>
                    <ListItemText
                      primary={exam.title}
                      secondary={`Subject: ${exam.subject} | ${exam.active ? 'Active' : 'Inactive'}`}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="View Results">
                        <IconButton
                          edge="end"
                          onClick={() => navigate(`/exam/${exam.id}/results`)}
                          sx={{ mr: 1 }}
                        >
                          <AssessmentIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Exam">
                        <IconButton
                          edge="end"
                          onClick={() => navigate(`/exam/${exam.id}/edit`)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Exam">
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteExam(exam.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            {exams.length === 0 && (
              <Box p={3} textAlign="center">
                <Typography color="textSecondary">
                  No exams created yet. Click the button above to create your first exam.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard; 