import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isObject } from 'lodash';
import { delData, getData, setData } from '../../../services';
import { IUser } from '../../../shared/@types/IUser';
import { LOADING_STATUS } from '../../../shared/enum/LOADING_STATUS';
import { IAuthState } from './types';

const initialState: IAuthState = {
  signed: false,
  user: {} as IUser,
  token: null,
  error: false,
  success: false,
  loading: LOADING_STATUS.IDLE,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: IAuthState) => {
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
  async (payload: IAuthState) => {
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.error = false;
      state.success = false;
      state.loading = LOADING_STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    //* user/signIn
    builder.addCase(signIn.pending, (state) => {
      state.loading = LOADING_STATUS.LOADING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.signed = action.payload.signed;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = LOADING_STATUS.IDLE;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = LOADING_STATUS.IDLE;
    });

    //* user/signOut
    builder.addCase(signOut.pending, (state) => {
      state.loading = LOADING_STATUS.LOADING;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.signed = action.payload.signed;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = LOADING_STATUS.IDLE;
    });
    builder.addCase(signOut.rejected, (state) => {
      state.loading = LOADING_STATUS.IDLE;
    });

    //* user/refreshUser
    builder.addCase(refreshUser.pending, (state) => {
      state.loading = LOADING_STATUS.LOADING;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      if (action.payload) state.user = action.payload.user;
      state.loading = LOADING_STATUS.IDLE;
    });
    builder.addCase(refreshUser.rejected, (state) => {
      state.loading = LOADING_STATUS.IDLE;
    });

    //* user/verifyUser
    builder.addCase(verifyUser.pending, (state) => {
      state.loading = LOADING_STATUS.LOADING;
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.signed = action.payload.signed;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
      state.loading = LOADING_STATUS.IDLE;
    });
    builder.addCase(verifyUser.rejected, (state) => {
      state.loading = LOADING_STATUS.IDLE;
    });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
