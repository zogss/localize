import type { FC } from 'react';
import React from 'react';

import { theme } from '@app/themes';
import { AppRow } from '../../styles';
import AppText from '../text';

interface AppTextHeadingProps {
  color?: keyof typeof theme.colors;
  children: string;
}

const AppTextHeading: FC<AppTextHeadingProps> = ({ children, color }) => {
  //* constants
  const lastIndex = children.length - 1;
  const regularText = children.substring(0, lastIndex);
  const highlightedCharacter = children[lastIndex];

  //* render
  return (
    <AppRow alignItems="flex-start" justifyContent="flex-start">
      <AppText color={color} variant="heading">
        {regularText}
      </AppText>
      <AppText color="cyan_500" variant="heading">
        {highlightedCharacter}
      </AppText>
    </AppRow>
  );
};

export default AppTextHeading;
