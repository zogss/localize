import {isAnyOf, PayloadAction, type Unsubscribe} from '@reduxjs/toolkit';

import {authApi, SignInResponse} from '@app/api';

import type {AppStartListening} from '..';
import {clearData, getData, setData} from '../../services';
import {onInitFulfilled, onReset} from './auth.slice';

const setupAuthListeners = (startListening: AppStartListening): Unsubscribe => {
  const listeners = [
    startListening({
      type: 'init',
      effect: async (_, listenerApi) => {
        const accessToken = (await getData('access_token')) || undefined;
        const phoneNumber = (await getData('phone_number')) || undefined;

        listenerApi.dispatch(onInitFulfilled({accessToken, phoneNumber}));
      },
    }),
    startListening({
      type: 'logout',
      effect: async (_, listenerApi) => {
        await clearData();

        listenerApi.dispatch(onReset());
      },
    }),
    startListening({
      matcher: isAnyOf(authApi.endpoints.login.matchFulfilled),
      effect: async ({payload}: PayloadAction<SignInResponse>, listenerApi) => {
        const {
          auth: {phoneNumber},
        } = listenerApi.getState();

        await setData('access_token', payload.token);
        await setData('phone_number', phoneNumber || '');

        listenerApi.dispatch({type: 'init'});
      },
    }),
  ];

  return () => listeners.forEach(unsubscribe => unsubscribe());
};

export default setupAuthListeners;
