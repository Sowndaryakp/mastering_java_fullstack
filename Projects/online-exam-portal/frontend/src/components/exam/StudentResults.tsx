import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import examService from '../../services/exam.service';

interface ExamResult {
  id: number;
  exam: {
    title: string;
    subject: string;
    maxMarks: number;
    passingMarks: number;
  };
  marksObtained: number;
  totalQuestions: number;
  correctAnswers: number;
  percentageScore: number;
  passed: boolean;
  startTime: string;
  endTime: string;
  feedback?: string;
}

const StudentResults: React.FC = () => {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await examService.getStudentResults();
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading results:', error);
      setError('Failed to load your results');
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (results.length === 0) return null;

    const totalExams = results.length;
    const passedExams = results.filter(r => r.passed).length;
    const averageScore = results.reduce((acc, r) => acc + r.percentageScore, 0) / totalExams;
    const bestScore = Math.max(...results.map(r => r.percentageScore));

    return {
      totalExams,
      passedExams,
      passRate: (passedExams / totalExams) * 100,
      averageScore,
      bestScore,
    };
  };

  const getChartData = () => {
    return results.map((result, index) => ({
      name: result.exam.title,
      score: result.percentageScore,
      passing: result.exam.passingMarks / result.exam.maxMarks * 100,
    })).reverse(); // Show most recent first
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading your results...</Typography>
      </Container>
    );
  }

  const stats = calculateStats();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Results
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {stats && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">{stats.totalExams}</Typography>
                <Typography color="textSecondary">Total Exams</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">{stats.passedExams}</Typography>
                <Typography color="textSecondary">Exams Passed</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">{stats.averageScore.toFixed(1)}%</Typography>
                <Typography color="textSecondary">Average Score</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">{stats.bestScore.toFixed(1)}%</Typography>
                <Typography color="textSecondary">Best Score</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Performance Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1976d2"
                    name="Your Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="passing"
                    stroke="#dc004e"
                    strokeDasharray="5 5"
                    name="Passing Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </>
      )}

      <Grid container spacing={3}>
        {results.map((result) => (
          <Grid item xs={12} key={result.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">
                      {result.exam.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {result.exam.subject}
                    </Typography>
                  </Box>
                  <Chip
                    label={result.passed ? 'Passed' : 'Failed'}
                    color={result.passed ? 'success' : 'error'}
                  />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      Score
                    </Typography>
                    <Typography variant="h6">
                      {result.marksObtained} / {result.exam.maxMarks}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      Correct Answers
                    </Typography>
                    <Typography variant="h6">
                      {result.correctAnswers} / {result.totalQuestions}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      Percentage
                    </Typography>
                    <Typography variant="h6">
                      {result.percentageScore.toFixed(1)}%
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={result.percentageScore}
                    color={result.passed ? 'success' : 'error'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                {result.feedback && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Feedback from Teacher
                    </Typography>
                    <Typography variant="body2">
                      {result.feedback}
                    </Typography>
                  </>
                )}

                <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                  Taken on {new Date(result.startTime).toLocaleDateString()} at{' '}
                  {new Date(result.startTime).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {results.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary">
                You haven't taken any exams yet.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default StudentResults; 