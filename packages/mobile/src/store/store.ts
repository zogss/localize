import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import type {
  AnyAction,
  ConfigureStoreOptions,
  Dispatch,
  TypedStartListening,
} from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import { authApi } from '@app/api';
import { authSlice } from './auth';
import { rentSlice } from './rent';

const listenerMiddlewareInstance = createListenerMiddleware();

const middlewares: any = [
  authApi.middleware,
  listenerMiddlewareInstance.middleware,
];

export const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice.reducer,
  rent: rentSlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = Dispatch<AnyAction | any>;
export type Selector<S> = (state: RootState) => S;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const rootReducer = (state: RootState, action: AnyAction) =>
  combinedReducer(action.type !== 'logout' ? state : undefined, action);

export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;

export const createStore = (options?: Partial<ConfigureStoreOptions>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false }).concat([...middlewares]),
    ...options,
  });

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
