'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api'; // Assuming you have an api.js file for handling requests

export default function Dashboard() {
    const [createdByMe, setCreatedByMe] = useState([]);
    const [assignedToMe, setAssignedToMe] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [error, setError] = useState('');
    const currentUserId = 'USER_ID'; // Replace this with actual logged-in user id or context

    const fetchTasks = async () => {
        try {
            const response = await api.get(`/tasks`);
            const tasks = response.data;

            // Filter tasks based on different criteria
            setCreatedByMe(tasks.filter(task => task.createdBy === currentUserId));
            setAssignedToMe(tasks.filter(task => task.assignedTo && task.assignedTo._id === currentUserId));
            setOverdueTasks(tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'Completed'));
            setPendingTasks(tasks.filter(task => task.status === 'Pending'));
            setInProgressTasks(tasks.filter(task => task.status === 'In Progress'));
        } catch (error) {
            setError('Failed to fetch tasks');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1 className='text-xl font-semibold mb-8 mt-8'>📋 Dashboard</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Total Tasks Card */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Total Tasks</h2>
                    <p>{createdByMe.length + assignedToMe.length}</p>
                </div>

                {/* Tasks Assigned Card */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">🧠 Tasks Assigned To Me</h2>
                    <p>{assignedToMe.length}</p>
                </div>

                {/* Pending Tasks Card */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">⏰Pending Tasks</h2>
                    <p>{pendingTasks.length}</p>
                </div>

                {/* In Progress Tasks Card */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">📌 In Progress Tasks</h2>
                    <p>{inProgressTasks.length}</p>
                </div>
            </section>
            <Link href="/homePage">
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                    Go to Homepage
                </button>
            </Link>
        </div>
    );
}
