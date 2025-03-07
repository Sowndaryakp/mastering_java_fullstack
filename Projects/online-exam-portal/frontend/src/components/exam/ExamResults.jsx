import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Alert,
  Chip,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import examService from '../../services/exam.service';

const ExamResults = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [examResponse, resultsResponse] = await Promise.all([
        examService.getExam(Number(id)),
        examService.getExamResults(Number(id)),
      ]);
      setExam(examResponse.data);
      setResults(resultsResponse.data);
      
      // Initialize feedback state
      const feedbackState = {};
      resultsResponse.data.forEach((result) => {
        feedbackState[result.id] = result.feedback || '';
      });
      setFeedback(feedbackState);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load exam results');
      setLoading(false);
    }
  };

  const handleFeedbackChange = (resultId, value) => {
    setFeedback((prev) => ({
      ...prev,
      [resultId]: value,
    }));
  };

  const handleFeedbackSubmit = async (resultId) => {
    try {
      await examService.provideFeedback(resultId, feedback[resultId]);
      setResults(results.map(result =>
        result.id === resultId
          ? { ...result, feedback: feedback[resultId] }
          : result
      ));
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback');
    }
  };

  const calculateStats = () => {
    if (results.length === 0) return null;

    const totalStudents = results.length;
    const passedStudents = results.filter(r => r.passed).length;
    const averageScore = results.reduce((acc, r) => acc + r.percentageScore, 0) / totalStudents;
    const highestScore = Math.max(...results.map(r => r.percentageScore));
    const lowestScore = Math.min(...results.map(r => r.percentageScore));

    return {
      totalStudents,
      passedStudents,
      passRate: (passedStudents / totalStudents) * 100,
      averageScore,
      highestScore,
      lowestScore,
    };
  };

  const getChartData = () => {
    const ranges = [0, 20, 40, 60, 80, 100];
    const distribution = ranges.slice(0, -1).map((min, index) => {
      const max = ranges[index + 1];
      const count = results.filter(r => 
        r.percentageScore >= min && r.percentageScore < max
      ).length;
      return {
        range: `${min}-${max}%`,
        count,
      };
    });
    return distribution;
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading results...</Typography>
      </Container>
    );
  }

  if (!exam) {
    return (
      <Container>
        <Alert severity="error">Failed to load exam details</Alert>
      </Container>
    );
  }

  const stats = calculateStats();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {exam.title} - Results
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {exam.subject}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {stats && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">{stats.totalStudents}</Typography>
                  <Typography color="textSecondary">Total Students</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">{stats.passRate.toFixed(1)}%</Typography>
                  <Typography color="textSecondary">Pass Rate</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">{stats.averageScore.toFixed(1)}%</Typography>
                  <Typography color="textSecondary">Average Score</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ height: 300, mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Score Distribution
              </Typography>
              <ResponsiveContainer>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{result.user.fullName}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {result.user.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {result.marksObtained} / {exam.maxMarks}
                  </TableCell>
                  <TableCell align="right">
                    {result.percentageScore.toFixed(1)}%
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={result.passed ? 'Passed' : 'Failed'}
                      color={result.passed ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(result.endTime).getTime() - new Date(result.startTime).getTime() > 0
                      ? `${Math.round((new Date(result.endTime).getTime() - new Date(result.startTime).getTime()) / 60000)} mins`
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        value={feedback[result.id]}
                        onChange={(e) => handleFeedbackChange(result.id, e.target.value)}
                        placeholder="Add feedback..."
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleFeedbackSubmit(result.id)}
                      >
                        Send
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ExamResults; 