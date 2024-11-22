import type { Unsubscribe } from '@reduxjs/toolkit';

import type { AppStartListening } from '..';
import { clearData, getData, setData } from '../../services';
import { onInitFulfilled, onReset } from './auth.slice';

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
      predicate: ({ payload }) => !!payload?.token,
      effect: async ({ payload: { token } }, listenerApi) => {
        const {
          auth: { phoneNumber },
        } = listenerApi.getState();

        await setData('access_token', token);
        await setData('phone_number', phoneNumber || '');

        listenerApi.dispatch({ type: 'init' });
      },
    }),
    startListening({
      predicate: ({ payload, type }) => {
        return !!payload?.user;
      },
      effect: async ({ payload: { token } }) => {
        await setData('user_id', token);
      },
    }),
  ];

  return () => listeners.forEach((unsubscribe) => unsubscribe());
};

export default setupAuthListeners;
