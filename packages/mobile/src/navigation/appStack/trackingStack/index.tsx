import React from 'react';
import {theme} from '@app/themes';
import {TrackingsScreen, TrackScreen} from '@app/views';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {ICar} from '@app/shared';
import {ScreenHeader} from '@app/components';

export type TrackingStackProps = {
  TrackingsScreen: undefined;
  TrackScreen: {car: ICar};
};

export type TrackingStackNavigationProps =
  NativeStackNavigationProp<TrackingStackProps>;

const {Navigator, Screen} = createNativeStackNavigator<TrackingStackProps>();

const TrackingStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        header: ScreenHeader,
        contentStyle: {
          backgroundColor: theme.colors.dark,
        },
      }}
      initialRouteName="TrackingsScreen">
      <Screen
        name="TrackingsScreen"
        component={TrackingsScreen}
        options={{
          title: 'See location',
        }}
      />
      <Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          presentation: 'modal',
          title: 'See location',
        }}
      />
    </Navigator>
  );
};

export default TrackingStack;
