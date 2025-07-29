import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        course_of_study: '',
        enrollment_year: new Date().getFullYear(),
        status: 'Active'
    });
    const [loading, setLoading] = useState(false);
    const isEditing = !!student;

    useEffect(() => {
        if (student) {
            setFormData({
                full_name: student.full_name || '',
                email: student.email || '',
                phone: student.phone || '',
                password: '', // Never populate password for editing
                course_of_study: student.course_of_study || '',
                enrollment_year: student.enrollment_year || new Date().getFullYear(),
                status: student.status || 'Active'
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // For editing, don't send password if it's empty
            const submitData = { ...formData };
            if (isEditing && !submitData.password) {
                delete submitData.password;
            }

            await onSubmit(submitData);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-4 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        {isEditing ? 'Edit Student' : 'Add New Student'}
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Full Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter student's full name"
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password */}
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password {!isEditing && '*'}
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder={isEditing ? "Leave blank to keep current password" : "Enter password"}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {isEditing && (
                                <p className="mt-1 text-sm text-gray-500">
                                    Leave blank to keep the current password
                                </p>
                            )}
                        </div>

                        {/* Course of Study */}
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
                                value={formData.course_of_study}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Enrollment Year */}
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
                                value={formData.enrollment_year}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Status (only for editing) */}
                        {isEditing && (
                            <div className="sm:col-span-2">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Graduated">Graduated</option>
                                    <option value="Dropped">Dropped</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                isEditing ? 'Update Student' : 'Create Student'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;