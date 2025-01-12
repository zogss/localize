import {theme} from '@app/themes';
import styled from 'styled-components/native';

export const MenuContainer = styled.View`
  width: 100%;
  gap: 6px;
  padding: 8px 0;
`;

export const MenuItem = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  padding: 16px 26px;
  border-radius: 2px;
`;

export const MenuIconContainer = styled.View`
  width: 32px;
  height: 32px;
  padding: 2px;
  align-items: center;
`;

export const MenuItemTextContainer = styled.View`
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
