import type {PropsWithChildren} from 'react';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import type {Unsubscribe} from '@reduxjs/toolkit';

import {setupAuthListeners, startAppListening, useAppDispatch} from '../store';

interface SetupProps {
  isReady: boolean;
}

const SetupContext = createContext<SetupProps>({isReady: false});

const SetupProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [isReady, setIsReady] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupAuthListeners(startAppListening),
    ];

    dispatch({type: 'init'});

    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isReady) setIsReady(true);
  }, [isReady]);

  const value = useMemo(() => ({isReady}), [isReady]);

  return (
    <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
  );
};

export {SetupContext, SetupProvider};
