import { ICar } from '@app/shared';
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

export type ProfileStackProps = {
  ProfileScreen: undefined;
  MyRentalsScreen: { car: ICar };
};

export type ProfileStackNavigatonProps =
  NativeStackNavigationProp<ProfileStackProps>;

const { Navigator, Screen } = createNativeStackNavigator<ProfileStackProps>();

const ProfileStack: React.FC = () => {
  //* hooks
  const { navigate } = useNavigation<ProfileStackNavigatonProps>();

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
