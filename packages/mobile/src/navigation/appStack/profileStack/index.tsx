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
      initialRouteName="ProfileScreen"
    >
      <Screen name="ProfileScreen" component={ProfileScreen} />
      <Screen
        name="MyRentalsScreen"
        component={MyRentalsScreen}
        options={{
          headerShown: true,
          headerTitle: 'My rental',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigate('ProfileScreen')}
            >
              <Entypo name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};

export default ProfileStack;
