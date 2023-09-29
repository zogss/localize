import { authApi } from '@app/api';
import { delData, getData, setData } from '@app/services';
import { IUser } from '@app/shared/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isObject } from 'lodash';
import { RootState } from '..';
import { AuthState, InitFulfilledProps } from './auth.types';

export const initialState: AuthState = {
  isReady: false,
  isAuthenticated: false,
  isFirstAccess: false,
  phoneNumber: '',
  user: {} as IUser,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: AuthState) => {
    await setData('@user_token', JSON.stringify(payload.token));
    await setData('@user_user', JSON.stringify(payload.user));

    return {
      signed: true,
      user: payload.user,
      token: payload.token,
    };
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await delData('@user_token');
  await delData('@user_user');

  return {
    signed: false,
    user: {} as IUser,
    token: null,
  };
});

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (payload: AuthState) => {
    if (!payload.user || !payload.token)
      return {
        signed: false,
        user: {} as IUser,
        token: null,
      };

    await setData('@user_user', JSON.stringify(payload.user));
    await setData('@user_token', JSON.stringify(payload.token));

    return {
      signed: true,
      user: payload.user,
      token: payload.token,
    };
  },
);

export const verifyUser = createAsyncThunk('auth/verifyUser', async () => {
  const user = await getData('@user_user');
  const token = await getData('@user_token');

  const emptyData = {
    signed: false,
    user: {} as IUser,
    token: null,
  };

  if (!user || !token) return emptyData;

  if (!isObject(user) || !isObject(token)) {
    return emptyData;
  }

  return {
    signed: true,
    user: JSON.parse(user),
    token: JSON.parse(token),
  };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onReset: () => ({ ...initialState, isReady: true }),
    onInitFulfilled: (
      state,
      { payload }: PayloadAction<InitFulfilledProps>,
    ) => ({
      ...state,
      isReady: true,
      isFirstAccess: false,
      isAuthenticated: !!payload?.accessToken,
      phoneNumber: payload?.phoneNumber,
    }),
    onFirstAccess: (state: AuthState) => ({
      ...state,
      isFirstAccess: true,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { meta }) => {
        console.log('extra reducer login matchFulfilled: ', state, meta);
        return { ...state, ...meta.arg.originalArgs };
      },
    );
  },
});

export const selectAuth = ({ auth }: RootState) => auth;
export const { onInitFulfilled, onFirstAccess, onReset } = authSlice.actions;
