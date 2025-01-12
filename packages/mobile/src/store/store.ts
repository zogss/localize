import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import type {
  Dispatch,
  TypedStartListening,
  UnknownAction,
} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';

import {authApi, userApi} from '@app/api';

import {authSlice} from './auth';
import {rentSlice} from './rent';

const listenerMiddlewareInstance = createListenerMiddleware();

const middlewares: any = [
  authApi.middleware,
  userApi.middleware,
  listenerMiddlewareInstance.middleware,
];

export const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  auth: authSlice.reducer,
  rent: rentSlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = Dispatch<UnknownAction>;
export type Selector<S> = (state: RootState) => S;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const rootReducer = (state: RootState | undefined, action: UnknownAction) =>
  combinedReducer(action.type !== 'logout' ? state : undefined, action);

export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false}).concat([...middlewares]),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
