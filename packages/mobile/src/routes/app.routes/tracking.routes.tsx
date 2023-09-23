import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
  //* hooks
  const navigation = useNavigation<StackTrackingNavigator>();

  //* render
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: ThemeColors.gray_900,
        },
        headerTitleStyle: {
          color: ThemeColors.gray_100,
        },
        contentStyle: {
          backgroundColor: ThemeColors.gray_900,
        },
      }}
      initialRouteName="Tracking"
    >
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen
        name="TrackingCar"
        component={TrackingCar}
        options={{
          headerShown: true,
          headerTitle: 'See location',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Tracking')}>
              <Entypo name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
