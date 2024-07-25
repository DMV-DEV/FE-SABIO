import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery,
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (classId) => `/class/students/?clase_id=${classId}`,
    }),
    addStudent: builder.mutation({
      query: ({ classId, ...newStudent }) => ({
        url: `/class/students/?clase_id=${classId}`,
        method: "POST",
        body: newStudent,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ classId, id, ...rest }) => ({
        url: `/class/students/?clase_id=${classId}&student_id=${id}`, // Asegúrate de que el endpoint sea correcto para la actualización
        method: "PUT",
        body: rest,
      }),
    }),
    deleteStudent: builder.mutation({
      query: ({ classId, id }) => ({
        url: `/class/students/?clase_id=${classId}&student_id=${id}`, // Asegúrate de que el endpoint sea correcto para la eliminación
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

