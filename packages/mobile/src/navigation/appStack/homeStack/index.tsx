import React from 'react';
import {CarDetailScreen, HomeScreen} from '@app/views';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {ScreenHeader} from '@app/components';
import { theme } from '@app/themes';

export type HomeStackProps = {
  HomeScreen: undefined;
  CarDetailScreen: {id: string};
};

export type HomeStackNavigatonProps = NativeStackNavigationProp<HomeStackProps>;

const {Navigator, Screen} = createNativeStackNavigator<HomeStackProps>();

const HomeStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        header: ScreenHeader,
        contentStyle: {
          backgroundColor: theme.colors.dark,
        }
      }}
      initialRouteName="HomeScreen">
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Screen
        name="CarDetailScreen"
        component={CarDetailScreen}
        options={{
          title: 'Car Detail',
        }}
      />
    </Navigator>
  );
};

export default HomeStack;
