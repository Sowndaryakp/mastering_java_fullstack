import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { exams } from '../../services/api';

const ExamCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState({
    title: '',
    description: '',
    duration: 60,
    startTime: '',
    endTime: '',
    questions: [],
  });

  useEffect(() => {
    if (id) {
      fetchExam();
    }
  }, [id]);

  const fetchExam = async () => {
    try {
      const response = await exams.getById(id);
      const examData = response.data;
      setExam({
        ...examData,
        startTime: formatDateTime(examData.startTime),
        endTime: formatDateTime(examData.endTime),
      });
    } catch (error) {
      toast.error('Failed to fetch exam details');
      navigate('/exams');
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const examData = {
        ...exam,
        startTime: new Date(exam.startTime).toISOString(),
        endTime: new Date(exam.endTime).toISOString(),
      };

      if (id) {
        await exams.update(id, examData);
        toast.success('Exam updated successfully');
      } else {
        await exams.create(examData);
        toast.success('Exam created successfully');
      }

      navigate('/exams');
    } catch (error) {
      toast.error(id ? 'Failed to update exam' : 'Failed to create exam');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionAdd = () => {
    setExam((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: '',
          type: 'MULTIPLE_CHOICE',
          marks: 1,
          options: ['', '', '', ''],
          correctAnswer: '',
        },
      ],
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      ),
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optionIndex ? value : opt
              ),
            }
          : q
      ),
    }));
  };

  const handleQuestionRemove = (index) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          {id ? 'Edit Exam' : 'Create New Exam'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="input-field"
                  value={exam.title}
                  onChange={(e) =>
                    setExam((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="input-field"
                  value={exam.description}
                  onChange={(e) =>
                    setExam((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    required
                    min="1"
                    className="input-field"
                    value={exam.duration}
                    onChange={(e) =>
                      setExam((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    id="startTime"
                    required
                    className="input-field"
                    value={exam.startTime}
                    onChange={(e) =>
                      setExam((prev) => ({ ...prev, startTime: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    id="endTime"
                    required
                    className="input-field"
                    value={exam.endTime}
                    onChange={(e) =>
                      setExam((prev) => ({ ...prev, endTime: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Questions
                </h3>
                <button
                  type="button"
                  onClick={handleQuestionAdd}
                  className="btn-secondary"
                >
                  Add Question
                </button>
              </div>

              {exam.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Question text"
                          className="input-field"
                          value={question.questionText}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              'questionText',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuestionRemove(questionIndex)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Question Type
                        </label>
                        <select
                          className="input-field"
                          value={question.type}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              'type',
                              e.target.value
                            )
                          }
                        >
                          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                          <option value="SINGLE_CHOICE">Single Choice</option>
                          <option value="TRUE_FALSE">True/False</option>
                          <option value="DESCRIPTIVE">Descriptive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Marks
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="input-field"
                          value={question.marks}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              'marks',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>

                    {question.type !== 'DESCRIPTIVE' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Options
                        </label>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center">
                            <input
                              type="text"
                              className="input-field"
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type={
                                question.type === 'MULTIPLE_CHOICE'
                                  ? 'checkbox'
                                  : 'radio'
                              }
                              name={`correct-${questionIndex}`}
                              className="ml-2"
                              checked={
                                question.type === 'MULTIPLE_CHOICE'
                                  ? question.correctAnswer
                                      .split(',')
                                      .includes(option)
                                  : question.correctAnswer === option
                              }
                              onChange={() => {
                                if (question.type === 'MULTIPLE_CHOICE') {
                                  const answers = question.correctAnswer
                                    ? question.correctAnswer.split(',')
                                    : [];
                                  const newAnswers = answers.includes(option)
                                    ? answers.filter((a) => a !== option)
                                    : [...answers, option];
                                  handleQuestionChange(
                                    questionIndex,
                                    'correctAnswer',
                                    newAnswers.join(',')
                                  );
                                } else {
                                  handleQuestionChange(
                                    questionIndex,
                                    'correctAnswer',
                                    option
                                  );
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/exams')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading
              ? id
                ? 'Updating...'
                : 'Creating...'
              : id
              ? 'Update Exam'
              : 'Create Exam'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamCreate; 