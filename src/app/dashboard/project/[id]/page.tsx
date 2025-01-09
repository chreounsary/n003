"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectById } from '@/app/reduxToolkit/project/projectSlice';
import { addTaskToProject, getTasksByProjectId, updateTaskStatus } from '@/app/reduxToolkit/task/taskSlice';
import { useRouter, useParams } from 'next/navigation';
// import TaskDetails from '@/components/TaskDetails'; // Ensure this path is correct or comment it out if not used
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
            await dispatch(addTaskToProject({ projectId: project.projects[0].id, title: taskName, userId: project.projects[0].userId }));
            await fetchTasks(project.projects[0].id, 'TODO'); // Fetch tasks after adding
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
        // set refresh here
        // or use a debounce function to delay the refresh
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
            await fetchTasks(Number(id), 'TODO'); // Initial fetch for tasks with status 'TODO'
        };
        fetchData();
    }, [dispatch, id]);

    return (
        <div className="space-y-2 relative">
            {/* Project Name Header */}
            <header className="text-black p-1 rounded-lg shadow-sm">
                {project.projects[0] ? <p className="text-2xl font-bold">{project.projects[0].name}</p> : <p className="text-xs">No project loaded</p>}
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
                            {error && <p className="text-red-500 text-xs mb-1">{error}</p>}
                            <button
                                type="submit"
                                className="px-2 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 text-xs"
                            >
                                Submit
                            </button>
                        </form>
                    )}


                    {/* <button
                        onClick={() => fetchTasks(Number(id), 'PENDING')}
                        className="px-2 py-1 bg-yellow-500 text-white rounded shadow-sm hover:bg-yellow-600 text-xs"
                    >
                        Refresh
                    </button> */}
                    <ul className="space-y-2">
                        {tasks?.tasks.filter((task: any) => task.status === 'PENDING').map((task: any, index: number) => (
                            <li key={index} className="p-2 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <span onClick={() => handleTaskClick(task.title)} className="cursor-pointer text-xs">{task.title}</span>
                                    <button onClick={() => handleStartClick(task.name, task.id, 'IN_PROGRESS')} className="text-blue-500 font-medium text-xs">Start</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-red-600"> {task.priority}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* In Progress Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">In Progress</h2>
                    {/* <button
                        onClick={() => fetchTasks(Number(id), 'IN_PROGRESS')}
                        className="px-2 py-1 bg-yellow-500 text-white rounded shadow-sm hover:bg-yellow-600 text-xs"
                    >
                        Refresh
                    </button> */}
                    <ul className="space-y-2">
                        {tasks?.tasks.filter((task: any) => task.status === 'IN_PROGRESS').map((task: any, index: number) => (
                            <li key={index} className="p-2 bg-yellow-50 rounded-lg border border-yellow-300 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-between items-center">
                                        <span onClick={() => handleTaskClick(task.title)} className="cursor-pointer text-xs">{task.title}</span>
                                    </div>
                                    <button onClick={() => handleStartClick(task.name, task.id, 'COMPLETED')}  className="text-yellow-500 font-medium text-xs">Complete</button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-red-600"> {task.priority}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Completed Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">Completed</h2>
                    {/* <button
                        onClick={() => fetchTasks(Number(id), 'COMPLETED')}
                        className="px-2 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 text-xs"
                    >
                        Refresh
                    </button> */}
                    <ul className="space-y-2">
                        {tasks?.tasks.filter((task: any) => task.status === 'COMPLETED').map((task: any, index: number) => (
                            <li key={index} className="p-2 bg-green-50 rounded-lg border border-green-300 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <span onClick={() => handleTaskClick(task.title)} className="cursor-pointer text-xs">{task.title}</span>
                                    <button className="text-green-500 font-medium text-xs">Reopen</button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-red-600"> {task.priority}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Feedback Section */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-2">Feedback</h2>
                    <button
                        onClick={() => fetchTasks(Number(id), 'FEEDBACK')}
                        className="px-2 py-1 bg-purple-500 text-white rounded shadow-sm hover:bg-purple-600 text-xs"
                    >
                        Refresh
                    </button>
                    <ul className="space-y-2">
                        {tasks?.tasks.filter((task: any) => task.status === 'FEEDBACK').map((task: any, index: number) => (
                            <li key={index} className="p-2 bg-purple-50 rounded-lg border border-purple-300 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <span onClick={() => handleTaskClick(task.title)} className="cursor-pointer text-xs">{task.title}</span>
                                    <button className="text-purple-500 font-medium text-xs">Review</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Task Detail Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg w-full h-full md:w-3/4 lg:w-2/3">
                        {getTaskDetails(selectedTask)}
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