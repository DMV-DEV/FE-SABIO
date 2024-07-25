import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config.js'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery,
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: ({ username, email }) => ({
        url: '/api/user/update/',
        method: 'PUT',
        body: { username, email },
      }),
    }),
    uploadProfilePicture: builder.mutation({
      query: (imageUrl) => ({
        url: '/upload/profile-picture/',
        method: 'POST',
        body: imageUrl,
      }),
    }),
    getProfilePictureUrl: builder.query({
      query: (userId) => ({
        url: '/upload/profile-picture/',
        method: 'GET',
        params: { user_id: 10 },
      }),
    }),
  }),
});

export const { useUpdateUserInfoMutation, useUploadProfilePictureMutation, useGetProfilePictureUrlQuery } = accountApi;