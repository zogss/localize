import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React from 'react';
import { ThemeColors } from '../../styles/colors';
import { Home } from '../../views/Home';

type HomeNavigator = {
  Home: undefined;
};

export type StackHomeNavigator = NativeStackNavigationProp<HomeNavigator>;

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: ThemeColors.gray_900,
      },
    }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
