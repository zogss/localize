import React, {PropsWithChildren} from 'react';
import {Store} from '@reduxjs/toolkit';
import {StatusBar} from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import {appStore} from '@app/store';
import {BlurProvider, SetupProvider} from '@app/contexts';
import {toastConfig} from '@app/components';
import {AppNavigation} from '@app/navigation';

const AppNative: React.FC = () => (
  <>
    <StatusBar style="auto" />
    <AppNavigation />

    <Toast config={toastConfig} position="top" visibilityTime={5000} />
  </>
);

const AppProviders: React.FC<PropsWithChildren<{store: Store}>> = ({
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
  <AppProviders store={appStore}>
    <AppNative />
  </AppProviders>
);

export default App;
