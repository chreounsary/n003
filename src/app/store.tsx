import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import employeesReducer from './reduxToolkit/slice'
import  fetchListData  from './reduxToolkit/listSlice'
import  setFlashMessage from './reduxToolkit/messageSlice'
import projectReducer from './reduxToolkit/project/projectSlice'
import userReducer from './reduxToolkit/user/userSlice'
import taskReducer from './reduxToolkit/task/taskSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        employees: employeesReducer,
        list: fetchListData,
        message: setFlashMessage,
        project: projectReducer,
        user: userReducer,
        task: taskReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch