import { toastConfig } from '@app/components';
import { BlurProvider, SetupProvider } from '@app/contexts';
import { AppNavigation } from '@app/navigation';
import { createStore } from '@app/store';
import { Store } from '@reduxjs/toolkit';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren } from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

const AppNative: React.FC = () => (
  <>
    <StatusBar style="auto" />
    <AppNavigation />

    <Toast config={toastConfig} position="top" visibilityTime={5000} />
  </>
);

const AppProviders: React.FC<PropsWithChildren<{ store: Store }>> = ({
  children,
  store,
}) => (
  <Provider store={store}>
    <SetupProvider>
      <BlurProvider>{children}</BlurProvider>
    </SetupProvider>
  </Provider>
);

const App: React.FC = () => (
  <AppProviders store={createStore()}>
    <AppNative />
  </AppProviders>
);

export default App;
