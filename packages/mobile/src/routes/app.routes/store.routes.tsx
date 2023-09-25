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
import { Store } from '../../views/Store';
import { StoreCar } from '../../views/Store/StoreCar';

type StoreNavigator = {
  Store: undefined;
  StoreCar: { car: ICarRental };
};

export type StackStoreNavigator = NativeStackNavigationProp<StoreNavigator>;

const Stack = createNativeStackNavigator();

export const StoreRoutes = () => {
  const navigation = useNavigation<StackStoreNavigator>();

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
      initialRouteName="Store"
    >
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen
        name="StoreCar"
        component={StoreCar}
        options={{
          headerShown: true,
          headerTitle: 'Car details',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('Store')}
            >
              <Entypo name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
