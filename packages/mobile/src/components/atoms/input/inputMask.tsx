import type { ReactElement } from 'react';
import React from 'react';
import { View } from 'react-native';
import type { TextInputMaskProps } from 'react-native-text-input-mask';
import TextInputMask from 'react-native-text-input-mask';

import { theme } from '@app/themes';
import { AppTextInputError } from '../text';

export interface AppInputMaskProps extends TextInputMaskProps {
  name: string;
  mask?: string;
  placeholderTextColor?: keyof typeof theme.colors;
  value: string;
  placeholder: string;
  error?: string;
  styles?: any;
  withChildren?: ReactElement;
}

const AppInputMask: React.FC<AppInputMaskProps> = ({
  name,
  value,
  placeholder,
  error,
  mask = '([00]) [00000]-[0000]',
  placeholderTextColor = 'gray_100',
  withChildren,
  ...props
}) => {
  return (
    <>
      <View>
        <TextInputMask
          {...props}
          accessibilityLabel={name}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.colors[placeholderTextColor]}
          mask={mask}
        />
        {withChildren}
      </View>

      {error && (
        <AppTextInputError testID="app.error.message">
          {error}
        </AppTextInputError>
      )}
    </>
  );
};

export default AppInputMask;
