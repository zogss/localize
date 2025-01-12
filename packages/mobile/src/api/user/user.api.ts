import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {settings} from '@app/services';

import {
  GetMeRequest,
  GetMeResponse,
  RegisterRequest,
  RegisterResponse,
} from './user.types';

export default createApi({
  baseQuery: fetchBaseQuery({baseUrl: settings.apiUrl}),
  reducerPath: 'userApi',
  endpoints: build => ({
    register: build.query<RegisterResponse, RegisterRequest>({
      query: req => ({
        url: '/users',
        method: 'post',
        body: {
          firstName: req.firstName,
          lastName: req.lastName,
          username: req.username,
          phone: req.phone.replace(/\D/g, ''),
        },
      }),
    }),
    getMe: build.query<GetMeResponse, GetMeRequest>({
      query: req => ({
        url: '/users',
        method: 'get',
        params: {
          id: req.id,
        },
      }),
    }),
  }),
});
