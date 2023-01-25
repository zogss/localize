import styled from 'styled-components/native';
import { ThemeColors } from './../../../styles/colors';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${ThemeColors.gray_100};
`;

export const Button = styled.TouchableOpacity`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${ThemeColors.gray_100};
`;
