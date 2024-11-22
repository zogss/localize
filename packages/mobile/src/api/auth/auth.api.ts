import { settings } from '@app/services';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ConfirmWppRequest,
  SendWppCodeRequest,
  SignInRequest,
  SignInResponse,
} from './auth.types';

export default createApi({
  baseQuery: fetchBaseQuery({ baseUrl: settings.apiUrl }),
  reducerPath: 'authApi',
  endpoints: (build) => ({
    sendWppCode: build.query<void, SendWppCodeRequest>({
      query: (req) => ({
        url: '/phone-tokens',
        method: 'post',
        body: { phone: req.phone.replace(/\D/g, '') },
      }),
    }),
    confirmWppCode: build.query<void, ConfirmWppRequest>({
      query: (req) => ({
        url: '/phone-tokens',
        method: 'put',
        body: {
          phone: req.phone.replace(/\D/g, ''),
          code: req.code,
        },
      }),
    }),
    login: build.query<SignInResponse, SignInRequest>({
      query: (req) => ({
        url: '/auth/login',
        method: 'post',
        body: {
          phone: req.phone.replace(/\D/g, ''),
          code: req.code,
        },
      }),
    }),
  }),
});
