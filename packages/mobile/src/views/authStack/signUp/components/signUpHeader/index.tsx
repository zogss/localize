import React from 'react';
import {theme} from '@app/themes';
import {FontAwesome} from '@expo/vector-icons';

import {
  HeaderAppText,
  HeaderContainer,
  HeaderText,
  HeaderTextContainer,
} from './signUpHeader.styles';

interface SignUpHeaderProps {
  isFormFocused: boolean;
}

const SignUpHeader: React.FC<SignUpHeaderProps> = ({isFormFocused}) => (
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
      <HeaderText
        style={{
          display: isFormFocused ? 'none' : 'flex',
        }}>
        You are close, complete your registration to start using the app!
      </HeaderText>
    </HeaderTextContainer>
  </HeaderContainer>
);

export default SignUpHeader;
