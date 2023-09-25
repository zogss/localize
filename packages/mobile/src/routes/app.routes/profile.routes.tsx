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
import { Profile } from '../../views/Profile';
import { MyRental } from '../../views/Profile/MyRental';

type ProfileNavigator = {
  Profile: undefined;
  MyRental: { car: ICarRental };
};

export type StackProfileNavigator = NativeStackNavigationProp<ProfileNavigator>;

const Stack = createNativeStackNavigator();

export const ProfileRoutes = () => {
  const navigation = useNavigation<StackProfileNavigator>();

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
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="MyRental"
        component={MyRental}
        options={{
          headerShown: true,
          headerTitle: 'My rental',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('Profile')}
            >
              <Entypo name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
