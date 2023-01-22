import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    await AsyncStorage.setItem('user:token', JSON.stringify(payload.token));
    await AsyncStorage.setItem('user:user', JSON.stringify(payload.user));

    return {
      signed: true,
      user: payload.user,
      token: payload.token,
    };
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await AsyncStorage.removeItem('user:token');
  await AsyncStorage.removeItem('user:user');

  return {
    signed: false,
    user: {} as IUser,
    token: null,
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
    refreshUser(state, action: PayloadAction<IAuthState>) {
      state.user = action.payload.user;
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
  },
});

export const { resetAuthState, refreshUser } = authSlice.actions;

export default authSlice.reducer;
