import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { exams } from '../../services/api';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

const ExamSubmission = () => {
  const navigate = useNavigate();
  const { examId, submissionId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    fetchSubmission();
  }, [examId, submissionId]);

  const fetchSubmission = async () => {
    try {
      const response = await exams.getSubmission(examId, submissionId);
      setSubmission(response.data);
    } catch (error) {
      toast.error('Failed to fetch submission details');
      navigate(`/exam/${examId}/results`);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (questionId, feedback) => {
    setSubmission((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: {
          ...prev.answers[questionId],
          feedback,
        },
      },
    }));
  };

  const handleMarksChange = (questionId, marks) => {
    const newMarks = Math.min(
      Math.max(0, parseInt(marks) || 0),
      submission.exam.questions.find((q) => q.id === questionId).marks
    );

    setSubmission((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: {
          ...prev.answers[questionId],
          marks: newMarks,
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await exams.updateSubmission(examId, submissionId, {
        answers: submission.answers,
      });
      toast.success('Submission updated successfully');
      navigate(`/exam/${examId}/results`);
    } catch (error) {
      toast.error('Failed to update submission');
    } finally {
      setSaving(false);
    }
  };

  const calculateTotalScore = () => {
    return Object.values(submission.answers).reduce(
      (total, answer) => total + (answer.marks || 0),
      0
    );
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-gray-500">Loading submission...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Submission Review
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {submission.student.name} - {submission.exam.title}
          </p>
        </div>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => navigate(`/exam/${examId}/results`)}
            className="btn-secondary mr-3"
          >
            <ArrowLeftIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Back to Results
          </button>
          {user.role === 'TEACHER' && (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Total Score
              </h3>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                {calculateTotalScore()} / {submission.exam.totalMarks}
              </div>
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-4 py-2 text-base font-semibold ${
                  submission.passed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {submission.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {submission.exam.questions.map((question, index) => (
          <div
            key={question.id}
            className="overflow-hidden bg-white shadow sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-medium text-gray-900">
                      Question {index + 1}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {question.marks} marks
                    </p>
                  </div>
                  {submission.answers[question.id].isCorrect ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                  )}
                </div>

                <p className="text-gray-900">{question.questionText}</p>

                {question.type === 'DESCRIPTIVE' ? (
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Student's Answer:
                      </p>
                      <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-gray-900">
                        {submission.answers[question.id].answer}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Model Answer:
                      </p>
                      <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-gray-900">
                        {question.correctAnswer}
                      </p>
                    </div>

                    {user.role === 'TEACHER' && (
                      <div className="space-y-4 rounded-md bg-gray-50 p-4">
                        <div>
                          <label
                            htmlFor={`marks-${question.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Marks (max: {question.marks})
                          </label>
                          <input
                            type="number"
                            id={`marks-${question.id}`}
                            min="0"
                            max={question.marks}
                            value={submission.answers[question.id].marks || 0}
                            onChange={(e) =>
                              handleMarksChange(question.id, e.target.value)
                            }
                            className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`feedback-${question.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Feedback
                          </label>
                          <textarea
                            id={`feedback-${question.id}`}
                            rows={3}
                            value={submission.answers[question.id].feedback || ''}
                            onChange={(e) =>
                              handleFeedbackChange(question.id, e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Provide feedback for the student..."
                          />
                        </div>
                      </div>
                    )}

                    {submission.answers[question.id].feedback && (
                      <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                              Teacher's Feedback
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <p className="whitespace-pre-wrap">
                                {submission.answers[question.id].feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Selected Answer(s):
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`flex items-center rounded-md p-2 ${
                              submission.answers[question.id].answer.includes(
                                option
                              )
                                ? submission.answers[question.id].isCorrect
                                  ? 'bg-green-50'
                                  : 'bg-red-50'
                                : ''
                            }`}
                          >
                            <input
                              type={
                                question.type === 'MULTIPLE_CHOICE'
                                  ? 'checkbox'
                                  : 'radio'
                              }
                              checked={submission.answers[
                                question.id
                              ].answer.includes(option)}
                              readOnly
                              className="h-4 w-4 text-primary-600"
                            />
                            <label className="ml-3 block text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!submission.answers[question.id].isCorrect && (
                      <div className="rounded-md bg-yellow-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Correct Answer
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>
                                {Array.isArray(question.correctAnswer)
                                  ? question.correctAnswer.join(', ')
                                  : question.correctAnswer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {user.role === 'TEACHER' && (
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/exam/${examId}/results`)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamSubmission; 