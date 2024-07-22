import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { chatApi } from './chatApi'; 
import { classesApi } from './classesApi';
import { authApi } from './authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountApi } from './accountApi';
import { studentsApi } from './studentsApi'
import classesSlice  from './classesSlice';



export const store = configureStore({
  reducer: {
    user: userSlice,
    classes: classesSlice,
    [chatApi.reducerPath]: chatApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer, 
  },
  
  middleware: (gDM) => gDM().concat(chatApi.middleware,classesApi.middleware, authApi.middleware, accountApi.middleware, studentsApi.middleware),
});

setupListeners(store.dispatch);