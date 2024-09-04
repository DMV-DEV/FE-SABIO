import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config.js';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHilos: builder.query({
      query: ( clase_id ) => ({
        url :  `/chat/hilos/` ,
        params: { clase_id },
        
      }),
    }),
  
    createHilo: builder.mutation({
      query: (clase_id) => ({
        url: '/chat/crear_hilo/',
        method: 'POST',
        body: { clase_id },
      }),
    }),
    deleteHilo: builder.mutation({
      query: (hilo_id) => ({
        url: `/chat/eliminar_hilo/`,
        method: 'DELETE',
        body: { hilo_id },
      }),
    }),
    getMessages: builder.query({
      query: ({ hilo_id, page }) => `/hilo/?hilo_id=${hilo_id}&page=${page}`,
    }),
    postMessage: builder.mutation({
      query: ({ hilo_id, message }) => ({
        url: `/preguntale_al_sabio/`,
        method: 'POST',
        body: { hilo_id, message },
      }),
    }),
  }),
});

export const {
  useGetHilosQuery,
  useGetMessagesQuery,
  useCreateHiloMutation,
  useDeleteHiloMutation,
  usePostMessageMutation,
} = chatApi;
