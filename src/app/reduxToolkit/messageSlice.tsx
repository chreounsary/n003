
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlashMessageState {
    message: string;
    type: 'success' | 'error' | 'info';
}

const initialState: FlashMessageState = {
    message: '',
    type: 'info',
};

const flashMessageSlice = createSlice({
    name: 'flashMessage',
    initialState,
    reducers: {
        setFlashMessage(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearFlashMessage(state) {
            state.message = '';
            state.type = 'info';
        },
    },
});

export const { setFlashMessage, clearFlashMessage } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;
