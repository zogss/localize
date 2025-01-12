import React from 'react';
import {theme} from '@app/themes';
import {FontAwesome5, Ionicons, MaterialIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';

import {ICar} from '@app/shared/types/car';
import HomeStack, {HomeStackProps} from './homeStack';
import ProfileStack, {ProfileStackProps} from './profileStack';
import StoreStack, {StoreStackProps} from './storeStack';
import TrackingStack, {TrackingStackProps} from './trackingStack';

export type AppStackProps = {
  HomeTab?: {
    screen: keyof HomeStackProps;
    params: HomeStackProps[keyof HomeStackProps];
  };
  StoreTab?: {
    screen: keyof StoreStackProps;
    params?: StoreStackProps[keyof StoreStackProps];
  };
  TrackingTab?: {
    screen: keyof TrackingStackProps;
    params?: TrackingStackProps[keyof TrackingStackProps];
  };
  ProfileTab?: {
    screen: keyof ProfileStackProps;
    params?: ProfileStackProps[keyof ProfileStackProps];
  };
};

export type StackAppNavigator = NativeStackNavigationProp<AppStackProps>;

export type StoreCarRouteProp = RouteProp<{params: {car: ICar}}, 'params'>;

const {Navigator, Screen} = createBottomTabNavigator<AppStackProps>();

const AppStack: React.FC = () => (
  <Navigator
    screenOptions={() => ({
      tabBarStyle: {
        backgroundColor: theme.colors.dark,
        borderTopColor: 'transparent',
      },
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: theme.colors.cyan_500,
      tabBarInactiveTintColor: theme.colors.gray_200,
      tabBarIconStyle: {
        height: 60,
        width: 60,
      },
      tabBarHideOnKeyboard: true,
      tabBarButton: ({children, ...rest}) => (
        <TouchableOpacity {...rest}>{children}</TouchableOpacity>
      ),
    })}
    sceneContainerStyle={{
      backgroundColor: theme.colors.dark,
    }}
    initialRouteName="HomeTab">
    <Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="home" size={30} color={color} />
        ),
      }}
    />
    <Screen
      name="StoreTab"
      component={StoreStack}
      options={{
        tabBarIcon: ({color}) => (
          <FontAwesome5 name="shopping-bag" size={24} color={color} />
        ),
      }}
    />
    <Screen
      name="TrackingTab"
      component={TrackingStack}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="location-pin" size={30} color={color} />
        ),
      }}
    />
    <Screen
      name="ProfileTab"
      component={ProfileStack}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="person-circle-outline" size={30} color={color} />
        ),
      }}
    />
  </Navigator>
);

export default AppStack;
