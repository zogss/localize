import {theme} from '@app/themes';
import styled from 'styled-components/native';

export const UserInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const NameContainer = styled.View`
  align-items: flex-start;
`;

export const FullNameContainer = styled.View`
  width: 100%;
  flex-wrap: wrap;
  max-width: 300px;
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
  flex-direction: row;
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
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
`;

export const LogOutButton = styled.TouchableOpacity`
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
