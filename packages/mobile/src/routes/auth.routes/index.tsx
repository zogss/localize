import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ThemeColors } from '../../styles/colors';
import { SignIn } from '../../views/auth/SignIn';
import { SignUp } from '../../views/auth/SignUp';

type AuthNavigator = {
  SignIn: undefined;
  SignUp: undefined;
};

export type StackAuthNavigator = NativeStackNavigationProp<AuthNavigator>;

const Nav = createBottomTabNavigator();

export const AuthRoutes = () => (
  <Nav.Navigator
    screenOptions={() => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        display: 'none',
      },
    })}
    sceneContainerStyle={{
      backgroundColor: ThemeColors.gray_900,
    }}
    initialRouteName="SignIn"
  >
    <Nav.Screen name="SignIn" component={SignIn} />
    <Nav.Screen name="SignUp" component={SignUp} />
  </Nav.Navigator>
);
