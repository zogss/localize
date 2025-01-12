import React from 'react';

import {AppScreen} from '@app/components';

import {ProfileEasyAccess, ProfileHeader, ProfileMenu} from './components';
import useProfile from './profile.hooks';
import {Container, SectionSeparator} from './profile.styles';

const ProfileScreen: React.FC = () => {
  const {user, menuOptions, navigate, handleSignOut} = useProfile();

  return (
    <AppScreen withEdges={['top']} style={{justifyContent: 'flex-start'}}>
      <Container>
        <ProfileHeader {...user!} handleSignOut={handleSignOut} />
        <SectionSeparator />
        <ProfileEasyAccess />
        <SectionSeparator />
        <ProfileMenu menuOptions={menuOptions} navigate={navigate} />
      </Container>
    </AppScreen>
  );
};

export default ProfileScreen;
