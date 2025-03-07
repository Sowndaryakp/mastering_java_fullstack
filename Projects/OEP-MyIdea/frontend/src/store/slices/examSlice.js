import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exams: [],
  currentExam: null,
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    fetchExamsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExamsSuccess: (state, action) => {
      state.exams = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchExamsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
    },
    clearCurrentExam: (state) => {
      state.currentExam = null;
    },
  },
});

export const {
  fetchExamsStart,
  fetchExamsSuccess,
  fetchExamsFailure,
  setCurrentExam,
  clearCurrentExam,
} = examSlice.actions;

export default examSlice.reducer; 