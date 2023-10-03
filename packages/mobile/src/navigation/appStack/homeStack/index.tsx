import { NavigationProp } from '@app/navigation';
import { theme } from '@app/themes';
import { CarDetailScreen, HomeScreen } from '@app/views';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type HomeStackProps = {
  HomeScreen: undefined;
  CarDetailScreen: { id: string };
};

export type HomeStackNavigatonProps = NativeStackNavigationProp<HomeStackProps>;

const { Navigator, Screen } = createNativeStackNavigator<HomeStackProps>();

const HomeStack: React.FC = () => {
  //* hooks
  const { navigate } = useNavigation<NavigationProp>();

  //* render
  return (
    <Navigator
      screenOptions={{
        headerLeft: ({ canGoBack }) =>
          canGoBack && (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigate('AppStack', { screen: 'HomeTab' })}
            >
              <Entypo name="chevron-left" size={34} color="white" />
            </TouchableOpacity>
          ),
        headerStyle: {
          backgroundColor: theme.colors.dark,
        },
        headerTitleStyle: {
          color: theme.colors.gray_100,
        },
        contentStyle: {
          backgroundColor: theme.colors.dark,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="CarDetailScreen"
        component={CarDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

export default HomeStack;
