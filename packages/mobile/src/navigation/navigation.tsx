import AppSplashScreen from '@app/components/atoms/splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { selectAuth, useTypedSelector } from '../store';
import AppStack from './appStack';
import AuthStack from './authStack';

const AppNavigation: React.FC = () => {
  //* hooks
  const { isReady, isAuthenticated } = useTypedSelector(selectAuth);

  //* render
  if (!isReady) return <AppSplashScreen />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
