import { ICarRental } from '@app/shared';
import { theme } from '@app/themes';
import { MyRentalsScreen, ProfileScreen } from '@app/views';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type ProfileNavigator = {
  ProfileScreen: undefined;
  MyRentalsScreen: { car: ICarRental };
};

export type StackProfileNavigator = NativeStackNavigationProp<ProfileNavigator>;

const { Navigator, Screen } = createNativeStackNavigator();

const ProfileStack: React.FC = () => {
  //* hooks
  const { navigate } = useNavigation<StackProfileNavigator>();

  //* render
  return (
    <Navigator
      screenOptions={{
        headerLeft: ({ canGoBack }) =>
          canGoBack && (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigate('ProfileScreen')}
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
      initialRouteName="ProfileScreen"
    >
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="MyRentalsScreen"
        component={MyRentalsScreen}
        options={{
          headerTitle: 'My rental',
        }}
      />
    </Navigator>
  );
};

export default ProfileStack;
