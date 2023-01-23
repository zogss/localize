import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ThemeColors } from '../../styles/colors';
import { Home } from '../../views/Home';
import { Profile } from '../../views/Profile';
import { Tracking } from '../../views/Tracking';

type AppNavigator = {
  Home: undefined;
  Profile: undefined;
  Tracking: undefined;
};

export type StackAppNavigator = NativeStackNavigationProp<AppNavigator>;

const Nav = createBottomTabNavigator();

export const AppRoutes = () => (
  <Nav.Navigator
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
      lazy: true,
    })}
    sceneContainerStyle={{
      backgroundColor: ThemeColors.gray_200,
    }}
    initialRouteName="Home"
  >
    <Nav.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="home" size={30} color={color} />
        ),
      }}
    />
    <Nav.Screen
      name="Tracking"
      component={Tracking}
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="map-pin" size={30} color={color} />
        ),
      }}
    />
    <Nav.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="md-person-circle-outline" size={30} color={color} />
        ),
      }}
    />
  </Nav.Navigator>
);
