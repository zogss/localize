import { theme } from '@app/themes';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  HeaderAppText,
  HeaderContainer,
  HeaderText,
  HeaderTextContainer,
} from './signInHeader.styles';

interface SignInHeaderProps {
  isFormFocused: boolean;
}

const SignInHeader: React.FC<SignInHeaderProps> = ({ isFormFocused }) => (
  <HeaderContainer>
    <FontAwesome
      name="map-o"
      style={{
        display: isFormFocused ? 'none' : 'flex',
      }}
      size={100}
      color={theme.colors.cyan_500}
    />
    <HeaderTextContainer>
      <HeaderAppText>Localize</HeaderAppText>
      <HeaderText>Log in and start your expedition!</HeaderText>
    </HeaderTextContainer>
  </HeaderContainer>
);

export default SignInHeader;
