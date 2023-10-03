import { settings } from '@app/services';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetMeRequest, GetMeResponse, RegisterRequest } from './user.types';

export default createApi({
  baseQuery: fetchBaseQuery({ baseUrl: settings.apiUrl }),
  reducerPath: 'userApi',
  endpoints: (build) => ({
    register: build.query<void, RegisterRequest>({
      query: (req) => ({
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
      query: (req) => ({
        url: '/users',
        method: 'get',
        params: {
          id: req.id,
        },
      }),
    }),
  }),
});
