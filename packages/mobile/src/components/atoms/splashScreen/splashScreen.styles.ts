import { theme } from '@app/themes';
import styled from 'styled-components/native';

export const StyledSplashScreenActivityIndicator = styled.ActivityIndicator`
  color: ${theme.colors.gray_100};
`;

export const StyledSplashScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
