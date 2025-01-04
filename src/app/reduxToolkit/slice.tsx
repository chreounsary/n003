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

// fetch employee
export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async (_: any, { rejectWithValue }: { rejectWithValue: (value: any) => void }) => {
        const response = await fetch('/api/employees');
        const data = await response.json();
        return data;

    }
);

// update employee
export const updateEmployee = createAsyncThunk(
    'data/updateEmployee',
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
        
        builder.addCase(fetchEmployees.pending, (state: any, action: any) => {
                state.status = 'loading';
        })
        builder.addCase(fetchEmployees.fulfilled, (state: any, action: any) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        builder.addCase(fetchEmployees.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

// export const { employees } = employeesSlice.actions;

export default employeesSlice.reducer;
