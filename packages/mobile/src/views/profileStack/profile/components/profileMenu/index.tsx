import { theme } from '@app/themes';
import React from 'react';
import { menuOptions } from '../../profile.service';
import {
  MenuContainer,
  MenuItem,
  MenuItemSubtitle,
  MenuItemTextContainer,
  MenuItemTittle,
} from './profileMenu.styles';

interface ProfileMenuProps {
  menuOptions: typeof menuOptions;
  navigate: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ menuOptions, navigate }) => (
  <MenuContainer>
    {menuOptions.map(({ Icon, iconTag, title, subtitle, route }) => (
      <MenuItem
        key={title}
        onPress={() => {
          console.log('pressed');
        }}
      >
        <Icon name={iconTag as any} size={28} color={theme.colors.cyan_300} />
        <MenuItemTextContainer>
          <MenuItemTittle>{title}</MenuItemTittle>
          <MenuItemSubtitle>{subtitle}</MenuItemSubtitle>
        </MenuItemTextContainer>
      </MenuItem>
    ))}
  </MenuContainer>
);

export default ProfileMenu;
