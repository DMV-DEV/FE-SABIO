import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../app.config.js';
import { addUser, removeUser, updateAccessToken } from './userSlice';
import { message } from 'antd';


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().user.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/token/',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response, meta, arg) => {
        const {
          access,
          refresh,
          id,
          username,
          first_name,
          last_name,
          email,
          profesion,
          fecha_nacimiento,
          sexo,
          tipo_usuario,
          has_temporary_password,
          foto,
        } = response;
        return {
          access,
          refresh,
          id,
          username,
          first_name,
          last_name,
          email,
          profesion,
          fecha_nacimiento,
          sexo,
          tipo_usuario,
          has_temporary_password,
          foto,
          ...arg,
        };
      },
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          dispatch(addUser({ name: data.first_name, email, id: data.id, accessToken: data.access, refreshToken: data.refresh }));
          message.success('Login successful')
        } catch (error) {
          const errorMessage = error?.error?.data?.detail || 'An error occurred';
          message.error(errorMessage);
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
          localStorage.setItem('accessToken', data.access);
          dispatch(updateAccessToken(data.access));
        } catch (error) {
          message.error('Failed to refresh access token:', error);
          throw error; 
        }
      }
    }),
    
    register: builder.mutation({
      query: (credentials) => ({
        url: '/api/register/student/',
        method: 'POST',
        body: credentials,
      })
    })
  })
  
  
});

export const { useLoginMutation, useRefreshAccessTokenMutation, useRegisterMutation } = authApi;