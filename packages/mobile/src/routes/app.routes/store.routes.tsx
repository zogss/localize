import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React from 'react';
import { ICarRental } from '../../shared/@types/ICarRental';
import { ThemeColors } from '../../styles/colors';
import { Store } from '../../views/Store';
import { StoreCar } from '../../views/Store/StoreCar';

type StoreNavigator = {
  Store: undefined;
  StoreCar: { car: ICarRental };
};

export type StackStoreNavigator = NativeStackNavigationProp<StoreNavigator>;

const Stack = createNativeStackNavigator();

export const StoreRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ThemeColors.gray_900,
        },
      }}
      initialRouteName="Store"
    >
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="StoreCar" component={StoreCar} />
    </Stack.Navigator>
  );
};
