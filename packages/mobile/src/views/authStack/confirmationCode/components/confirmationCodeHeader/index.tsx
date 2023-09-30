import { theme } from '@app/themes';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  HeaderAppText,
  HeaderContainer,
  HeaderTextContainer,
} from './confirmationCodeHeader.styles';

interface ConfirmationCodeHeaderProps {
  isFormFocused: boolean;
}

const ConfirmationCodeHeader: React.FC<ConfirmationCodeHeaderProps> = ({
  isFormFocused,
}) => (
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
    </HeaderTextContainer>
  </HeaderContainer>
);

export default ConfirmationCodeHeader;
