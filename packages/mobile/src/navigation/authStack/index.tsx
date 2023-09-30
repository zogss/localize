import { theme } from '@app/themes';
import {
  ConfirmationCodeScreen,
  SignInScreen,
  SignUpScreen,
} from '@app/views/authStack';
import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

export type AuthStackNavigator = {
  SignInScreen: undefined;
  ConfirmationCodeScreen: undefined;
  SignUpScreen: {
    code: string;
  };
};

export type StackAuthNavigator = NativeStackNavigationProp<AuthStackNavigator>;

export type AuthRouteProp = RouteProp<{ params: { code: string } }, 'params'>;

const { Navigator, Screen } = createNativeStackNavigator();

const AuthStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      contentStyle: {
        backgroundColor: theme.colors.gray_900,
      },
    }}
    initialRouteName="SignInScreen"
  >
    <Screen name="SignInScreen" component={SignInScreen} />
    <Screen name="ConfirmationCodeScreen" component={ConfirmationCodeScreen} />
    <Screen name="SignUpScreen" component={SignUpScreen} />
  </Navigator>
);

export default AuthStack;
