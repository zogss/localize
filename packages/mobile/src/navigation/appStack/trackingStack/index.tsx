import { ICarRental } from '@app/shared';
import { theme } from '@app/themes';
import { TrackingsScreen, TrackScreen } from '@app/views';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type TrackingNavigator = {
  TrackingsScreen: undefined;
  TrackScreen: { car: ICarRental };
};

export type StackTrackingNavigator =
  NativeStackNavigationProp<TrackingNavigator>;

const { Navigator, Screen } = createNativeStackNavigator();

const TrackingStack: React.FC = () => {
  //* hooks
  const { navigate } = useNavigation<StackTrackingNavigator>();

  //* render
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.gray_900,
        },
        headerTitleStyle: {
          color: theme.colors.gray_100,
        },
        contentStyle: {
          backgroundColor: theme.colors.gray_900,
        },
      }}
      initialRouteName="TrackingScreen"
    >
      <Screen name="TrackingsScreen" component={TrackingsScreen} />
      <Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          headerShown: true,
          headerTitle: 'See location',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('TrackingsScreen')}>
              <Entypo name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};

export default TrackingStack;
