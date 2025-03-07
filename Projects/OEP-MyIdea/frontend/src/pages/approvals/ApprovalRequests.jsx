import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../../services/api';

const ApprovalRequests = () => {
  const { user } = useSelector((state) => state.auth);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const approvalRole = {
    ADMIN: 'PRINCIPAL',
    PRINCIPAL: 'HOD',
    HOD: 'TEACHER',
    TEACHER: 'STUDENT',
  }[user.role];

  useEffect(() => {
    fetchPendingApprovals();
  }, [approvalRole]);

  const fetchPendingApprovals = async () => {
    try {
      const response = await users.getPendingApprovals(approvalRole);
      setPendingUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch pending approvals');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await users.approve(userId);
      toast.success('User approved successfully');
      setPendingUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      toast.error('Failed to approve user');
    }
  };

  const handleReject = async (userId) => {
    try {
      await users.reject(userId);
      toast.success('User rejected successfully');
      setPendingUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      toast.error('Failed to reject user');
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
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Pending Approvals
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Review and manage {approvalRole.toLowerCase()} registration requests
        </p>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        {pendingUsers.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {pendingUsers.map((pendingUser) => (
              <li key={pendingUser.id}>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {pendingUser.firstName} {pendingUser.lastName}
                      </h3>
                      <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Email: {pendingUser.email}</p>
                        <p>Role: {pendingUser.role}</p>
                      </div>
                    </div>
                    <div className="ml-5 flex space-x-3">
                      <button
                        onClick={() => handleApprove(pendingUser.id)}
                        className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(pendingUser.id)}
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-5 text-center sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              No Pending Approvals
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              There are no pending {approvalRole.toLowerCase()} registrations to
              review at this time.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalRequests; 