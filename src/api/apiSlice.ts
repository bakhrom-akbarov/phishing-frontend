import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ListPhishingAttemptsRequest,
  ListPhishingAttemptsResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest
} from "./apiSlice.types";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<void, RegisterRequest>({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
    }),

    listPhishingAttempts: builder.query<
      ListPhishingAttemptsResponse,
      ListPhishingAttemptsRequest
    >({
      query: ({ page, limit }) => ({
        url: '/phishing',
        params: { limit, page }
      }),
    }),

    sendPhishingEmail: builder.mutation<void, { email: string }>({
      query: (email) => ({
        url: '/phishing/send',
        method: 'POST',
        body: email,
      }),
    }),

    sendClickEvent: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/phishing/click/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListPhishingAttemptsQuery,
  useSendPhishingEmailMutation,
  useSendClickEventMutation,
} = apiSlice;
