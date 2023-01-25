import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';
import { apiSlice } from '../services/api/apiSlice';
import authReducer from './modules/auth';
import { IAuthState } from './modules/auth/types';
import rentReducer from './modules/rent';
import { IRentState } from './modules/rent/types';

const rootReducer = combineReducers({
  auth: authReducer,
  rent: rentReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export interface RootState {
  readonly auth: IAuthState;
  readonly rent: IRentState;
}

export const useTypedSelector = createSelectorHook();
export const useTypedDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
