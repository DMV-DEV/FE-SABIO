import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery,
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (clase_id) => `documents/list_documents/class/?clase_id=${clase_id}`,
    }),
    getDocumentsByHilo: builder.query({
      query: (hilo_id) => `documents/list_documents/chat/?hilo_id=${hilo_id}`,
    }),
    uploadDocuments: builder.mutation({
      query: ({ clase_id, hilo_id, archivo }) => {
        const formData = new FormData();
        if (clase_id) formData.append('clase_id', clase_id);
        if (hilo_id) formData.append('hilo_id', hilo_id);
        formData.append('archivo', archivo);

        return {
          url: '/documents/',
          method: 'POST',
          body: formData,
        };
      },
    }),
    deleteDocument: builder.mutation({
      query: (documento_id) => ({
        url: '/documents/eliminar_documento/',
        method: 'DELETE',
        body: { documento_id },
      }),
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentsByHiloQuery,
  useUploadDocumentsMutation,
  useDeleteDocumentMutation,
} = documentsApi;

