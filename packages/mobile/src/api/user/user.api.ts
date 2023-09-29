import { axiosBaseQuery } from '@app/services';
import { createApi } from '@reduxjs/toolkit/query/react';
import { RegisterRequest } from './user.types';

export default createApi({
  baseQuery: axiosBaseQuery({ baseApiMethodUrl: 'user' }),
  reducerPath: 'userApi',
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (req) => ({
        url: '',
        method: 'POST',
        body: {
          firstName: req.firstName,
          lastName: req.lastName,
          username: req.username,
          phone: req.phone.replace(/\D/g, ''),
        },
      }),
    }),
  }),
});
