import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';
import { apiSlice } from '../services/api/apiSlice';
import authReducer, { IAuthState } from './modules/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export interface RootState {
  readonly auth: IAuthState;
}

export const useTypedSelector = createSelectorHook();
export const useTypedDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
