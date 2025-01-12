import React from 'react';
import type {BlurViewProps} from '@react-native-community/blur';

import {StyledBlurView} from './blurredOverlay.styles';

const AppBlurredOverlay: React.FC<BlurViewProps> = props => (
  <StyledBlurView
    blurType="light"
    reducedTransparencyFallbackColor="black"
    blurAmount={6}
    {...props}
  />
);

export default AppBlurredOverlay;
