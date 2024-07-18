import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config';

export const classesApi = createApi({
    reducerPath: 'classesApi',
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
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
