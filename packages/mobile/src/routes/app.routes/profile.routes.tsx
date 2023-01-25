import {
  createNativeStackNavigator, NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React from 'react';
import { ICarRental } from '../../shared/@types/ICarRental';
import { ThemeColors } from '../../styles/colors';
import { Profile } from '../../views/Profile';
import { MyRental } from '../../views/Profile/MyRental';

type ProfileNavigator = {
  Profile: undefined;
  MyRental: { car: ICarRental };
};

export type StackProfileNavigator = NativeStackNavigationProp<ProfileNavigator>;

const Stack = createNativeStackNavigator();

export const ProfileRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ThemeColors.gray_900,
        },
      }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyRental" component={MyRental} />
    </Stack.Navigator>
  );
};
