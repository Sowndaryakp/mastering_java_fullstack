import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { exams, users } from '../services/api';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    activeExams: [],
    upcomingExams: [],
    pendingApprovals: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [activeExams, upcomingExams] = await Promise.all([
          exams.getActiveExams(),
          exams.getUpcomingExams(),
        ]);

        const dashboardData = {
          activeExams: activeExams.data,
          upcomingExams: upcomingExams.data,
          pendingApprovals: [],
        };

        if (['ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER'].includes(user.role)) {
          const approvalRole = {
            ADMIN: 'PRINCIPAL',
            PRINCIPAL: 'HOD',
            HOD: 'TEACHER',
            TEACHER: 'STUDENT',
          }[user.role];

          const pendingApprovals = await users.getPendingApprovals(approvalRole);
          dashboardData.pendingApprovals = pendingApprovals.data;
        }

        setStats(dashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [user.role]);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Welcome back, {user.firstName}!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Here's what's happening in your account
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active Exams */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-md bg-primary-500 p-2">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Active Exams
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {stats.activeExams.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/exams"
                className="font-medium text-primary-700 hover:text-primary-900"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-md bg-green-500 p-2">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Upcoming Exams
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {stats.upcomingExams.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/exams"
                className="font-medium text-primary-700 hover:text-primary-900"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        {['ADMIN', 'PRINCIPAL', 'HOD', 'TEACHER'].includes(user.role) && (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-yellow-500 p-2">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Pending Approvals
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {stats.pendingApprovals.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/approvals"
                  className="font-medium text-primary-700 hover:text-primary-900"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h3>
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
          {stats.activeExams.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {stats.activeExams.map((exam) => (
                <li key={exam.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{exam.title}</p>
                      <p className="text-sm text-gray-500">
                        Duration: {exam.duration} minutes
                      </p>
                    </div>
                    <Link
                      to={`/exam/${exam.id}`}
                      className="btn-primary text-sm"
                    >
                      {user.role === 'STUDENT' ? 'Take Exam' : 'View Details'}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No active exams at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 