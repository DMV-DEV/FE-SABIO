import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://sabiobackend-1a734c145440.herokuapp.com',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const classesApi = createApi({
  reducerPath: 'classesApi',
  baseQuery,
  endpoints: (builder) => ({
    getClassesByEducator: builder.query({
      query: (profesorId) => `/educator/clases/?profesor_id=${profesorId}`,
    }),
    addClass: builder.mutation({
      query: (newClass) => ({
        url: '/educator/clases/',
        method: 'POST',
        body: newClass,
      }),
    }),
  }),
});

export const { useGetClassesByEducatorQuery, useAddClassMutation } = classesApi;
