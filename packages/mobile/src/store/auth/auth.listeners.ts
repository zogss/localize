import type { Unsubscribe } from '@reduxjs/toolkit';

import type { AppStartListening } from '..';
import { clearData, getData, setData } from '../../services';
import { onFirstAccess, onInitFulfilled, onReset } from './auth.slice';

const setupAuthListeners = (startListening: AppStartListening): Unsubscribe => {
  const listeners = [
    startListening({
      type: 'init',
      effect: async (action, listenerApi) => {
        const accessToken = (await getData('access_token')) || undefined;
        const phoneNumber = (await getData('phone_number')) || undefined;

        listenerApi.dispatch(onInitFulfilled({ accessToken, phoneNumber }));
      },
    }),
    startListening({
      type: 'logout',
      effect: async (action, listenerApi) => {
        await clearData();

        listenerApi.dispatch(onReset());
      },
    }),
    startListening({
      predicate: ({ payload }) =>
        payload?.access_token && payload?.refresh_token,
      effect: async (
        { payload: { access_token, refresh_token } },
        listenerApi,
      ) => {
        const {
          auth: { phoneNumber },
        } = listenerApi.getState();

        await setData('access_token', access_token);
        await setData('refresh_token', refresh_token);
        await setData('phone_number', phoneNumber || '');

        listenerApi.dispatch(onFirstAccess());
      },
    }),
  ];

  return () => listeners.forEach((unsubscribe) => unsubscribe());
};

export default setupAuthListeners;
