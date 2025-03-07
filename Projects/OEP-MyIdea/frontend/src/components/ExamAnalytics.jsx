import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ExamAnalytics = ({ examHistory, stats }) => {
  // Prepare data for performance trend chart
  const performanceTrendData = {
    labels: examHistory.map((exam) => exam.title),
    datasets: [
      {
        label: 'Score (%)',
        data: examHistory.map(
          (exam) => (exam.score / exam.totalMarks) * 100
        ),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Prepare data for subject-wise performance
  const subjectData = examHistory.reduce((acc, exam) => {
    const subject = exam.subject || 'Unknown';
    if (!acc[subject]) {
      acc[subject] = {
        total: 0,
        count: 0,
      };
    }
    acc[subject].total += (exam.score / exam.totalMarks) * 100;
    acc[subject].count += 1;
    return acc;
  }, {});

  const subjectPerformanceData = {
    labels: Object.keys(subjectData),
    datasets: [
      {
        label: 'Average Score (%)',
        data: Object.values(subjectData).map(
          (data) => data.total / data.count
        ),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(139, 92, 246, 0.5)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for pass/fail distribution
  const passFailData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [
          examHistory.filter((exam) => exam.passed).length,
          examHistory.filter((exam) => !exam.passed).length,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderColor: ['rgb(16, 185, 129)', 'rgb(239, 68, 68)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const exportToExcel = () => {
    const data = examHistory.map((exam) => ({
      'Exam Title': exam.title,
      'Subject': exam.subject || 'N/A',
      'Score': exam.score,
      'Total Marks': exam.totalMarks,
      'Percentage': ((exam.score / exam.totalMarks) * 100).toFixed(2) + '%',
      'Status': exam.passed ? 'Passed' : 'Failed',
      'Date': new Date(exam.date).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exam History');
    XLSX.writeFile(wb, 'exam_history.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={exportToExcel}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
          Export to Excel
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trend */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Performance Trend
            </h3>
            <div className="mt-4 h-[300px]">
              <Line data={performanceTrendData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Subject-wise Performance
            </h3>
            <div className="mt-4 h-[300px]">
              <Bar data={subjectPerformanceData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Pass/Fail Distribution */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Pass/Fail Distribution
            </h3>
            <div className="mt-4 h-[300px]">
              <Doughnut data={passFailData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Performance Summary
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-sm font-medium text-gray-500">
                  Average Score
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-primary-600">
                  {stats.averageScore.toFixed(2)}%
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-sm font-medium text-gray-500">
                  Pass Rate
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-primary-600">
                  {stats.passRate.toFixed(2)}%
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-sm font-medium text-gray-500">
                  Highest Score
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-primary-600">
                  {stats.highestScore.toFixed(2)}%
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-sm font-medium text-gray-500">
                  Total Exams
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-primary-600">
                  {stats.examsTaken}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamAnalytics; 