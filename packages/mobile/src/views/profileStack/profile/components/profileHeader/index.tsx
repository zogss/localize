import React from 'react';
import {theme} from '@app/themes';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import personPhoto from '@app/assets/20221231_225307.jpg';
import {IUser} from '@app/shared';

import {SectionContainer} from '../../profile.styles';
import {
  FullNameContainer,
  FullNameText,
  LogOutButton,
  LogOutButtonContainer,
  LogOutButtonText,
  NameContainer,
  UserInfoContainer,
  UserNameContainer,
  UserNameText,
  UserPhoto,
  UserPhotoContainer,
} from './profileHeader.styles';

interface ProfileHeaderProps extends IUser {
  handleSignOut: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  username,
  handleSignOut,
}) => (
  <SectionContainer>
    <UserInfoContainer>
      <NameContainer>
        <FullNameContainer>
          <FullNameText>{firstName + ' ' + lastName}</FullNameText>
        </FullNameContainer>
        <UserNameContainer>
          <MaterialIcons name="verified" size={18} color={theme.colors.dark} />
          <UserNameText>{username}</UserNameText>
        </UserNameContainer>
      </NameContainer>
      <UserPhotoContainer>
        <UserPhoto source={personPhoto} />
      </UserPhotoContainer>
    </UserInfoContainer>
    <LogOutButtonContainer>
      <LogOutButton onPress={handleSignOut}>
        <LogOutButtonText>Sign out</LogOutButtonText>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </LogOutButton>
    </LogOutButtonContainer>
  </SectionContainer>
);

export default ProfileHeader;
