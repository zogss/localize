import { ICar } from '@app/shared';
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

export type StoreStackProps = {
  StoresScreen: undefined;
  StoreScreen: { car: ICar };
};

export type StoreStackNavigationProps =
  NativeStackNavigationProp<StoreStackProps>;

const { Navigator, Screen } = createNativeStackNavigator<StoreStackProps>();

const StoreStack: React.FC = () => {
  //* hooks
  const { navigate } = useNavigation<StoreStackNavigationProps>();

  //* render
  return (
    <Navigator
      screenOptions={{
        headerLeft: ({ canGoBack }) =>
          canGoBack && (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigate('StoresScreen')}
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
      initialRouteName="StoresScreen"
    >
      <Screen
        name="StoresScreen"
        component={StoresScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          headerTitle: 'Car details',
        }}
      />
    </Navigator>
  );
};

export default StoreStack;
