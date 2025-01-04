import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data employees
export const fetchListData = createAsyncThunk(
    'list/fetchListData',
    async () => {
        try {
            const response = await fetch('/api/employees');
            const data = await response.json();
         
            return data;
        } catch (error) {
            return error;
        }
    }
);

const listSlice = createSlice({
    name: 'list',
    initialState: {
        data: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchListData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default listSlice.reducer;
