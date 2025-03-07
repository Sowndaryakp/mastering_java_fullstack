import React from 'react';

const AvailableExams = () => {
  // Sample data - replace with actual API call
  const exams = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      subject: 'Mathematics',
      duration: 120,
      totalMarks: 100,
      startTime: '2024-03-20T10:00:00',
      endTime: '2024-03-20T12:00:00',
      teacher: 'Dr. Smith'
    },
    {
      id: 2,
      title: 'Physics Mid-term',
      subject: 'Physics',
      duration: 90,
      totalMarks: 75,
      startTime: '2024-03-22T14:00:00',
      endTime: '2024-03-22T15:30:00',
      teacher: 'Prof. Johnson'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Available Exams</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{exam.title}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Subject: {exam.subject}</p>
                <p className="text-sm text-gray-500">Duration: {exam.duration} minutes</p>
                <p className="text-sm text-gray-500">Total Marks: {exam.totalMarks}</p>
                <p className="text-sm text-gray-500">Teacher: {exam.teacher}</p>
                <div className="text-sm text-gray-500">
                  Start: {new Date(exam.startTime).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  End: {new Date(exam.endTime).toLocaleString()}
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {exams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No exams available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AvailableExams; 