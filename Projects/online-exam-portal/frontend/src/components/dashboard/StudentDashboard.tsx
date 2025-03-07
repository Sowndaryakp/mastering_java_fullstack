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
  Divider,
  Box,
  Chip,
} from '@mui/material';
import examService from '../../services/exam.service';

interface Exam {
  id: number;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  duration: number;
  maxMarks: number;
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeExams, setActiveExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [examsResponse, resultsResponse] = await Promise.all([
        examService.getActiveExams(),
        examService.getStudentResults(),
      ]);
      setActiveExams(examsResponse.data);
      setResults(resultsResponse.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Exams
            </Typography>
            <List>
              {activeExams.map((exam) => (
                <React.Fragment key={exam.id}>
                  <ListItem>
                    <ListItemText
                      primary={exam.title}
                      secondary={`Subject: ${exam.subject} | Duration: ${exam.duration} minutes | Max Marks: ${exam.maxMarks}`}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/exam/${exam.id}`)}
                    >
                      Take Exam
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Results
            </Typography>
            <List>
              {results.slice(0, 5).map((result) => (
                <React.Fragment key={result.id}>
                  <ListItem>
                    <ListItemText
                      primary={result.exam.title}
                      secondary={`Score: ${result.percentageScore.toFixed(2)}%`}
                    />
                    <Chip
                      label={result.passed ? 'Passed' : 'Failed'}
                      color={result.passed ? 'success' : 'error'}
                      size="small"
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                color="primary"
                onClick={() => navigate('/results')}
              >
                View All Results
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard; 