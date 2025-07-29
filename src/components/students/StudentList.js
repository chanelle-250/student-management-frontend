import React, { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import StudentForm from './StudentForm';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await studentAPI.getAllStudents();
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching students:', error);
            setMessage({ type: 'error', text: 'Failed to load students' });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateStudent = () => {
        setEditingStudent(null);
        setShowForm(true);
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setShowForm(true);
    };

    const handleFormSubmit = async (studentData) => {
        try {
            if (editingStudent) {
                await studentAPI.updateStudent(editingStudent.id, studentData);
                setMessage({ type: 'success', text: 'Student updated successfully!' });
            } else {
                await studentAPI.createStudent(studentData);
                setMessage({ type: 'success', text: 'Student created successfully!' });
            }

            setShowForm(false);
            setEditingStudent(null);
            fetchStudents();
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Operation failed'
            });
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await studentAPI.deleteStudent(id);
            setMessage({ type: 'success', text: 'Student deleted successfully!' });
            setDeleteConfirm(null);
            fetchStudents();
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to delete student'
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Student Management</h2>

            {message.text && (
                <div
                    className={`p-2 mb-4 rounded ${
                        message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={handleCreateStudent}
            >
                + Add Student
            </button>

            {showForm && (
                <StudentForm
                    initialData={editingStudent}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingStudent(null);
                    }}
                />
            )}

            {loading ? (
                <p>Loading students...</p>
            ) : (
                <div className="grid gap-4">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className="p-4 border rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <p><strong>Name:</strong> {student.name}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Course:</strong> {student.course}</p>
                                <p><strong>Status:</strong> {student.status}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="bg-yellow-400 px-3 py-1 rounded"
                                    onClick={() => handleEditStudent(student)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDeleteStudent(student.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentList;
