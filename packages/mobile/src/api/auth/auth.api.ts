import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services';
import {
  ConfirmWppRequest,
  SendWppCodeRequest,
  SignInRequest,
} from './auth.types';

export default createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    sendWppCode: builder.mutation<void, SendWppCodeRequest>({
      query: (req) => ({
        url: '/phone-tokens',
        method: 'POST',
        body: { phone: req.phone.replace(/\D/g, '') },
      }),
    }),
    confirmWppCode: builder.mutation<void, ConfirmWppRequest>({
      query: (req) => ({
        url: '/phone-tokens',
        method: 'PUT',
        body: {
          phone: req.phone.replace(/\D/g, ''),
          code: req.code,
        },
      }),
    }),
    login: builder.mutation<any, SignInRequest>({
      query: (req) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          phone: req.phone.replace(/\D/g, ''),
          code: req.code,
        },
      }),
    }),
  }),
});
