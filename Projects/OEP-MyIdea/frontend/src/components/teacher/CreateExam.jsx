import React, { useState } from 'react';

const CreateExam = () => {
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'MULTIPLE_CHOICE',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 5
  });

  const handleExamDataChange = (e) => {
    const { name, value } = e.target;
    setExamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addQuestion = () => {
    setExamData(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }));
    setCurrentQuestion({
      question: '',
      type: 'MULTIPLE_CHOICE',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 5
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Create New Exam</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          {/* Basic Exam Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={examData.title}
                onChange={handleExamDataChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={examData.duration}
                onChange={handleExamDataChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={examData.description}
                onChange={handleExamDataChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Add Question Form */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium mb-4">Add Question</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <textarea
                  name="question"
                  value={currentQuestion.question}
                  onChange={handleQuestionChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">
                      Option {index + 1}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={addQuestion}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium mb-4">Questions ({examData.questions.length})</h2>
            <div className="space-y-4">
              {examData.questions.map((q, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">Question {index + 1}: {q.question}</p>
                  <div className="mt-2 ml-4">
                    {q.options.map((opt, i) => (
                      <p key={i} className={`${i === q.correctAnswer ? 'text-green-600 font-medium' : ''}`}>
                        {String.fromCharCode(65 + i)}. {opt}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam; 