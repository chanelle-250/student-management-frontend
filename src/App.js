import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/dashboard/AdminDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ProfilePage from './components/profile/ProfilePage';
import StudentList from './components/students/StudentList';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

// Loading component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
);

// Main app content
const AppContent = () => {
    const { loading, isAuthenticated, isAdmin } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {isAuthenticated && <Navbar />}

            <Routes>
                {/* Public routes */}
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Admin only routes */}
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute adminOnly>
                            <StudentList />
                        </ProtectedRoute>
                    }
                />

                {/* Default redirects */}
                <Route
                    path="/"
                    element={
                        <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
                    }
                />

                {/* 404 page */}
                <Route
                    path="*"
                    element={
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                                <p className="text-gray-600 mb-4">Page not found</p>
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
};

// Main App component
function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;