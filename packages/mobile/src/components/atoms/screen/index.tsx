import type {PropsWithChildren} from 'react';
import React from 'react';
import type {
  StatusBarStyle,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {StatusBar} from 'react-native';
import type {Edge} from 'react-native-safe-area-context';

import {useBlur} from '@app/hooks';

import AppBlurredOverlay from '../blurredOverlay';
import type {StyledSafeAreaViewProps} from './screen.styles';
import {StyledSafeAreaView, StyledView} from './screen.styles';

interface AppScreenProps extends ViewProps, StyledSafeAreaViewProps {
  barStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
  withEdges?: Edge[];
}

const AppScreen: React.FC<PropsWithChildren<AppScreenProps>> = ({
  children,
  barStyle,
  style,
  withEdges = [],
  ...props
}) => {
  const {showBlur} = useBlur();

  return (
    <StyledSafeAreaView
      {...props}
      edges={['right', 'left'].concat(withEdges) as Edge[]}>
      <StatusBar barStyle={barStyle} />

      <StyledView style={style}>{children}</StyledView>

      {showBlur && <AppBlurredOverlay />}
    </StyledSafeAreaView>
  );
};

export default AppScreen;
