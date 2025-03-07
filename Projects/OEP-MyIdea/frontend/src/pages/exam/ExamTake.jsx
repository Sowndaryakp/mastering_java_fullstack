import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { exams } from '../../services/api';

const ExamTake = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetchExam();
  }, [id]);

  useEffect(() => {
    if (!exam) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(exam.endTime).getTime();
      const timeRemaining = Math.max(0, endTime - now);

      if (timeRemaining === 0) {
        clearInterval(timer);
        handleSubmit();
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [exam]);

  const fetchExam = async () => {
    try {
      const response = await exams.getById(id);
      setExam(response.data);
      
      // Initialize answers
      const initialAnswers = {};
      response.data.questions.forEach((question) => {
        initialAnswers[question.id] = question.type === 'MULTIPLE_CHOICE' ? [] : '';
      });
      setAnswers(initialAnswers);
    } catch (error) {
      toast.error('Failed to fetch exam');
      navigate('/exams');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value, type) => {
    if (type === 'MULTIPLE_CHOICE') {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: prev[questionId].includes(value)
          ? prev[questionId].filter((v) => v !== value)
          : [...prev[questionId], value],
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm('Are you sure you want to submit the exam?')) {
      return;
    }

    setSubmitting(true);
    try {
      await exams.submit(id, answers);
      toast.success('Exam submitted successfully');
      navigate('/exams');
    } catch (error) {
      toast.error('Failed to submit exam');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-gray-500">Loading exam...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 -mt-4 bg-white px-4 py-4 shadow sm:mx-0 sm:rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            {exam.title}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-lg font-medium text-red-600">
              Time Left: {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? 'Submitting...' : 'Submit Exam'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {exam.questions.map((question, index) => (
          <div
            key={question.id}
            className="overflow-hidden bg-white shadow sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Question {index + 1}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {question.marks} marks
                  </span>
                </div>

                <p className="text-gray-900">{question.questionText}</p>

                {question.type === 'DESCRIPTIVE' ? (
                  <textarea
                    rows={4}
                    className="input-field"
                    value={answers[question.id]}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="Write your answer here..."
                  />
                ) : (
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type={
                            question.type === 'MULTIPLE_CHOICE'
                              ? 'checkbox'
                              : 'radio'
                          }
                          name={`question-${question.id}`}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                          checked={
                            question.type === 'MULTIPLE_CHOICE'
                              ? answers[question.id].includes(option)
                              : answers[question.id] === option
                          }
                          onChange={() =>
                            handleAnswerChange(
                              question.id,
                              option,
                              question.type
                            )
                          }
                        />
                        <label className="ml-3 block text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary"
        >
          {submitting ? 'Submitting...' : 'Submit Exam'}
        </button>
      </div>
    </div>
  );
};

export default ExamTake; 