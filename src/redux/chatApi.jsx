import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config.ts'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getHilos: builder.query({
      query: () => '/chat/hilos/',
    }),
    createHilo: builder.mutation({
      query: () => ({
        url: '/chat/crear_hilo/',
        method: 'POST',
      }),
    }),
    deleteHilo: builder.mutation({
      query: () => ({
        url: `/chat/eliminar_hilo/`,
        method: 'DELETE',
      }),
    }),
    getMessages: builder.query({
      query: (hilo_id, hilo_page) => `hilo/?hilo_id=${hilo_id}&page=${hilo_page}`, 
    }),
    postMessage: builder.mutation({
      query: ({  message }) => ({
        url: `/preguntale_al_sabio/`,
        method: 'POST',
        body: { message },
      }),
    }),
    getDocuments: builder.query({
      query: (hilo_id) => `/documents/list_documents/chat/?hilo_id=${hilo_id}`, 
    }),
  }),
});

export const { useGetHilosQuery, useCreateHiloMutation, useDeleteHiloMutation, useGetMessagesQuery, usePostMessageMutation, useGetDocumentsQuery } = chatApi;