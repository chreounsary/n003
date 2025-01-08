"use client";
import React, { useState } from 'react';

// Child component to display task details
function TaskDetails({ task }: { task: string | null }) {
    return (
        <div>
            <h3 className="text-base font-bold mb-4">Task Details</h3>
            {task ? <p className="text-xs">{task}</p> : <p className="text-xs">No task selected</p>}
        </div>
    );
}

function Page() {
    const projectName = "PREMARE"; // Replace with dynamic project name if needed
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);

    const handleAddTaskClick = () => {
        setShowForm(!showForm);
    };

    const handleTaskNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setSelectedTask(null);
    };

    return (
        <div className="space-y-2 relative">
            {/* Project Name Header */}
            <header className="text-black p-1 rounded-lg shadow-sm">
                <h1 className="text-base font-bold">{projectName}</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* To-Do Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">To-Do</h2>
                        <button
                            onClick={handleAddTaskClick}
                            className="px-2 py-1 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 text-xs"
                        >
                            Add Task
                        </button>
                    </div>
                    {showForm && (
                        <form onSubmit={handleFormSubmit} className="mb-2">
                            <textarea
                                value={taskName}
                                onChange={handleTaskNameChange}
                                placeholder="Enter task details"
                                className="p-1 border border-gray-300 rounded w-full mb-1 text-xs"
                                rows={4}
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
                                <span onClick={() => handleTaskClick('Task 1')} className="cursor-pointer text-xs">Task 1</span>
                                <button className="text-blue-500 font-medium text-xs">Start</button>
                            </div>
                        </li>
                        <li className="p-2 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 2')} className="cursor-pointer text-xs">Task 2</span>
                                <button className="text-blue-500 font-medium text-xs">Start</button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* In Progress Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">In Progress</h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 3')} className="cursor-pointer text-xs">Task 3</span>
                                <button className="text-yellow-500 font-medium text-xs">Complete</button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Completed Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">Completed</h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-green-50 rounded-lg border border-green-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Task 4')} className="cursor-pointer text-xs">Task 4</span>
                                <button className="text-green-500 font-medium text-xs">Reopen</button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Feedback Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">Feedback</h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Feedback 1')} className="cursor-pointer text-xs">Feedback 1</span>
                                <button className="text-purple-500 font-medium text-xs">Review</button>
                            </div>
                        </li>
                        <li className="p-2 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span onClick={() => handleTaskClick('Feedback 2')} className="cursor-pointer text-xs">Feedback 2</span>
                                <button className="text-purple-500 font-medium text-xs">Review</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Task Detail Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-index-9999">
                    <div className="bg-white p-8 rounded shadow-lg w-full h-full md:w-3/4 lg:w-2/3">
                        <TaskDetails task={selectedTask} />
                        <button
                            onClick={closeDialog}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow-sm hover:bg-red-600 text-xs"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;