import React from 'react';
import {BlurViewProps} from 'expo-blur';

import {StyledBlurView} from './blurredOverlay.styles';

const AppBlurredOverlay: React.FC<BlurViewProps> = props => (
  <StyledBlurView intensity={90} tint="light" {...props} />
);

export default AppBlurredOverlay;
