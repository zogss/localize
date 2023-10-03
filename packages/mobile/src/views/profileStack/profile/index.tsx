import { AppScreen } from '@app/components';
import React from 'react';
import { ProfileEasyAccess, ProfileHeader, ProfileMenu } from './components';
import useProfile from './profile.hooks';
import { Container, SectionSeparator } from './profile.styles';

const ProfileScreen: React.FC = () => {
  //* hooks
  const { user, rent, menuOptions, navigate, handleSignOut } = useProfile();

  //* render
  return (
    <AppScreen withEdges={['top']} style={{ justifyContent: 'flex-start' }}>
      <Container>
        <ProfileHeader {...user!} handleSignOut={handleSignOut} />

        <ProfileEasyAccess />

        <SectionSeparator />

        <ProfileMenu menuOptions={menuOptions} navigate={navigate} />
      </Container>
    </AppScreen>
  );
};

export default ProfileScreen;
