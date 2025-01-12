import React from 'react';
import {theme} from '@app/themes';

import {menuOptions} from '../../profile.hooks';
import {
  MenuContainer,
  MenuIconContainer,
  MenuItem,
  MenuItemSubtitle,
  MenuItemTextContainer,
  MenuItemTittle,
} from './profileMenu.styles';

interface ProfileMenuProps {
  menuOptions: typeof menuOptions;
  navigate: (route: string) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({menuOptions, navigate}) => (
  <MenuContainer>
    {menuOptions.map(({Icon, iconTag, title, subtitle, route}) => (
      <MenuItem
        key={title}
        onPress={() => {
          if (route) {
            navigate(route);
          }
        }}>
        <MenuIconContainer>
          <Icon name={iconTag} size={28} color={theme.colors.cyan_300} />
        </MenuIconContainer>
        <MenuItemTextContainer>
          <MenuItemTittle>{title}</MenuItemTittle>
          <MenuItemSubtitle>{subtitle}</MenuItemSubtitle>
        </MenuItemTextContainer>
      </MenuItem>
    ))}
  </MenuContainer>
);

export default ProfileMenu;
