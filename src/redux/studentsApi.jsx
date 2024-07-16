import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl = process.env.REACT_APP_BASE_URL;

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/class/students/?clase_id=',
    }),
    addStudent: builder.mutation({
      query: (newStudent) => ({
        url: '/class/students/?clase_id=',
        method: 'POST',
        body: newStudent,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/class/students/?clase_id=${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/class/students/?clase_id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;