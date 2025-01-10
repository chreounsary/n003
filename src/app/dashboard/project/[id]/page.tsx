"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectById } from '@/app/reduxToolkit/project/projectSlice';
import { addTaskToProject, getTasksByProjectId, updateTaskStatus } from '@/app/reduxToolkit/task/taskSlice';
import { useRouter, useParams } from 'next/navigation';

function getTaskDetails(task: any) {
    const taskDetails = task;
    return taskDetails;
}

function Page() {
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const project = useSelector((state: any) => state.project);
    const tasks = useSelector((state: any) => state.task);
    const [error, setError] = useState<string | null>(null); 
    const router = useRouter();
    const { id } = useParams();
    const dispatch: any = useDispatch();

    const handleAddTaskClick = () => {
        setShowForm(!showForm);
        setError(null); 
    };

    const handleTaskNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskName(event.target.value);
        setError(null);
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!taskName.trim()) {
            setError('Task name cannot be empty.');
            return;
        }
        try {
            await dispatch(addTaskToProject({ projectId: project.projects[0].id, title: taskName, userId: 2 }));
            await fetchTasks(project.projects[0].id, 'PENDING');
            setShowForm(!showForm);
            setTaskName('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleTaskClick = (task: string) => {
        setSelectedTask(task);
        setShowDialog(true);
    };

    const handleStartClick = (taskName: string, taskId: number, status: string) => {
        dispatch(updateTaskStatus({ projectId: project.projects[0].id, taskId: taskId, status: status }));
        fetchTasks(project.projects[0].id, status);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setSelectedTask(null);
    };

    const fetchTasks = async (projectId: number, status: string) => {
        try {
            await dispatch(getTasksByProjectId(projectId));
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchProjectById(Number(id)));
            await fetchTasks(Number(id), 'TODO');
        };
        fetchData();
    }, [dispatch, id]);

    return (
        <div className="space-y-4 p-4 bg-gray-100 min-h-screen">
            <header className="bg-white p-4 rounded-lg shadow-md">
                {project.projects[0] ? (
                    <p className="text-2xl font-bold text-gray-900">{project.projects[0].name}</p>
                ) : (
                    <p className="text-sm text-gray-500">No project loaded</p>
                )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['PENDING', 'In Progress', 'Completed', 'Feedback'].map((section, index) => (
                    <div
                        key={index}
                        className={`shadow-md rounded-lg p-4 ${
                            section === 'Completed' ? 'bg-blue-50' : 'bg-white'
                        }`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">{section}</h2>
                            {section === 'To-Do' && (
                                <button
                                    onClick={handleAddTaskClick}
                                    className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-sm"
                                >
                                    Add Task
                                </button>
                            )}
                        </div>
                        {showForm && section === 'To-Do' && (
                            <form onSubmit={handleFormSubmit} className="mb-4">
                                <textarea
                                    value={taskName}
                                    onChange={handleTaskNameChange}
                                    placeholder="Enter task details"
                                    className="p-2 border border-gray-300 rounded w-full mb-2 text-sm"
                                    rows={4}
                                />
                                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-sm"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                        <ul className="space-y-2">
                            {tasks?.tasks.filter((task: any) => task.status === section.toUpperCase().replace(' ', '_')).map((task: any, index: number) => (
                                <li key={index} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                                    <div className="flex-1">
                                        <span onClick={() => handleTaskClick(task.title)} className="cursor-pointer text-sm font-medium text-gray-800">{task.title}</span>
                                        <p className="text-xs text-gray-500">{task.priority}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        {section === 'PENDING' && (
                                            <button onClick={() => handleStartClick(task.name, task.id, 'IN_PROGRESS')} className="text-blue-600 font-medium text-sm">Start</button>
                                        )}
                                        {section === 'In Progress' && (
                                            <button onClick={() => handleStartClick(task.name, task.id, 'COMPLETED')} className="text-yellow-600 font-medium text-sm">Complete</button>
                                        )}
                                        {section === 'Completed' && (
                                            <button className="text-green-600 font-medium text-sm">Reopen</button>
                                        )}
                                        {section === 'Feedback' && (
                                            <button className="text-purple-600 font-medium text-sm">Review</button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full md:w-3/4 lg:w-2/3">
                        {getTaskDetails(selectedTask)}
                        <button
                            onClick={closeDialog}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 text-sm"
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