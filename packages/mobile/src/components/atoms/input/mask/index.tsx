import React, { forwardRef } from 'react';
import type { MaskedTextInputProps } from 'react-native-mask-text';
import { MaskedTextInput } from 'react-native-mask-text';

import { theme } from '@app/themes';
import { TextInput } from 'react-native';
import { AppTextInputError } from '../../text';

export interface AppInputMaskProps extends MaskedTextInputProps {
  name: string;
  mask?: string;
  placeholderTextColor?: keyof typeof theme.colors;
  value: string;
  placeholder: string;
  error?: string;
  styles?: any;
}

const AppInputMask = forwardRef<TextInput, AppInputMaskProps>(
  (
    {
      name,
      value,
      placeholder,
      error,
      mask = '(99) 99999-9999',
      placeholderTextColor = 'gray_400',
      ...props
    },
    ref,
  ) => (
    <>
      <MaskedTextInput
        {...props}
        ref={ref}
        accessibilityLabel={name}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors[placeholderTextColor]}
        mask={mask}
      />

      {error && <AppTextInputError>{error}</AppTextInputError>}
    </>
  ),
);

AppInputMask.displayName = 'AppInputMask';

export default AppInputMask;
