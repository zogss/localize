import type {
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {AppBottomTabsProps} from './appStack';
import type {AuthStackProps} from './authStack';

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? {screen: K; params?: ParamList[K]}
    : {screen: K; params: ParamList[K]};
}[keyof ParamList];

export type RootStackParamList = {
  AuthStack: NestedNavigatorParams<AuthStackProps>;
  AppStack: NestedNavigatorParams<AppBottomTabsProps>;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ScreenNavigationProp<T = undefined> = NativeStackHeaderProps & {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: {
    params: T;
  };
};
