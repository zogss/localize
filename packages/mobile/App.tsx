import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import store from './src/store';

const App = () => (
  <NavigationContainer>
    <Provider store={store}>
      <StatusBar style="auto" />
      <Routes />
    </Provider>
  </NavigationContainer>
);

export default App;
