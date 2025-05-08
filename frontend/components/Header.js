'use client';

import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import api from '../lib/api'; // Assuming you have an api.js file for handling requests

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Check login status on component mount
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await api.get('/auth/me'); // Assuming this endpoint returns user info if logged in
                setIsLoggedIn(true); // User is logged in
            } catch (error) {
                setIsLoggedIn(false); // User is not logged in
            }
        };

        checkLogin();
    }, []);

    // Handle Logout
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            setIsLoggedIn(false);
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Task Torch 🔦</h1>

            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded border border-red-500 hover:bg-red-600 transition"
                >
                    Logout
                </button>
            )}
        </header>
    );
}
