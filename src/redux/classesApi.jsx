import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://sabiobackend-1a734c145440.herokuapp.com',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    console.log(token);
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
