import {theme} from '@app/themes';
import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LeftContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MiddleContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 12px;
  margin-right: 12px;
`;

export const SecondContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RightContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const DateContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
`;

export const Separator = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${theme.colors.gray_100};
  margin: 0 10px;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  /* object-fit: cover;
  object-position: center; */
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;

export const DescriptionText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.gray_100};
  margin-top: 4px;
`;

export const DateText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.gray_100};
`;
