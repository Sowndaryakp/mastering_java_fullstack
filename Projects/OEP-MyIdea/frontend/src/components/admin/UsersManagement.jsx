import React from 'react';

const UsersManagement = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Users Management</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add New User
          </button>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border rounded-md"
            />
            <select className="px-4 py-2 border rounded-md">
              <option value="">All Roles</option>
              <option value="TEACHER">Teachers</option>
              <option value="STUDENT">Students</option>
            </select>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample user row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap">Teacher</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement; 