import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const classesApi = createApi({
    reducerPath: 'classesApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000',
    }),
    endpoints: (builder) => ({
      getClassesByEducator: builder.query({
        query: (profesorId) => `/educator/clases/?profesor_id=${profesorId}`,
        providesTags: ['Classes'],
      }),
      addClass: builder.mutation({
        query: (newClass) => ({
          url: '/educator/clases/',
          method: 'POST',
          body: newClass,
        }),
        invalidatesTags: ['Classes'],
      }),
    }),
  });
  
  export const {
    useGetClassesByEducatorQuery,
    useAddClassMutation,
  } = classesApi;
  export default classesApi.reducer;
