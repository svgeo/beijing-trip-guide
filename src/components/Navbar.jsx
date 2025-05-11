import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure this path is correct

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Track route changes to update login state

    useEffect(() => {
        const user = localStorage.getItem("username");
        setUsername(user);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
        navigate("/auth");
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Beijing logo" className="h-20 w-auto" />
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
                        <Link to="/" className="hover:text-orange-500">Home</Link>
                        <Link to="/itinerary" className="hover:text-orange-500">Itinerary</Link>
                        <Link to="/budget" className="hover:text-orange-500">Budget</Link>
                        <Link to="/events" className="hover:text-orange-500">Events</Link>

                        {username ? (
                            <>
                                <span className="text-sm text-gray-500">Welcome, <strong>{username}</strong></span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth"
                                className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                            >
                                Sign Up / Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-orange-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md py-4 px-4 space-y-3 text-center font-medium text-gray-700">
                    <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">Home</Link>
                    <Link to="/itinerary" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">Itinerary</Link>
                    <Link to="/budget" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">Budget</Link>
                    <Link to="/events" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">Events</Link>

                    {username ? (
                        <>
                            <span className="block text-sm text-gray-500">Welcome, <strong>{username}</strong></span>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition w-full"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/auth"
                            onClick={() => setIsOpen(false)}
                            className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                        >
                            Sign Up / Sign In
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
