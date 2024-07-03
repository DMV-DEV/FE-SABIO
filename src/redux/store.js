import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { chatApi } from './chatApi'; 
import { classesApi } from './classesApi';




export const store = configureStore({
  reducer: {
    user: userSlice,
    [chatApi.reducerPath]: chatApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
  },
  
  middleware: (gDM) => gDM().concat(chatApi.middleware,classesApi.middleware),
});