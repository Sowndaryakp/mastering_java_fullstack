import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import examService from '../../services/exam.service';

const ExamTake = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    loadExam();
  }, [id]);

  useEffect(() => {
    if (exam && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [exam, timeLeft]);

  const loadExam = async () => {
    try {
      const response = await examService.getExamQuestionsForStudent(Number(id));
      setExam(response.data);
      setTimeLeft(response.data.duration * 60); // Convert minutes to seconds
      setLoading(false);
    } catch (error) {
      console.error('Error loading exam:', error);
      setError('Failed to load exam');
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!exam) return 0;
    return (Object.keys(answers).length / exam.questions.length) * 100;
  };

  const handleSubmit = async () => {
    if (!exam) return;

    const result = {
      examId: exam.id,
      answers: Object.entries(answers).map(([questionId, optionIndex]) => ({
        questionId: parseInt(questionId),
        selectedOption: optionIndex,
      })),
      startTime: new Date(Date.now() - exam.duration * 60 * 1000),
      endTime: new Date(),
    };

    try {
      await examService.submitExam(exam.id, result);
      navigate('/results');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit exam');
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading exam...</Typography>
      </Container>
    );
  }

  if (!exam) {
    return (
      <Container>
        <Alert severity="error">Failed to load exam</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1, pb: 2 }}>
          <Typography variant="h4" gutterBottom>
            {exam.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {exam.subject}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              Time Left: {formatTime(timeLeft)}
            </Typography>
            <Typography>
              Progress: {Math.round(calculateProgress())}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={calculateProgress()} sx={{ mb: 2 }} />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        </Box>

        {exam.questions.map((question, index) => (
          <Box key={question.id} sx={{ mb: 4 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography variant="h6">
                  Question {index + 1} ({question.marks} marks)
                </Typography>
              </FormLabel>
              <Typography paragraph sx={{ mt: 1 }}>
                {question.content}
              </Typography>
              <RadioGroup
                value={answers[question.id] ?? ''}
                onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
              >
                {question.options.map((option, optIndex) => (
                  <FormControlLabel
                    key={optIndex}
                    value={optIndex}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
          >
            Exit Exam
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setConfirmSubmit(true)}
          >
            Submit Exam
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
      >
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit your exam? You cannot change your answers after submission.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography>
              Questions Answered: {Object.keys(answers).length} of {exam.questions.length}
            </Typography>
            <Typography>
              Time Remaining: {formatTime(timeLeft)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmSubmit(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExamTake; 