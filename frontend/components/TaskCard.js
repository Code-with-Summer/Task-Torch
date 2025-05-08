'use client';

import { toast } from 'react-hot-toast';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

export default function TaskCard({ task, currentUserId, onTaskDeleted, onTaskUpdated }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (task.createdBy !== currentUserId) {
            toast.error("You can only delete tasks you created.");
            return;
        }

        try {
            await api.delete(`/tasks/${task._id}`);
            toast.success("Task deleted successfully");
            onTaskDeleted(task._id);
        } catch (err) {
            toast.error("Failed to delete task");
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        try {
            await api.put(`/tasks/${task._id}`, { status: newStatus });
            toast.success("Status updated");
            onTaskUpdated(task._id, newStatus);
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleEdit = () => {
        router.push(`/tasks/${task._id}/edit`);
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px'
        }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Status:</strong>
                <select value={task.status} onChange={handleStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </p>
            {task.assignedTo && (
                <p><strong>Assigned To:</strong> {task.assignedTo.name} ({task.assignedTo.email})</p>
            )}

            {task.createdBy === currentUserId && (
                <div style={{ marginTop: '0.5rem' }}>
                    <button onClick={handleEdit} style={{ marginRight: '0.5rem' }}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}
