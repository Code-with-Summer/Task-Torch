'use client';

import { useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await api.post('/auth/login', { email, password });
            router.push('/homePage');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </div>
        </div>

    );
}
