'use client';

import { useState } from 'react';

export default function TaskFilters({ onFilter }) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleApplyFilters = () => {
        onFilter({ search, status, priority, dueDate });
    };

    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-6 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="🔍 Search tasks"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Status dropdown */}
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                {/* Priority dropdown */}
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Priorities</option>
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟠 Medium</option>
                    <option value="Low">🔵 Low</option>
                </select>

                {/* Due date input */}
                <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Apply Filters Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleApplyFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
