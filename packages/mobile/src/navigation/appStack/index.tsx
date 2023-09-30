import { theme } from '@app/themes';
import HomeScreen from '@app/views/home';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ICarRental } from '../../shared/types/ICarRental';
import ProfileStack from './profileStack';
import StoreStack from './storeStack';
import TrackingStack from './trackingStack';

export type AppNavigator = {
  HomeTab: undefined;
  StoreTab?: {
    screen: 'StoreScreen';
    params: { car: ICarRental };
  };
  TrackingTab?: {
    screen: 'TrackScreen';
    params: { car: ICarRental };
  };
  ProfileTab?: {
    screen: 'MyRentalsScreen';
    params: { car: ICarRental };
  };
};

export type StackAppNavigator = NativeStackNavigationProp<AppNavigator>;

export type StoreCarRouteProp = RouteProp<
  { params: { car: ICarRental } },
  'params'
>;

const { Navigator, Screen } = createBottomTabNavigator();

const AppStack: React.FC = () => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* handlers
  const navigateTo = (
    tab: 'HomeTab' | 'ProfileTab' | 'TrackingTab' | 'StoreTab',
  ) => {
    navigation.navigate(tab);
  };

  //* render
  return (
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
      })}
      sceneContainerStyle={{
        backgroundColor: theme.colors.gray_800,
      }}
      initialRouteName="HomeTab"
    >
      <Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={30} color={color} />
          ),
          tabBarButton: ({ children, style }) => (
            <TouchableOpacity
              onPress={() => navigateTo('HomeTab')}
              style={style}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="StoreTab"
        component={StoreStack}
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
        component={TrackingStack}
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
        component={ProfileStack}
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

export default AppStack;
