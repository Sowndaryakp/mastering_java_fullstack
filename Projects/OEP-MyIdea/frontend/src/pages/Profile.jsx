import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../store/slices/authSlice';
import { users, exams } from '../services/api';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import ExamAnalytics from '../components/ExamAnalytics';
import { cache } from '../utils/cache';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    department: user.department || '',
    semester: user.semester || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    examGraded: true,
    examStarting: true,
    examEnding: true,
    newAnnouncements: true,
  });
  const [academicHistory, setAcademicHistory] = useState({
    exams: [],
    stats: null,
  });

  useEffect(() => {
    // Load cached notification settings
    const cachedPreferences = cache.getUserPreferences();
    if (cachedPreferences.notifications) {
      setNotificationSettings(cachedPreferences.notifications);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'academic') {
      // Try to load from cache first
      const cachedHistory = cache.getExamHistory();
      if (cachedHistory.exams.length > 0) {
        setAcademicHistory(cachedHistory);
        setLoading(false);
      }
      // Then fetch fresh data
      fetchAcademicHistory();
    }
  }, [activeTab]);

  const fetchAcademicHistory = async () => {
    setLoading(true);
    try {
      const [examsResponse, statsResponse] = await Promise.all([
        exams.getUserExams(),
        exams.getUserStats(),
      ]);
      const newHistory = {
        exams: examsResponse.data,
        stats: statsResponse.data,
      };
      setAcademicHistory(newHistory);
      // Cache the new data
      cache.setExamHistory(newHistory);
    } catch (error) {
      toast.error('Failed to fetch academic history');
      // If offline, use cached data
      const cachedHistory = cache.getExamHistory();
      if (cachedHistory.exams.length > 0) {
        setAcademicHistory(cachedHistory);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await users.updateProfile(profileData);
      dispatch(updateUser(response.data));
      toast.success('Profile updated successfully');
    } catch (error) {
      if (!navigator.onLine) {
        // Store update for later sync
        cache.addOfflineAction({
          url: '/api/users/profile',
          method: 'PUT',
          body: JSON.stringify(profileData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.info('Changes will be saved when you're back online');
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      await users.changePassword(passwordData);
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await users.updateNotificationSettings(notificationSettings);
      // Cache the new settings
      cache.setUserPreferences({
        ...cache.getUserPreferences(),
        notifications: notificationSettings,
      });
      toast.success('Notification settings updated');
    } catch (error) {
      if (!navigator.onLine) {
        cache.addOfflineAction({
          url: '/api/users/notifications',
          method: 'PUT',
          body: JSON.stringify(notificationSettings),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.info('Changes will be saved when you're back online');
      } else {
        toast.error('Failed to update notification settings');
      }
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'password', name: 'Password', icon: KeyIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'academic', name: 'Academic History', icon: AcademicCapIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              <tab.icon
                className={`-ml-0.5 mr-2 h-5 w-5 ${
                  activeTab === tab.id
                    ? 'text-primary-500'
                    : 'text-gray-400'
                }`}
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  value={profileData.department}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              {user.role === 'STUDENT' && (
                <div>
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Semester
                  </label>
                  <input
                    type="text"
                    id="semester"
                    value={profileData.semester}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        semester: e.target.value,
                      }))
                    }
                    className="input-field"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="max-w-md space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'notifications' && (
          <form onSubmit={handleNotificationSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="examGraded"
                  checked={notificationSettings.examGraded}
                  onChange={(e) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      examGraded: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="examGraded"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Notify when exams are graded
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="examStarting"
                  checked={notificationSettings.examStarting}
                  onChange={(e) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      examStarting: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="examStarting"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Notify before exam starts
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="examEnding"
                  checked={notificationSettings.examEnding}
                  onChange={(e) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      examEnding: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="examEnding"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Notify before exam ends
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newAnnouncements"
                  checked={notificationSettings.newAnnouncements}
                  onChange={(e) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      newAnnouncements: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="newAnnouncements"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Notify for new announcements
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <div className="text-lg text-gray-500">
                  Loading academic history...
                </div>
              </div>
            ) : (
              <>
                <ExamAnalytics 
                  examHistory={academicHistory.exams} 
                  stats={academicHistory.stats} 
                />

                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Recent Exams
                    </h3>
                    <div className="mt-4">
                      <div className="flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead>
                                <tr>
                                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                    Exam Title
                                  </th>
                                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Score
                                  </th>
                                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                  </th>
                                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Date
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {academicHistory.exams.map((exam) => (
                                  <tr key={exam.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                      {exam.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {exam.score} / {exam.totalMarks}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                          exam.passed
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                      >
                                        {exam.passed ? 'Passed' : 'Failed'}
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {new Date(exam.date).toLocaleDateString()}
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
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 