import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../shared/@types/IUser';
import { LOADING_STATUS } from '../../../shared/enum/LOADING_STATUS';

export type IAuthState = {
  readonly signed: boolean;
  readonly user?: IUser;
  readonly token?: string | null;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly loading?: LOADING_STATUS;
};

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
    await AsyncStorage.setItem('@user_token', JSON.stringify(payload.token));
    await AsyncStorage.setItem('@user_user', JSON.stringify(payload.user));

    return {
      signed: true,
      user: payload.user,
      token: payload.token,
    };
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await AsyncStorage.removeItem('@user_token');
  await AsyncStorage.removeItem('@user_user');

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

    await AsyncStorage.setItem('@user_user', JSON.stringify(payload.user));
    await AsyncStorage.setItem('@user_token', JSON.stringify(payload.token));

    return {
      signed: true,
      user: payload.user,
      token: payload.token,
    };
  },
);

export const verifyUser = createAsyncThunk('auth/verifyUser', async () => {
  const user = await AsyncStorage.getItem('@user_user');
  const token = await AsyncStorage.getItem('@user_token');

  if (!user || !token)
    return {
      signed: false,
      user: {} as IUser,
      token: null,
    };

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
    // user/signIn
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
    // user/signOut
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
    // user/refreshUser
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
    // user/verifyUser
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
