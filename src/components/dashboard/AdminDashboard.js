import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeStudents: 0,
        graduatedStudents: 0,
        droppedStudents: 0
    });
    const [recentStudents, setRecentStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await studentAPI.getAllStudents();
            const students = response.data.students;

            // Calculate statistics
            const stats = {
                totalStudents: students.length,
                activeStudents: students.filter(s => s.status === 'Active').length,
                graduatedStudents: students.filter(s => s.status === 'Graduated').length,
                droppedStudents: students.filter(s => s.status === 'Dropped').length
            };

            setStats(stats);
            setRecentStudents(students.slice(0, 5)); // Get 5 most recent students
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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

    const StatCard = ({ title, value, color, icon }) => (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center`}>
                            {icon}
                        </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="text-lg font-medium text-gray-900">{value}</dd>
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
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 max-w-4xl text-sm text-gray-500">
                            Welcome back, {user?.full_name}! Here's an overview of your student management system.
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="px-4 sm:px-0">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <StatCard
                            title="Total Students"
                            value={stats.totalStudents}
                            color="bg-blue-500"
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />
                        <StatCard
                            title="Active Students"
                            value={stats.activeStudents}
                            color="bg-green-500"
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                        <StatCard
                            title="Graduated"
                            value={stats.graduatedStudents}
                            color="bg-purple-500"
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                        <StatCard
                            title="Dropped"
                            value={stats.droppedStudents}
                            color="bg-red-500"
                            icon={
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white shadow rounded-lg mb-8">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Link
                                    to="/students"
                                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <div>
                    <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-600 ring-4 ring-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Manage Students
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            View, add, edit, and delete student records
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    to="/profile"
                                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <div>
                    <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-600 ring-4 ring-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            My Profile
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            View and update your profile information
                                        </p>
                                    </div>
                                </Link>

                                <div className="relative group bg-white p-6 border border-gray-200 rounded-lg">
                                    <div>
                    <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-600 ring-4 ring-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium">System Reports</h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Generate detailed reports (Coming Soon)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Students */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Students</h3>
                                <Link
                                    to="/students"
                                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                                >
                                    View all →
                                </Link>
                            </div>

                            {recentStudents.length > 0 ? (
                                <div className="overflow-hidden">
                                    <ul className="divide-y divide-gray-200">
                                        {recentStudents.map((student) => (
                                            <li key={student.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary-600">
                                {student.full_name.charAt(0)}
                              </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {student.full_name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {student.email} • {student.course_of_study}
                                                        </p>
                                                    </div>
                                                    <div className="flex-shrink-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    student.status === 'Graduated' ? 'bg-purple-100 text-purple-800' :
                                        'bg-red-100 text-red-800'
                            }`}>
                              {student.status}
                            </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No students found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;