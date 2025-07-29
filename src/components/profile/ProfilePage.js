import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone: '',
        course_of_study: '',
        enrollment_year: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await userAPI.getProfile();
            setProfile({
                full_name: response.data.full_name || '',
                email: response.data.email || '',
                phone: response.data.phone || '',
                course_of_study: response.data.course_of_study || '',
                enrollment_year: response.data.enrollment_year || ''
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage({ type: 'error', text: 'Failed to load profile data' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await userAPI.updateProfile(profile);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-b border-gray-200 pb-5">
                        <h1 className="text-2xl font-bold leading-6 text-gray-900">
                            My Profile
                        </h1>
                        <p className="mt-2 max-w-4xl text-sm text-gray-500">
                            Update your personal information and academic details.
                        </p>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="px-4 sm:px-0">
                    <div className="bg-white shadow rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="px-4 py-5 sm:p-6">
                                {/* Message Display */}
                                {message.text && (
                                    <div className={`mb-6 p-4 rounded-lg ${
                                        message.type === 'success'
                                            ? 'bg-green-50 border border-green-200 text-green-700'
                                            : 'bg-red-50 border border-red-200 text-red-700'
                                    }`}>
                                        {message.text}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {/* Full Name */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            id="full_name"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Enter your full name"
                                            value={profile.full_name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Enter your email"
                                            value={profile.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Enter your phone number"
                                            value={profile.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Course of Study (only for students) */}
                                    {user?.role === 'student' && (
                                        <>
                                            <div>
                                                <label htmlFor="course_of_study" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Course of Study
                                                </label>
                                                <input
                                                    type="text"
                                                    name="course_of_study"
                                                    id="course_of_study"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                                    placeholder="e.g., Computer Science"
                                                    value={profile.course_of_study}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="enrollment_year" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Enrollment Year
                                                </label>
                                                <input
                                                    type="number"
                                                    name="enrollment_year"
                                                    id="enrollment_year"
                                                    min="2020"
                                                    max="2030"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                                    placeholder="e.g., 2023"
                                                    value={profile.enrollment_year}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Account Information (Read-only) */}
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Role
                                            </label>
                                            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user?.role}
                        </span>
                                            </div>
                                        </div>

                                        {user?.role === 'student' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Status
                                                </label>
                                                <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;