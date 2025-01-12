import type {SerializedError} from '@reduxjs/toolkit';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import type {AxiosError, AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import axios from 'axios';

import {ResponseError} from '@app/shared';

import {getData} from './asyncStorage';
import {settings} from './config';

interface AxiosBaseQueryProps {
  url: string;
  method: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: Partial<AxiosRequestHeaders>;
}

export type BaseQueryFnProps = BaseQueryFn<
  AxiosBaseQueryProps,
  unknown,
  SerializedError
>;

export type MockResponseProps<T> = [number | AxiosRequestConfig, T];

type LogoutHandler = () => void;
let logoutHandler: LogoutHandler | null = null;

export const setLogoutHandler = (handler: LogoutHandler) => {
  logoutHandler = handler;
};

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async config => ({
    ...config,
    baseURL: settings.apiUrl,
    timeout: 45000,
    headers: {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(!config.url?.startsWith('auth') &&
        !config.url?.startsWith('phone-tokens') && {
          Authorization: `Bearer ${await getData('access_token')}`,
        }),
    } as AxiosRequestHeaders,
  }),
  error => Promise.reject(error),
);

axiosApiInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => Promise.reject(error),
);

export const axiosBaseQuery =
  (
    {baseApiMethodUrl}: {baseApiMethodUrl: string} | undefined = {
      baseApiMethodUrl: '',
    },
  ): BaseQueryFnProps =>
  async props => {
    try {
      const {data} = await axiosApiInstance({
        ...props,
        data: props.body,
        headers: props.headers as AxiosRequestHeaders,
        url: `${baseApiMethodUrl}/${props.url}`,
      });

      return {data};
    } catch (axiosError) {
      const err = axiosError as AxiosError<ResponseError>;

      const error: SerializedError = {
        name: err.name,
        code:
          String(err.response?.data.statusCode) ?? String(err.response?.status),
        stack: err.stack ?? undefined,
        message: err.response?.data.message ?? err.message,
      };

      if (
        !err.config?.url?.startsWith('auth') &&
        !err.config?.url?.startsWith('phone-tokens') &&
        err.response?.status === 401 &&
        logoutHandler
      ) {
        logoutHandler();
      }

      return {
        error,
      };
    }
  };

export default axiosApiInstance;
