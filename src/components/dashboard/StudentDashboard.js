import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await userAPI.getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    const InfoCard = ({ title, value, icon }) => (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                            {icon}
                        </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="text-lg font-medium text-gray-900">{value || 'Not specified'}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-b border-gray-200 pb-5">
                        <h1 className="text-2xl font-bold leading-6 text-gray-900">
                            Student Dashboard
                        </h1>
                        <p className="mt-2 max-w-4xl text-sm text-gray-500">
                            Welcome back, {user?.full_name}! Here's your student information and quick actions.
                        </p>
                    </div>
                </div>

                {/* Profile Overview */}
                <div className="px-4 sm:px-0 mb-8">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center space-x-5">
                                <div className="flex-shrink-0">
                                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {profile?.full_name?.charAt(0)}
                    </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-900">{profile?.full_name}</h2>
                                    <p className="text-sm text-gray-500">{profile?.email}</p>
                                    <div className="mt-2 flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {profile?.status}
                    </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Student
                    </span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link
                                        to="/profile"
                                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Information Cards */}
                <div className="px-4 sm:px-0">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                        <InfoCard
                            title="Course of Study"
                            value={profile?.course_of_study}
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Enrollment Year"
                            value={profile?.enrollment_year}
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                        <InfoCard
                            title="Status"
                            value={profile?.status}
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white shadow rounded-lg mb-8">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Link
                                    to="/profile"
                                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <div>
                    <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-600 ring-4 ring-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Update Profile
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Edit your personal information and academic details
                                        </p>
                                    </div>
                                </Link>

                                <div className="relative group bg-white p-6 border border-gray-200 rounded-lg">
                                    <div>
                    <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-600 ring-4 ring-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium">Academic Records</h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            View your grades and academic progress (Coming Soon)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Academic Information</h3>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <dl className="divide-y divide-gray-200">
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {profile?.full_name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {profile?.email}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {profile?.phone || 'Not provided'}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Course of Study</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {profile?.course_of_study || 'Not specified'}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Enrollment Year</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {profile?.enrollment_year || 'Not specified'}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          profile?.status === 'Active' ? 'bg-green-100 text-green-800' :
                              profile?.status === 'Graduated' ? 'bg-purple-100 text-purple-800' :
                                  'bg-red-100 text-red-800'
                      }`}>
                        {profile?.status}
                      </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;