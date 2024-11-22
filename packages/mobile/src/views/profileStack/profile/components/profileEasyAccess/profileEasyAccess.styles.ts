import { theme } from '@app/themes';
import styled from 'styled-components/native';

export const ActionsContainer = styled.View`
  width: 100%;
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  max-width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray_200};
  border-radius: 6px;
  padding: 24px 30px;
`;
