import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const navLinkClass = (path) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActiveRoute(path)
        ? 'bg-primary-700 text-white'
        : 'text-gray-300 hover:bg-primary-600 hover:text-white'
    }
  `;

    return (
        <nav className="bg-primary-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold text-white">
                                Student Management
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                                Dashboard
                            </Link>

                            <Link to="/profile" className={navLinkClass('/profile')}>
                                Profile
                            </Link>

                            {isAdmin && (
                                <Link to="/students" className={navLinkClass('/students')}>
                                    Manage Students
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* User menu */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="text-white text-sm">
                                <span className="font-medium">{user?.full_name}</span>
                                <span className="ml-2 px-2 py-1 text-xs bg-primary-500 rounded-full">
                  {user?.role}
                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary-700">
                            <Link
                                to="/dashboard"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isActiveRoute('/dashboard') ? 'bg-primary-800 text-white' : 'text-gray-300 hover:bg-primary-600'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isActiveRoute('/profile') ? 'bg-primary-800 text-white' : 'text-gray-300 hover:bg-primary-600'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </Link>

                            {isAdmin && (
                                <Link
                                    to="/students"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActiveRoute('/students') ? 'bg-primary-800 text-white' : 'text-gray-300 hover:bg-primary-600'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Manage Students
                                </Link>
                            )}

                            <div className="border-t border-primary-600 pt-4 pb-3">
                                <div className="px-3 py-2">
                                    <div className="text-base font-medium text-white">{user?.full_name}</div>
                                    <div className="text-sm text-gray-300">{user?.email}</div>
                                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary-500 text-white rounded-full">
                    {user?.role}
                  </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-primary-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;