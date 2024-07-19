import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { chatApi } from './chatApi'; 
import { classesApi } from './classesApi';
import { authApi } from './authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { studentsApi } from './studentsApi'



export const store = configureStore({
  reducer: {
    user: userSlice,
    [chatApi.reducerPath]: chatApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer, 
  },
  
  middleware: (gDM) => gDM().concat(chatApi.middleware,classesApi.middleware, authApi.middleware, studentsApi.middleware),
});

setupListeners(store.dispatch);