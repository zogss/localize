import type {
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import type { AuthStackNavigator } from './authStack';

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type RootStackParamList = {
  AuthStack: NestedNavigatorParams<AuthStackNavigator>;
  SettingsScreen: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ScreenNavigationProp<T = undefined> = NativeStackHeaderProps & {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: {
    params: T;
  };
};
