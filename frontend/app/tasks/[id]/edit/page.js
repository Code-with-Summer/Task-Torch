'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../lib/api';
import { toast } from 'react-hot-toast';

export default function EditTask() {
    const [task, setTask] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await api.get(`/tasks/${id}`);
                setTask(res.data);
            } catch (err) {
                setError('Failed to fetch task');
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await api.get('/auth/users');
                setUsers(res.data);
            } catch {
                setUsers([]);
            }
        };

        fetchTask();
        fetchUsers();
    }, [id]);

    const handleSubmit = async () => {
        try {
            await api.put(`/tasks/${id}`, task);
            toast.success('Task updated!');
            router.push('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        }
    };

    if (!task) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2>Edit Task</h2>

            <input
                type="text"
                placeholder="Title"
                value={task.title}
                onChange={e => setTask({ ...task, title: e.target.value })}
                style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
            />

            <textarea
                placeholder="Description"
                value={task.description}
                onChange={e => setTask({ ...task, description: e.target.value })}
                style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
            />

            <input
                type="date"
                value={task.dueDate?.slice(0, 10)}
                onChange={e => setTask({ ...task, dueDate: e.target.value })}
                style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
            />

            <select
                value={task.priority}
                onChange={e => setTask({ ...task, priority: e.target.value })}
                style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <select
                value={task.status}
                onChange={e => setTask({ ...task, status: e.target.value })}
                style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <select
                value={task.assignedTo || ''}
                onChange={e => setTask({ ...task, assignedTo: e.target.value })}
                style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
            >
                <option value="">Assign to (optional)</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit}>Update Task</button>
        </div>
    );
}
