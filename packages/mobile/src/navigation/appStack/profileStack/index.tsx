import React from 'react';
import {theme} from '@app/themes';
import {MyRentalsScreen, MyRentScreen, ProfileScreen} from '@app/views';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {ICar} from '@app/shared';
import {ScreenHeader} from '@app/components';

export type ProfileStackProps = {
  ProfileScreen: undefined;
  MyRentalsScreen: undefined;
  MyRentScreen: {car: ICar};
};

export type ProfileStackNavigatonProps =
  NativeStackNavigationProp<ProfileStackProps>;

const {Navigator, Screen} = createNativeStackNavigator<ProfileStackProps>();

const ProfileStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        header: ScreenHeader,
        contentStyle: {
          backgroundColor: theme.colors.dark,
        },
      }}
      initialRouteName="ProfileScreen">
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="MyRentalsScreen"
        component={MyRentalsScreen}
        options={{
          title: 'My Cars',
        }}
      />
      <Screen
        name="MyRentScreen"
        component={MyRentScreen}
        options={{
          title: 'Rented Car details',
        }}
      />
    </Navigator>
  );
};

export default ProfileStack;
