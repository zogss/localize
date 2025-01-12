import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from '@app/services';

import {
  GetMeRequest,
  GetMeResponse,
  RegisterRequest,
  RegisterResponse,
} from './user.types';

export default createApi({
  baseQuery: axiosBaseQuery({baseApiMethodUrl: 'users'}),
  reducerPath: 'userApi',
  endpoints: build => ({
    register: build.query<RegisterResponse, RegisterRequest>({
      query: req => ({
        url: '',
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
      query: () => ({
        url: 'me',
        method: 'get',
      }),
    }),
  }),
});
