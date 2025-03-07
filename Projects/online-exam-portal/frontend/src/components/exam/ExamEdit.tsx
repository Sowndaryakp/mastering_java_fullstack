import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import examService from '../../services/exam.service';

interface Question {
  id?: number;
  content: string;
  options: string[];
  correctOption: number;
  marks: number;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  explanation?: string;
}

interface ExamForm {
  title: string;
  subject: string;
  description: string;
  duration: number;
  maxMarks: number;
  passingMarks: number;
  startTime: Date;
  endTime: Date;
  instructions: string;
  active: boolean;
  questions: Question[];
}

const ExamEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    content: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: 1,
    type: 'SINGLE_CHOICE',
  });

  const [examForm, setExamForm] = useState<ExamForm>({
    title: '',
    subject: '',
    description: '',
    duration: 60,
    maxMarks: 0,
    passingMarks: 0,
    startTime: new Date(),
    endTime: new Date(),
    instructions: '',
    active: false,
    questions: [],
  });

  useEffect(() => {
    loadExam();
  }, [id]);

  const loadExam = async () => {
    try {
      const response = await examService.getExam(Number(id));
      const exam = response.data;
      setExamForm({
        ...exam,
        startTime: new Date(exam.startTime),
        endTime: new Date(exam.endTime),
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading exam:', error);
      setError('Failed to load exam');
      setLoading(false);
    }
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExamForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
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

  const removeQuestion = (index: number) => {
    setExamForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
      maxMarks: prev.maxMarks - prev.questions[index].marks,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (examForm.questions.length === 0) {
      setError('Please add at least one question');
      return;
    }

    try {
      await examService.updateExam(Number(id), examForm);
      setSuccess('Exam updated successfully');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update exam');
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edit Exam
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={examForm.active}
                      onChange={(e) => setExamForm((prev) => ({
                        ...prev,
                        active: e.target.checked,
                      }))}
                      name="active"
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Add New Question
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
              Existing Questions
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
                Update Exam
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default ExamEdit; 