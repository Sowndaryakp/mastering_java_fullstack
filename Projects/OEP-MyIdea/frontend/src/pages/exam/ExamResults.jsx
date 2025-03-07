import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { exams } from '../../services/api';
import {
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const ExamResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchResults();
  }, [id]);

  const fetchResults = async () => {
    try {
      const [resultsResponse, statsResponse] = await Promise.all([
        exams.getResults(id),
        user.role === 'TEACHER' ? exams.getStatistics(id) : Promise.resolve(null),
      ]);

      setResults(resultsResponse.data);
      if (statsResponse) {
        setStatistics(statsResponse.data);
      }
    } catch (error) {
      toast.error('Failed to fetch exam results');
      navigate('/exams');
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = (answers) => {
    return Object.values(answers).reduce(
      (total, answer) => total + (answer.isCorrect ? answer.marks : 0),
      0
    );
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-gray-500">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          {results.exam.title} - Results
        </h2>
      </div>

      {user.role === 'TEACHER' && statistics && (
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">
                      Average Score
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {statistics.averageScore.toFixed(2)}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">
                      Pass Rate
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {statistics.passRate.toFixed(2)}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">
                      Highest Score
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {statistics.highestScore.toFixed(2)}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {user.role === 'TEACHER' ? (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                          Student
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Score
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Submission Time
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.submissions.map((submission) => (
                        <tr key={submission.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {submission.student.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {calculateScore(submission.answers)} /{' '}
                            {results.exam.totalMarks}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                submission.passed
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {submission.passed ? 'Passed' : 'Failed'}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              onClick={() =>
                                navigate(
                                  `/exam/${id}/submission/${submission.id}`
                                )
                              }
                              className="text-primary-600 hover:text-primary-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Your Score
                  </h3>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {calculateScore(results.answers)} / {results.exam.totalMarks}
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-base font-semibold ${
                      results.passed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {results.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Your Answers</h3>
            {results.exam.questions.map((question, index) => (
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
                      {results.answers[question.id].isCorrect ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-6 w-6 text-red-500" />
                      )}
                    </div>

                    <p className="text-gray-900">{question.questionText}</p>

                    {question.type === 'DESCRIPTIVE' ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Your Answer:
                        </p>
                        <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-gray-900">
                          {results.answers[question.id].answer}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`flex items-center rounded-md p-2 ${
                              results.answers[question.id].answer.includes(
                                option
                              )
                                ? results.answers[question.id].isCorrect
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
                              checked={results.answers[
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
                    )}

                    {!results.answers[question.id].isCorrect && (
                      <div className="mt-4 rounded-md bg-yellow-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Correct Answer
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              {question.type === 'DESCRIPTIVE' ? (
                                <p className="whitespace-pre-wrap">
                                  {question.correctAnswer}
                                </p>
                              ) : (
                                <p>
                                  {Array.isArray(question.correctAnswer)
                                    ? question.correctAnswer.join(', ')
                                    : question.correctAnswer}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamResults; 