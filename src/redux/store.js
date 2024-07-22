import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { chatApi } from './chatApi'; 
import { classesApi } from './classesApi';
import { authApi } from './authApi';
import { studentsApi } from './studentsApi';
import { documentsApi } from './documentsApi'; // Importa documentsApi
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [chatApi.reducerPath]: chatApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer, // Agrega documentsApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      chatApi.middleware,
      classesApi.middleware,
      authApi.middleware,
      studentsApi.middleware,
      documentsApi.middleware // Agrega documentsApi.middleware
    ),
});

setupListeners(store.dispatch);
