import { ICarRental } from '@app/shared';
import { theme } from '@app/themes';
import { StoreScreen, StoresScreen } from '@app/views';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type StoreNavigator = {
  StoresScreen: undefined;
  StoreScreen: { car: ICarRental };
};

export type StackStoreNavigator = NativeStackNavigationProp<StoreNavigator>;

const { Navigator, Screen } = createNativeStackNavigator();

const StoreStack: React.FC = () => {
  //* hooks
  const { navigate } = useNavigation<StackStoreNavigator>();

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
      initialRouteName="StoresScreen"
    >
      <Screen name="StoresScreen" component={StoresScreen} />
      <Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          headerShown: true,
          headerTitle: 'Car details',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigate('StoresScreen')}
            >
              <Entypo name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};

export default StoreStack;
