import { theme } from '@app/themes';
import styled from 'styled-components/native';

export const UserInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
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
  flex-wrap: wrap;
  max-width: 300px;
  justify-content: flex-start;
  align-items: center;
`;

export const FullNameText = styled.Text`
  font-size: 34px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;

export const UserPhotoContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  display: flex;
  align-items: flex-start;
  margin-left: 12px;
  margin-top: 10px;
  overflow: hidden;
`;

export const UserPhoto = styled.Image`
  width: 100%;
  height: 180px;
  align-self: flex-start;
  object-fit: cover;
`;

export const UserNameContainer = styled.View`
  background-color: ${theme.colors.gray_200};
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
  color: ${theme.colors.dark};
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
  gap: 8px;
  align-items: center;
  border-radius: 100px;
  padding: 4px 12px;
  padding-left: 16px;
  background-color: ${theme.colors.cyan_500};
`;

export const LogOutButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.dark};
`;
