import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//add task to project
export const addTaskToProject = createAsyncThunk(
    'task/addTaskToProject',
    async ({ projectId, title, userId }: { projectId: number, title: string, userId: number }) => {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, userId, projectId }),
        });
        return response.json();
    },
);
//get all tasks by project id
export const getTasksByProjectId = createAsyncThunk(
    'task/getTasksByProjectId',
    async (projectId: number) => {
        const response = await fetch(`/api/projects/${projectId}/tasks`);
        return response.json();
    },
);

//updateTaskStatus by project id and status
export const updateTaskStatus = createAsyncThunk(
    'task/updateTaskStatus',
    async ({ projectId, taskId, status }: { projectId: number, taskId: number, status: string }) => {
        const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({projectId, taskId, status}),
        });
        return response.json();
    }
);

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTaskToProject.fulfilled, (state: any, action: any) => {
                // Update the state with the new task
                state.tasks.push(action.payload);
            })
            .addCase(getTasksByProjectId.fulfilled, (state: any, action: any) => {
                // Update the state with the new tasks
                state.tasks = action.payload;
            });
    },
});
export default taskSlice.reducer;