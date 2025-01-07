"use client";
import React, { useState } from 'react';

function Page() {
    const projectName = "PREMARE"; // Replace with dynamic project name if needed
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState('');

    const handleAddTaskClick = () => {
        setShowForm(!showForm);
    };

    const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Logic to add the task
        console.log('Task added:', taskName);
        setTaskName('');
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            {/* Project Name Header */}
            <header className="text-black p-4 rounded-lg shadow">
                <h1 className="text-2xl font-bold">{projectName}</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* To-Do Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">To-Do</h2>
                        <button
                            onClick={handleAddTaskClick}
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                        >
                            Add Task
                        </button>
                    </div>
                    {showForm && (
                        <form onSubmit={handleFormSubmit} className="mb-4">
                            <input
                                type="text"
                                value={taskName}
                                onChange={handleTaskNameChange}
                                placeholder="Enter task name"
                                className="p-2 border border-gray-300 rounded w-full mb-2"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                    <ul className="space-y-4">
                        <li className="p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
                            <div className="flex justify-between">
                                <span>Task 1</span>
                                <button className="text-blue-500 font-medium">Start</button>
                            </div>
                        </li>
                        <li className="p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
                            <div className="flex justify-between">
                                <span>Task 2</span>
                                <button className="text-blue-500 font-medium">Start</button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* In Progress Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">In Progress</h2>
                    <ul className="space-y-4">
                        <li className="p-4 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm">
                            <div className="flex justify-between">
                                <span>Task 3</span>
                                <button className="text-yellow-500 font-medium">Complete</button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Completed Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed</h2>
                    <ul className="space-y-4">
                        <li className="p-4 bg-green-50 rounded-lg border border-green-300 shadow-sm">
                            <div className="flex justify-between">
                                <span>Task 4</span>
                                <button className="text-green-500 font-medium">Reopen</button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Feedback Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback</h2>
                    <ul className="space-y-4">
                        <li className="p-4 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                            <div className="flex justify-between">
                                <span>Feedback 1</span>
                                <button className="text-purple-500 font-medium">Review</button>
                            </div>
                        </li>
                        <li className="p-4 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                            <div className="flex justify-between">
                                <span>Feedback 2</span>
                                <button className="text-purple-500 font-medium">Review</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Page;