import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { chatApi } from './chatApi'; 
import { classesApi } from './classesApi';
import { studentsApi } from './studentsApi'




export const store = configureStore({
  reducer: {
    user: userSlice,
    [chatApi.reducerPath]: chatApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer, 
  },
  
  middleware: (gDM) => gDM().concat(chatApi.middleware,classesApi.middleware, studentsApi.middleware),
});