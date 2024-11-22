import { authApi } from '@app/api';
import { IUser } from '@app/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AuthState, InitFulfilledProps } from './auth.types';

export const initialState: AuthState = {
  isReady: false,
  isAuthenticated: false,
  phoneNumber: '',
  user: {} as IUser,
};

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
      isAuthenticated: !!payload?.accessToken,
      phoneNumber: payload?.phoneNumber,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.sendWppCode.matchFulfilled,
      (state, { meta }) => ({
        ...state,
        phoneNumber: meta.arg.originalArgs.phone,
      }),
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        user: payload?.user,
      }),
    );
  },
});

export const selectAuth = ({ auth }: RootState) => auth;
export const { onInitFulfilled, onReset } = authSlice.actions;
