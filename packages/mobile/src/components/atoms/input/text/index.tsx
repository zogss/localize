import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { AppTextInputError } from '../../text';
import { styles as inputStyles } from './text.styles';

interface AppTextInputProps extends TextInputProps {
  error?: string;
  styles?: any;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  value,
  onChangeText,
  error,
  styles,
  ...props
}) => {
  //* states
  const [isFocused, setIsFocused] = useState(false);

  //* render
  return (
    <>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        style={{
          ...inputStyles.input,
          ...inputStyles[isFocused ? 'focused' : 'default'],
          ...(!!error && inputStyles.inputInvalid),
          ...styles,
        }}
      />

      {error && <AppTextInputError>{error}</AppTextInputError>}
    </>
  );
};
export default AppTextInput;
