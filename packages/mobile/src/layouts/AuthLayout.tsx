import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import { ThemeColors } from '../styles/colors';

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 38px;
`;
const HeaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px; 
`;
const HeaderTextContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const HeaderAppText = styled.Text`
  font-size: 32px;
  color: ${ThemeColors.gray_100};
  font-weight: bold;
`;
const HeaderText = styled.Text`
  font-size: 18px;
  color: ${ThemeColors.gray_400};
  font-weight: regular;
  margin-top: 8px;
`;

interface AuthLayoutProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  subtitle,
}) => {
  return (
    <Container>
      <HeaderContainer>
        <FontAwesome name="map-o" size={100} color={ThemeColors.cyan_500} />
        <HeaderTextContainer>
          <HeaderAppText>Localize</HeaderAppText>
          <HeaderText>{subtitle}</HeaderText>
        </HeaderTextContainer>
      </HeaderContainer>
      {children}
    </Container>
  );
};
