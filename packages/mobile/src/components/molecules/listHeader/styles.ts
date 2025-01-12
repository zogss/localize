import {theme} from '@app/themes';
import styled from 'styled-components/native';

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
  color: ${theme.colors.gray_100};
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
  color: ${theme.colors.gray_100};
`;
