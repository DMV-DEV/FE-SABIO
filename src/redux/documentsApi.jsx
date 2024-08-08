import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
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
    getDocumentsByClass: builder.query({
      query: (clase_id) => ({
        url: 'documents/list_documents/class/',
        params: { clase_id },
      }),
    }),
    getDocumentsByHilo: builder.query({
      query: (hilo_id) => ({
        url: 'documents/list_documents/chat/',
        params: { hilo_id },
      }),
    }),
    getDocumentById: builder.query({
      query: (document_id) => ({
        url: 'documents/',
        params: { document_id },
      }),
    }),
    uploadDocuments: builder.mutation({
      query: ({ clase_id, hilo_id, archivo }) => {
        const formData = new FormData();
        if (clase_id) formData.append('clase_id', clase_id);
        if (hilo_id) formData.append('hilo_id', hilo_id);
        formData.append('archivo', archivo);

        return {
          url: 'documents/',
          method: 'POST',
          body: formData,
        };
      },
    }),
    deleteDocument: builder.mutation({
      query: (documento_id) => ({
        url: 'documents/eliminar_documento/',
        method: 'DELETE',
        body: { documento_id },
      }),
    }),
  }),
});

export const {
  useGetDocumentsByClassQuery,
  useGetDocumentsByHiloQuery,
  useGetDocumentByIdQuery,
  useUploadDocumentsMutation,
  useDeleteDocumentMutation,
} = documentsApi;
