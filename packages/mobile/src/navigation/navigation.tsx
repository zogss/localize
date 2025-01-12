import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppSplashScreen from '@app/components/atoms/splashScreen';

import {selectAuth, useTypedSelector} from '../store';
import AppStack from './appStack';
import AuthStack from './authStack';

const AppNavigation: React.FC = () => {
  const {isReady, isAuthenticated} = useTypedSelector(selectAuth);

  if (!isReady) return <AppSplashScreen />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
