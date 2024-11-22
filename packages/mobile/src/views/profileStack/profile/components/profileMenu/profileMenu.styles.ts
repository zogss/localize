import { theme } from '@app/themes';
import styled from 'styled-components/native';

export const MenuContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  padding: 8px 0;
`;

export const MenuItem = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 26px;
  border-radius: 2px;
  /* background-color: ${theme.colors.gray_900}; */
`;

export const MenuItemTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`;

export const MenuItemTittle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;

export const MenuItemSubtitle = styled.Text`
  font-size: 14px;
  color: ${theme.colors.gray_400};
`;
