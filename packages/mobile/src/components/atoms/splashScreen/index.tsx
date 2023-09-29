import React from 'react';

import AppScreen from '../screen';
import {
  StyledSplashScreenActivityIndicator,
  StyledSplashScreenContainer,
} from './splashScreen.styles';

const AppSplashScreen: React.FC = () => (
  <AppScreen>
    <StyledSplashScreenContainer>
      <StyledSplashScreenActivityIndicator
        size="large"
        accessibilityLabel="initializing"
      />
    </StyledSplashScreenContainer>
  </AppScreen>
);

export default AppSplashScreen;
