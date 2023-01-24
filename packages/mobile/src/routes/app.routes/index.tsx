import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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

export const AppRoutes = () => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* render
  return (
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
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <MaterialIcons name="home" size={30} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <Nav.Screen
        name="Tracking"
        component={Tracking}
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Tracking')}>
              <Feather name="map-pin" size={30} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <Nav.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity>
              <Ionicons
                name="md-person-circle-outline"
                size={30}
                color={color}
                onPress={() => navigation.navigate('Profile')}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Nav.Navigator>
  );
};
