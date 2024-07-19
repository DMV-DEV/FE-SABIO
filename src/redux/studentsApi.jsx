import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../app.config.ts";

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

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/class/students/?clase_id=2",
    }),
    addStudent: builder.mutation({
      query: (newStudent) => ({
        url: "/class/students/?clase_id=",
        method: "POST",
        body: newStudent,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/class/students/?clase_id=${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/class/students/?clase_id=${id}`,
        method: "DELETE",
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
