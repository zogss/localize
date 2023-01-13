import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ThemeColors } from '../../styles/colors';
import { Home } from '../../views/Home';

type AppNavigator = {
  Home: undefined;
};

export type StackAppNavigator = NativeStackNavigationProp<AppNavigator>;

const Nav = createBottomTabNavigator();

export const AppRoutes = () => (
  <Nav.Navigator
    screenOptions={() => ({
      tabBarStyle: {
        position: 'absolute',
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
      name="Home"
      component={Home}
      options={{
        headerTitle: 'Home',
        tabBarIcon: () => <></>,
        tabBarIconStyle: {
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
