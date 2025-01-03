const { createSlice, nanoid } = require('@reduxjs/toolkit');

interface Employee {
    id: string;
    name: string;
}

const startingState = {
        employees: [],
};

const slice = createSlice({
    name: 'employees',// name of the slice
    initialState: startingState,
    reducers: {
        addEmployee(state: { employees: Employee[] }, action: { type: string; name: string }) {
            const data: Employee = {
                id: nanoid(),
                name: action.name,
            };
            state.employees.push(data);
        },
    }
});

export const { addEmployee } = slice.actions;

export default slice.reducer;