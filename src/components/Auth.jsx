import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!username || !password) {
            return setMessage({ type: 'error', text: 'Fill in all fields' });
        }

        if (localStorage.getItem(`user_${username}`)) {
            return setMessage({ type: 'error', text: 'Username already exists' });
        }

        localStorage.setItem(`user_${username}`, JSON.stringify({ password }));
        localStorage.setItem('username', username);
        setMessage({ type: 'success', text: 'Account created and signed in!' });

        setTimeout(() => navigate('/'), 1000);
    };

    const handleLogin = () => {
        const user = localStorage.getItem(`user_${username}`);
        if (!user) {
            return setMessage({ type: 'error', text: 'User not found' });
        }

        const parsed = JSON.parse(user);
        if (parsed.password !== password) {
            return setMessage({ type: 'error', text: 'Wrong password' });
        }

        localStorage.setItem('username', username);
        setMessage({ type: 'success', text: 'Signed in successfully!' });

        setTimeout(() => navigate('/'), 1000);
    };

    // Clear messages after 3 seconds
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="max-w-sm mx-auto mt-32 p-6 border rounded shadow bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up / Login</h2>

            {message.text && (
                <div
                    className={`mb-4 text-sm p-2 rounded text-center ${
                        message.type === 'error'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <input
                type="text"
                placeholder="Username"
                className="w-full mb-3 border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-4 justify-between">
                <button
                    onClick={handleSignup}
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                    Sign Up
                </button>
                <button
                    onClick={handleLogin}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Log In
                </button>
            </div>
        </div>
    );
}
