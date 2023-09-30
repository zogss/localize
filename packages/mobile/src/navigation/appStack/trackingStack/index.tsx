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
        headerLeft: ({ canGoBack }) =>
          canGoBack && (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigate('TrackingsScreen')}
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
      initialRouteName="TrackingScreen"
    >
      <Screen
        name="TrackingsScreen"
        component={TrackingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          headerTitle: 'See location',
        }}
      />
    </Navigator>
  );
};

export default TrackingStack;
