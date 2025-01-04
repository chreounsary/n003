const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit');


interface Employee {
    id: string;
    name: string;
}

const startingState = {
    data: [],
    status: 'idle',
    error: null,
};

export const insertEmployee = createAsyncThunk(
    'data/insertEmployee',
    async (payload: Employee) => {
        try {
            const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to insert data');
        }

        const data = await response.json();
        return data;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }
);

// update employee
export const updateEmployees = createAsyncThunk(
    'data/updateEmployees',
    async (payload: Employee) => {
        try {
            const response = await fetch(`/api/employees/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }
);

// delete employee
export const deleteEmployees = createAsyncThunk(
    'data/deleteEmployee',
    async (id: string) => {
        try {
            const response = await fetch(`/api/employees/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete data');
            }

            const data = await response.json();
            return data;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }
);

const employeesSlice = createSlice({
    name: 'employees',// name of the slice
    initialState: startingState,
    
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(insertEmployee.pending, (state: any, action: any) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(insertEmployee.fulfilled, (state: any, action: any) => {
            state.data.push(action.payload);

        });
        builder.addCase(insertEmployee.rejected, (state: any, action: any) => {
            console.error('Error:', action.error);
        });
        builder.addCase(updateEmployees.pending, (state: any, action: any) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(updateEmployees.fulfilled, (state: any, action: any) => {
            const index = state.data.findIndex((item: any) => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
        builder.addCase(updateEmployees.rejected, (state: any, action: any) => {
            console.error('Error:', action.error);
        });
        builder.addCase(deleteEmployees.pending, (state: any, action: any) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(deleteEmployees.fulfilled, (state: any, action: any) => {
            state.data = state.data.filter((item: any) => item.id !== action.payload.id);
        });
        builder.addCase(deleteEmployees.rejected, (state: any, action: any) => {
            console.error('Error:', action.error);
        });
    },
});

export default employeesSlice.reducer;
