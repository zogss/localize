import {
  createNativeStackNavigator, NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React from 'react';
import { ICarRental } from '../../shared/@types/ICarRental';
import { ThemeColors } from '../../styles/colors';
import { Tracking } from '../../views/Tracking';
import { TrackingCar } from '../../views/Tracking/TrackingCar';

type TrackingNavigator = {
  Tracking: undefined;
  TrackingCar: { car: ICarRental };
};

export type StackTrackingNavigator =
  NativeStackNavigationProp<TrackingNavigator>;

const Stack = createNativeStackNavigator();

export const TrackingRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ThemeColors.gray_900,
        },
      }}
      initialRouteName="Tracking"
    >
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen name="TrackingCar" component={TrackingCar} />
    </Stack.Navigator>
  );
};
