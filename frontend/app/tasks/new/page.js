'use client';

import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function NewTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');
    const [assignedTo, setAssignedTo] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/users', { withCredentials: true });
                setUsers(res.data);
            } catch (err) {
                setError('Failed to load users');
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        if (!title || !dueDate) {
            setError('Title and Due Date are required');
            return;
        }

        try {
            await api.post('/tasks', {
                title,
                description,
                dueDate,
                priority,
                status,
                assignedTo
            }, { withCredentials: true });

            toast.success('Task created successfully!');
            setTimeout(() => router.push('/dashboard'), 1000);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Task creation failed');
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md mt-10 w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create Task</h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <select
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Assign to (optional)</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                    </option>
                ))}
            </select>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Create
            </button>
        </div>

    );
}
