import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for CRUD operations
export const fetchProjects = createAsyncThunk('project/fetchProjects', async (userId: number) => {
    const response = await fetch(`/api/projects/user/1`);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return response.json();
});

export const addProjectAsync = createAsyncThunk('project/addProject', async ({ userId, newProject }: { userId: number, newProject: any }) => {
  const response = await fetch(`/api/projects/user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProject),
  });
  return response.json();
});

interface UpdateProjectPayload {
  userId: number;
  id: number;
  data: { [key: string]: any };
}

export const updateProjectAsync = createAsyncThunk('project/updateProject', async ({ userId, id, data }: UpdateProjectPayload) => {
  const response = await fetch(`/api/users/${userId}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const deleteProjectAsync = createAsyncThunk('project/deleteProject', async ({ userId, id }: { userId: number, id: number }) => {
  await fetch(`/api/users/${userId}/projects/${id}`, {
    method: 'DELETE',
  });
  return id;
});

// Slice
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [] as Array<{ id: number; userId: number; [key: string]: any }>,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        const existingProject = state.projects.find(project => project.id === id);
        if (existingProject) {
          Object.assign(existingProject, changes);
        }
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      });
  },
});

export default projectSlice.reducer;