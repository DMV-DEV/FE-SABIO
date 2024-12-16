import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { chatApi } from './chatApi'; 
import { classesApi } from './classesApi';
import { authApi } from './authApi';
import { studentsApi } from './studentsApi';
import { documentsApi } from './documentsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountApi } from './accountApi';
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
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      chatApi.middleware,
      classesApi.middleware,
      accountApi.middleware,
      authApi.middleware,
      studentsApi.middleware,
      documentsApi.middleware 
    ),
});

setupListeners(store.dispatch);
