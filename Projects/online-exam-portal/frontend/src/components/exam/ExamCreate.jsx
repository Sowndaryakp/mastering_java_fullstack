import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import examService from '../../services/exam.service';

const ExamCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({
    content: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: 1,
    type: 'SINGLE_CHOICE',
  });

  const [examForm, setExamForm] = useState({
    title: '',
    subject: '',
    description: '',
    duration: 60,
    maxMarks: 0,
    passingMarks: 0,
    startTime: new Date(),
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    instructions: '',
    questions: [],
  });

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setExamForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addQuestion = () => {
    if (!currentQuestion.content || currentQuestion.options.some(opt => !opt)) {
      setError('Please fill in all question fields');
      return;
    }

    setExamForm((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestion],
      maxMarks: prev.maxMarks + currentQuestion.marks,
    }));

    setCurrentQuestion({
      content: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: 1,
      type: 'SINGLE_CHOICE',
    });
    setError('');
  };

  const removeQuestion = (index) => {
    setExamForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
      maxMarks: prev.maxMarks - prev.questions[index].marks,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (examForm.questions.length === 0) {
      setError('Please add at least one question');
      return;
    }

    try {
      await examService.createExam(examForm);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create exam');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create New Exam
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={examForm.title}
                  onChange={handleExamChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={examForm.subject}
                  onChange={handleExamChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={examForm.description}
                  onChange={handleExamChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={examForm.duration}
                  onChange={handleExamChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DateTimePicker
                  label="Start Time"
                  value={examForm.startTime}
                  onChange={(newValue) => {
                    if (newValue) {
                      setExamForm((prev) => ({ ...prev, startTime: newValue }));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DateTimePicker
                  label="End Time"
                  value={examForm.endTime}
                  onChange={(newValue) => {
                    if (newValue) {
                      setExamForm((prev) => ({ ...prev, endTime: newValue }));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instructions"
                  name="instructions"
                  value={examForm.instructions}
                  onChange={handleExamChange}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Add Questions
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Question"
                  name="content"
                  value={currentQuestion.content}
                  onChange={handleQuestionChange}
                  multiline
                  rows={2}
                />
              </Grid>
              {currentQuestion.options.map((option, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Correct Option"
                  name="correctOption"
                  value={currentQuestion.correctOption}
                  onChange={handleQuestionChange}
                >
                  {currentQuestion.options.map((_, index) => (
                    <MenuItem key={index} value={index}>
                      Option {index + 1}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Marks"
                  name="marks"
                  type="number"
                  value={currentQuestion.marks}
                  onChange={handleQuestionChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Question Type"
                  name="type"
                  value={currentQuestion.type}
                  onChange={handleQuestionChange}
                >
                  <MenuItem value="SINGLE_CHOICE">Single Choice</MenuItem>
                  <MenuItem value="MULTIPLE_CHOICE">Multiple Choice</MenuItem>
                  <MenuItem value="TRUE_FALSE">True/False</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={addQuestion}
                  fullWidth
                >
                  Add Question
                </Button>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Questions Added
            </Typography>

            <List>
              {examForm.questions.map((question, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={question.content}
                      secondary={`Marks: ${question.marks} | Type: ${question.type}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeQuestion(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={examForm.questions.length === 0}
              >
                Create Exam
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default ExamCreate; 