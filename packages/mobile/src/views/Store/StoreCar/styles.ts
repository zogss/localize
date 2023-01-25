import styled from 'styled-components/native';
import { ThemeColors } from '../../../styles/colors';

export const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

export const RentCarContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const RentCarText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${ThemeColors.dark};
`;

export const RentCarButton = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 12px 18px;
  background-color: ${ThemeColors.cyan_500};
`;
