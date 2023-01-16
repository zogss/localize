import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import { ThemeColors } from '../styles/colors';

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 0 2.375rem;
`;
const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const HeaderTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderAppText = styled.Text`
  font-size: 2rem;
  color: ${ThemeColors.gray_100};
  font-weight: bold;
`;
const HeaderText = styled.Text`
  font-size: 1.125rem;
  color: ${ThemeColors.gray_400};
  font-weight: regular;
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
