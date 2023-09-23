import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ICarRental } from '../../shared/@types/ICarRental';
import { ThemeColors } from '../../styles/colors';
import { HomeRoutes } from './home.routes';
import { ProfileRoutes } from './profile.routes';
import { StoreRoutes } from './store.routes';
import { TrackingRoutes } from './tracking.routes';

type AppNavigator = {
  StartTab: undefined;
  StoreTab?: {
    screen: 'StoreCar';
    params: { car: ICarRental };
  };
  TrackingTab?: {
    screen: 'TrackingCar';
    params: { car: ICarRental };
  };
  ProfileTab?: {
    screen: 'MyRental';
    params: { car: ICarRental };
  };
};

export type StackAppNavigator = NativeStackNavigationProp<AppNavigator>;

export type StoreCarRouteProp = RouteProp<
  { params: { car: ICarRental } },
  'params'
>;

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* handlers
  const navigateTo = (
    tab: 'StartTab' | 'ProfileTab' | 'TrackingTab' | 'StoreTab',
  ) => {
    navigation.navigate(tab);
  };

  //* render
  return (
    <Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: ThemeColors.dark,
          borderTopColor: 'transparent',
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: ThemeColors.cyan_500,
        tabBarInactiveTintColor: ThemeColors.gray_200,
        tabBarIconStyle: {
          height: 60,
          width: 60,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: ThemeColors.gray_800,
      }}
      initialRouteName="StartTab"
    >
      <Screen
        name="StartTab"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={30} color={color} />
          ),
          tabBarButton: ({ children, style }) => (
            <TouchableOpacity
              onPress={() => navigateTo('StartTab')}
              style={style}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="StoreTab"
        component={StoreRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-bag" size={24} color={color} />
          ),
          tabBarButton: ({ children, style }) => (
            <TouchableOpacity
              onPress={() => navigateTo('StoreTab')}
              style={style}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="TrackingTab"
        component={TrackingRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="location-pin" size={30} color={color} />
          ),
          tabBarButton: ({ children, style }) => (
            <TouchableOpacity
              onPress={() => navigateTo('TrackingTab')}
              style={style}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="ProfileTab"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person-circle-outline" size={30} color={color} />
          ),
          tabBarButton: ({ children, style }) => (
            <TouchableOpacity
              onPress={() => navigateTo('ProfileTab')}
              style={style}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};
