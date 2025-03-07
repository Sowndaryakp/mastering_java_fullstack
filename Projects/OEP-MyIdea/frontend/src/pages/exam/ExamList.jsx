import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { exams } from '../../services/api';
import {
  PlusIcon,
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const ExamList = () => {
  const { user } = useSelector((state) => state.auth);
  const [examList, setExamList] = useState({
    active: [],
    upcoming: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const [active, upcoming, completed] = await Promise.all([
        exams.getActiveExams(),
        exams.getUpcomingExams(),
        exams.getCompletedExams(),
      ]);

      setExamList({
        active: active.data,
        upcoming: upcoming.data,
        completed: completed.data,
      });
    } catch (error) {
      toast.error('Failed to fetch exams');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (!window.confirm('Are you sure you want to delete this exam?')) {
      return;
    }

    try {
      await exams.delete(examId);
      toast.success('Exam deleted successfully');
      fetchExams();
    } catch (error) {
      toast.error('Failed to delete exam');
    }
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Exams
        </h2>
        {user.role === 'TEACHER' && (
          <div className="mt-3 sm:ml-4 sm:mt-0">
            <Link
              to="/exam/create"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Create Exam
            </Link>
          </div>
        )}
      </div>

      {/* Active Exams */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-medium text-gray-900">
          <ClockIcon className="mr-2 h-5 w-5 text-green-500" />
          Active Exams
        </h3>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          {examList.active.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {examList.active.map((exam) => (
                <li key={exam.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-primary-600">
                          {exam.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Duration: {exam.duration} minutes
                        </p>
                      </div>
                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                        {user.role === 'STUDENT' ? (
                          <Link
                            to={`/exam/${exam.id}/take`}
                            className="btn-primary text-sm"
                          >
                            Take Exam
                          </Link>
                        ) : (
                          <>
                            <Link
                              to={`/exam/${exam.id}/results`}
                              className="btn-secondary text-sm"
                            >
                              View Results
                            </Link>
                            <Link
                              to={`/exam/${exam.id}/edit`}
                              className="btn-primary text-sm"
                            >
                              Edit
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 text-center sm:px-6">
              <p className="text-gray-500">No active exams</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-medium text-gray-900">
          <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
          Upcoming Exams
        </h3>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          {examList.upcoming.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {examList.upcoming.map((exam) => (
                <li key={exam.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-primary-600">
                          {exam.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Starts: {new Date(exam.startTime).toLocaleString()}
                        </p>
                      </div>
                      {user.role === 'TEACHER' && (
                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                          <Link
                            to={`/exam/${exam.id}/edit`}
                            className="btn-primary text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteExam(exam.id)}
                            className="btn-secondary text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 text-center sm:px-6">
              <p className="text-gray-500">No upcoming exams</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed Exams */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-medium text-gray-900">
          <CheckCircleIcon className="mr-2 h-5 w-5 text-gray-500" />
          Completed Exams
        </h3>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          {examList.completed.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {examList.completed.map((exam) => (
                <li key={exam.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-primary-600">
                          {exam.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Completed: {new Date(exam.endTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Link
                          to={`/exam/${exam.id}/results`}
                          className="btn-secondary text-sm"
                        >
                          View Results
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 text-center sm:px-6">
              <p className="text-gray-500">No completed exams</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamList; 