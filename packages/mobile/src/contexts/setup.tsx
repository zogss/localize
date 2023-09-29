import type { Unsubscribe } from '@reduxjs/toolkit';
import type { PropsWithChildren } from 'react';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import {
  selectAuth,
  setupAuthListeners,
  startAppListening,
  useAppDispatch,
  useTypedSelector,
} from '../store';

interface SetupProps {
  isReady: boolean;
}

const SetupContext = createContext<SetupProps>({ isReady: false });

const SetupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  const dispatch = useAppDispatch();
  const { isFirstAccess } = useTypedSelector(selectAuth);

  useEffect(() => {
    (async () => {
      SplashScreen.hide();

      const subscriptions: Unsubscribe[] = [
        setupAuthListeners(startAppListening),
      ];

      dispatch({ type: 'init' });

      return () => {
        subscriptions.forEach((unsubscribe) => unsubscribe());
      };
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isFirstAccess && !isReady) setIsReady(true);
  }, [isFirstAccess, isReady]);

  const value = useMemo(() => ({ isReady }), [isReady]);

  return (
    <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
  );
};

export { SetupContext, SetupProvider };
