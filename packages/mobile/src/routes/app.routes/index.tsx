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
        position: 'absolute',
        zIndex: 100,
        bottom: 18,
        left: 18,
        right: 18,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 90,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3.5,
      },
      headerShown: false,
      tabBarIcon: () => <></>,
    })}
    sceneContainerStyle={{
      backgroundColor: ThemeColors.dark,
    }}
    initialRouteName="Home"
  >
    <Nav.Screen
      name="Profile"
      component={Profile}
      options={{
        headerTitle: 'Profile',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="md-person-circle-outline"
            size={60}
            style={{
              height: 60,
            }}
            color={focused ? ThemeColors.cyan_500 : ThemeColors.black}
          />
        ),
        tabBarIconStyle: {
          display: 'flex',
          height: 60,
          width: 60,
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarItemStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    />
    <Nav.Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: 'Home',
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name="home"
            size={60}
            style={{
              height: 60,
            }}
            color={focused ? ThemeColors.cyan_500 : ThemeColors.black}
          />
        ),
        tabBarIconStyle: {
          display: 'flex',
          height: 60,
          width: 60,
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarItemStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    />
    <Nav.Screen
      name="Tracking"
      component={Tracking}
      options={{
        headerTitle: 'Tracking',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="map-pin"
            size={60}
            style={{
              height: 60,
            }}
            color={focused ? ThemeColors.cyan_500 : ThemeColors.black}
          />
        ),
        tabBarIconStyle: {
          display: 'flex',
          height: 60,
          width: 60,
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarItemStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    />
  </Nav.Navigator>
);
