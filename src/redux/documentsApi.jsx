import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://sabiobackend-1a734c145440.herokuapp.com', // URL base correcta
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
      query: (claseId) => `documents/list_documents/class/?clase_id=2`, // Endpoint actualizado con parámetro de consulta
    }),
  }),
});

export const { useGetDocumentsQuery } = documentsApi;

