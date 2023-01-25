import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthUser } from '../../shared/@types/IAuthUser';

const headers = {
  'Content-Type': 'application/json',
};

type IAuth = {
  phone: IAuthUser['phoneNumber'];
  code: IAuthUser['phoneCode'];
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.108:3333' }),
  endpoints: (builder) => ({
    sendPhoneCode: builder.mutation<any, IAuth['phone']>({
      query: (phone) => ({
        url: '/phone-tokens',
        method: 'POST',
        body: { phone: phone.replace(/\D/g, '') },
        headers: headers,
      }),
    }),
    validatePhoneCode: builder.mutation<any, IAuth>({
      query: (user) => ({
        url: '/phone-tokens',
        method: 'PUT',
        body: {
          phone: user.phone.replace(/\D/g, ''),
          code: user.code,
        },
        headers: headers,
      }),
    }),
    signUpUser: builder.mutation<any, IAuthUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          phone: user.phoneNumber.replace(/\D/g, ''),
        },
        headers: headers,
      }),
    }),
    signInUser: builder.mutation<any, IAuth>({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          phone: user.phone.replace(/\D/g, ''),
          code: user.code,
        },
        headers: headers,
      }),
    }),
  }),
});

export const {
  useSendPhoneCodeMutation,
  useValidatePhoneCodeMutation,
  useSignUpUserMutation,
  useSignInUserMutation,
} = apiSlice;
