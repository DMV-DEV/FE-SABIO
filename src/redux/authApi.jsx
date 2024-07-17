// src/redux/authApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config.ts';
import { addUser, removeUser, updateAccessToken } from './userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/token/',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response, meta, arg) => {
        const { access, refresh } = response;
        return { access, refresh, ...arg };
      },
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser({ name: email, email, id: '', accessToken: data.access, refreshToken: data.refresh }));
        } catch (error) {
          console.error('Failed to login:', error);
        }
      }
    }),
    refreshAccessToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/api/token/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      }),
      transformResponse: (response) => {
        const { access } = response;
        return { access };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateAccessToken(data.access));
        } catch (error) {
          console.error('Failed to refresh access token:', error);
        }
      }
    })
  })
});

export const { useLoginMutation, useRefreshAccessTokenMutation } = authApi;
