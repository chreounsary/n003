"use client";
import React, { useState } from 'react';

function Page() {
    const projectName = "PREMARE"; // Replace with dynamic project name if needed
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [showPanel, setShowPanel] = useState(false);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);

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

    const handleTaskClick = (task: string) => {
        setSelectedTask(task);
        setShowPanel(true);
    };

    const closePanel = () => {
        setShowPanel(false);
        setSelectedTask(null);
    };

    return (
        <div className="space-y-2 relative">
            {/* Project Name Header */}
            <header className="text-black p-1 rounded-lg shadow-sm">
                <h1 className="text-base font-bold">{projectName}</h1> {/* Reduced font size */}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* To-Do Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">To-Do</h2> {/* Reduced font size */}
                        <button
                            onClick={handleAddTaskClick}
                            className="px-2 py-1 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 text-xs"
                        >
                            Add Task
                        </button>
                    </div>
                    {showForm && (
                        <form onSubmit={handleFormSubmit} className="mb-2">
                            <input
                                type="text"
                                value={taskName}
                                onChange={handleTaskNameChange}
                                placeholder="Enter task name"
                                className="p-1 border border-gray-300 rounded w-full mb-1 text-xs"
                            />
                            <button
                                type="submit"
                                className="px-2 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 text-xs"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                    <ul className="space-y-2">
                        <li className="p-2 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 1')} className="cursor-pointer text-xs">Task 1</span> {/* Reduced font size */}
                                <button className="text-blue-500 font-medium text-xs">Start</button> {/* Reduced font size */}
                            </div>
                        </li>
                        <li className="p-2 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 2')} className="cursor-pointer text-xs">Task 2</span> {/* Reduced font size */}
                                <button className="text-blue-500 font-medium text-xs">Start</button> {/* Reduced font size */}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* In Progress Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">In Progress</h2> {/* Reduced font size */}
                    <ul className="space-y-2">
                        <li className="p-2 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 3')} className="cursor-pointer text-xs">Task 3</span> {/* Reduced font size */}
                                <button className="text-yellow-500 font-medium text-xs">Complete</button> {/* Reduced font size */}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Completed Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">Completed</h2> {/* Reduced font size */}
                    <ul className="space-y-2">
                        <li className="p-2 bg-green-50 rounded-lg border border-green-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 4')} className="cursor-pointer text-xs">Task 4</span> {/* Reduced font size */}
                                <button className="text-green-500 font-medium text-xs">Reopen</button> {/* Reduced font size */}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Feedback Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">Feedback</h2> {/* Reduced font size */}
                    <ul className="space-y-2">
                        <li className="p-2 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Feedback 1')} className="cursor-pointer text-xs">Feedback 1</span> {/* Reduced font size */}
                                <button className="text-purple-500 font-medium text-xs">Review</button> {/* Reduced font size */}
                            </div>
                        </li>
                        <li className="p-2 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Feedback 2')} className="cursor-pointer text-xs">Feedback 2</span> {/* Reduced font size */}
                                <button className="text-purple-500 font-medium text-xs">Review</button> {/* Reduced font size */}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Task Detail Panel */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${showPanel ? 'translate-x-0' : 'translate-x-full'
                    } w-full md:w-4/5 lg:w-3/4 xl:w-2/3`}
                style={{ height: '100vh' }}
            >
                <div className="p-4">
                    <h3 className="text-base font-bold mb-2">Task Details</h3> {/* Reduced font size */}
                    {selectedTask && <p className="text-xs">{selectedTask}</p>} {/* Reduced font size */}
                    <button
                        onClick={closePanel}
                        className="mt-2 px-2 py-1 bg-red-500 text-white rounded shadow-sm hover:bg-red-600 text-xs"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;