import styled from 'styled-components/native';
import { ThemeColors } from './../../styles/colors';

export const SectionSeparator = styled.View`
  width: 100%;
  height: 7px;
  margin: 14px 0;
  background-color: ${ThemeColors.gray_700};
`;

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 52px;
`;

export const FirstContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 26px;
`;

export const NameContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FullNameContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FullNameText = styled.Text`
  font-size: 34px;
  font-weight: 600;
  color: ${ThemeColors.gray_100};
`;

export const UserPhotoContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  display: flex;
  align-items: flex-start;
  margin-left: 12px;
  overflow: hidden;
`;

export const UserPhoto = styled.Image`
  width: 100%;
  height: 180px;
  align-self: flex-start;
  object-fit: cover;
`;

export const UserNameContainer = styled.View`
  background-color: ${ThemeColors.gray_200};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 100px;
  padding: 4px 16px;
  margin-top: 12px;
`;

export const UserNameText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${ThemeColors.dark};
`;

export const UserInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogOutButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

export const LogOutButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding: 4px 16px;
  background-color: ${ThemeColors.cyan_500};
`;

export const LogOutButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${ThemeColors.dark};
`;

export const SecondContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px;
`;

export const FunctionalitiesButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.gray_200};
  border-radius: 8px;
  padding: 24px 30px;
`;

export const ThirdContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 26px;
`;

export const RentalsContainer = styled.View`
  width: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
