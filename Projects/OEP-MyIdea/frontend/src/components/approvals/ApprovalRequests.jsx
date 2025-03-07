import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ApprovalRequests = () => {
  const { user } = useSelector((state) => state.auth);
  
  // Sample data - replace with API call
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'STUDENT',
      class: 'Class X-A',
      registrationNumber: 'REG001',
      status: 'PENDING',
      requestDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'TEACHER',
      department: 'Mathematics',
      status: 'PENDING',
      requestDate: '2024-03-14'
    }
  ]);

  const handleApprove = async (id) => {
    try {
      // TODO: Replace with actual API call
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status: 'APPROVED' } : req
      ));
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      // TODO: Replace with actual API call
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status: 'REJECTED' } : req
      ));
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const getRequestsForRole = () => {
    switch (user.role) {
      case 'TEACHER':
        return requests.filter(req => req.role === 'STUDENT');
      case 'HOD':
        return requests.filter(req => req.role === 'TEACHER');
      case 'PRINCIPAL':
        return requests.filter(req => req.role === 'HOD');
      case 'ADMIN':
        return requests;
      default:
        return [];
    }
  };

  const filteredRequests = getRequestsForRole();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Approval Requests</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
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
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.class && `Class: ${request.class}`}
                    {request.registrationNumber && `, Reg: ${request.registrationNumber}`}
                    {request.department && `Department: ${request.department}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${request.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                        request.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {request.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRequests.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No pending approval requests.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalRequests; 