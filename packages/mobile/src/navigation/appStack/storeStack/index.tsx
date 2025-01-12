import React from 'react';
import {theme} from '@app/themes';
import {StoreScreen, StoresScreen} from '@app/views';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {ICar} from '@app/shared';
import {ScreenHeader} from '@app/components';

export type StoreStackProps = {
  StoresScreen: undefined;
  StoreScreen: {car: ICar};
};

export type StoreStackNavigationProps =
  NativeStackNavigationProp<StoreStackProps>;

const {Navigator, Screen} = createNativeStackNavigator<StoreStackProps>();

const StoreStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        header: ScreenHeader,
        contentStyle: {
          backgroundColor: theme.colors.dark,
        },
      }}
      initialRouteName="StoresScreen">
      <Screen
        name="StoresScreen"
        component={StoresScreen}
        options={{
          title: 'Cars to rent',
        }}
      />
      <Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          title: 'Car details',
        }}
      />
    </Navigator>
  );
};

export default StoreStack;
