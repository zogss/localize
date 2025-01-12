import React from 'react';
import {Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';

import {SectionContainer} from '../../profile.styles';
import {ActionButton, ActionsContainer} from './profileEasyAccess.styles';

const ProfileEasyAccess: React.FC = () => (
  <SectionContainer>
    <ActionsContainer>
      <ActionButton>
        <FontAwesome
          name="life-buoy"
          size={30}
          color="black"
          style={{transform: [{rotate: '-45deg'}]}}
        />
      </ActionButton>
      <ActionButton>
        <Entypo name="info-with-circle" size={30} color="black" />
      </ActionButton>
      <ActionButton>
        <Ionicons name="settings-sharp" size={30} color="black" />
      </ActionButton>
    </ActionsContainer>
  </SectionContainer>
);

export default ProfileEasyAccess;
