import type { SerializedError } from '@reduxjs/toolkit';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import axios from 'axios';
import { settings } from './config';

interface AxiosBaseQueryProps {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
}

export type BaseQueryFnProps = BaseQueryFn<
  AxiosBaseQueryProps,
  unknown,
  SerializedError
>;

export type MockResponseProps<T> = [number | AxiosRequestConfig, T];

const axiosApiInstance = axios.create({ baseURL: settings.apiUrl });

axiosApiInstance.interceptors.request.use(
  async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // ...(!config.url?.startsWith('auth') && {
      //   Authorization: `Bearer ${await getData('access_token')}`,
      // }),
    } as AxiosRequestHeaders,
  }),
  (error) => Promise.reject(error),
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error),
);

export const axiosBaseQuery =
  ({ baseApiMethodUrl = '' }): BaseQueryFnProps =>
  async (props) => {
    try {
      const result = await axiosApiInstance({
        ...props,
        url: `${baseApiMethodUrl}/${props.url}`,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ message: string }>;

      return {
        error: {
          name: err.name,
          code: err.response?.status.toString(),
          message: err.response?.data.message ?? err.message,
        },
      };
    }
  };

export default axiosApiInstance;
