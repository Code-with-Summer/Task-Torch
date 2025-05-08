'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api'; // Make sure this points to your axios/fetch wrapper

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks'); // Update with your actual endpoint
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError('Failed to fetch tasks.');
            }
        };

        fetchTasks();
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500';
            case 'low':
                return 'bg-sky-500';
            case 'medium':
            default:
                return 'bg-orange-400';
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">📋 All Tasks</h2>
            {error && <p className="text-red-600">{error}</p>}

            {tasks.length === 0 ? (
                <p className="text-gray-600">No tasks found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
                        >
                            {/* Priority Indicator */}
                            <div
                                className={`absolute top-2 right-2 h-4 w-4 rounded-full ${getPriorityColor(
                                    task.priority || 'medium'
                                )}`}
                                title={`Priority: ${task.priority || 'medium'}`}
                            ></div>

                            <h3 className="text-lg font-bold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.description}</p>

                            <div className="mt-2 text-sm text-gray-500">
                                <p>Status: <span className="capitalize">{task.status}</span></p>
                                <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
