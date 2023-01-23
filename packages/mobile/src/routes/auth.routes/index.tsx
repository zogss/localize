import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React from 'react';
import { ThemeColors } from '../../styles/colors';
import { SignIn } from '../../views/auth/SignIn';
import { SignUp } from '../../views/auth/SignUp';

type AuthNavigator = {
  SignIn: undefined;
  SignUp: undefined;
};

export type StackAuthNavigator = NativeStackNavigationProp<AuthNavigator>;

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: ThemeColors.gray_900,
      },
    }}
    initialRouteName="SignIn"
  >
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
