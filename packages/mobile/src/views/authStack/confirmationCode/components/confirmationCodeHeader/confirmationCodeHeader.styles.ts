import { theme } from '@app/themes';
import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 16px;
`;

export const HeaderTextContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const HeaderAppText = styled.Text`
  font-size: 32px;
  color: ${theme.colors.gray_100};
  font-weight: bold;
`;

export const HeaderText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.gray_400};
  font-weight: regular;
  margin-top: 8px;
`;
