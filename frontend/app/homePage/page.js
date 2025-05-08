'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaTasks, FaCheckCircle, FaSearch, FaPlus } from 'react-icons/fa';
import Dashboard from '../dashboard/page';
import TaskFilters from '../../components/TaskFilters';
import AllTasks from '../../components/AllTask';

export default function MainPage() {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const handleFilter = (filters) => {
        console.log('Applied filters:', filters);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'search':
                return <TaskFilters onFilter={handleFilter} />;
            case 'dashboard':
                return <Dashboard />;
            case 'allTasks':
                return <AllTasks />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100 p-4 border-r space-y-2">
                <SidebarButton
                    icon={<FaSearch />}
                    label="Search"
                    value="search"
                    active={activeComponent === 'search'}
                    onClick={setActiveComponent}
                />
                <SidebarButton
                    icon={<FaTachometerAlt />}
                    label="Dashboard"
                    value="dashboard"
                    active={activeComponent === 'dashboard'}
                    onClick={setActiveComponent}
                />
                <SidebarButton
                    icon={<FaTasks />}
                    label="All Tasks"
                    value="allTasks"
                    active={activeComponent === 'allTasks'}
                    onClick={setActiveComponent}
                />
                <SidebarButton
                    icon={<FaCheckCircle />}
                    label="Completed Tasks"
                    value="completed"
                    active={activeComponent === 'completed'}
                    onClick={setActiveComponent}
                />

                {/* Assign Tasks link (opens in a new page) */}
                <Link href="/tasks/new" className="block">
                    <div className="flex items-center gap-3 w-full text-left px-4 py-2 rounded transition hover:bg-gray-200">
                        <FaPlus className="text-lg" />
                        <span>Assign Tasks</span>
                    </div>
                </Link>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-6 bg-white overflow-y-auto">{renderComponent()}</div>
        </div>
    );
}

// SidebarButton Component
function SidebarButton({ icon, label, value, active, onClick }) {
    return (
        <button
            onClick={() => onClick(value)}
            className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded transition ${active ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-200'
                }`}
        >
            <span className="text-lg">{icon}</span>
            {label}
        </button>
    );
}
