import React, { forwardRef, useRef } from 'react';
import type { TextInputProps } from 'react-native';
import { Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { AppTextInputError } from '../../text';
import styles from './inputConfirmationCode.styles';

interface AppInputConfirmationCodeProps extends TextInputProps {
  name: string;
  value: string;
  error?: string;
  codeLength?: number;
  setValue: (value: string) => void;
}

const AppInputConfirmationCode: React.FC<AppInputConfirmationCodeProps> = (
  { name, codeLength = 6, value, error, setValue },
  ref,
) => {
  //* hooks
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //* refs
  const inputRef = useRef();

  //* render
  return (
    <>
      <CodeField
        ref={ref ?? inputRef}
        {...props}
        autoFocus
        value={value}
        onChangeText={setValue}
        cellCount={codeLength}
        accessibilityLabel={name}
        keyboardType="number-pad"
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => {
          const isHighlighted = index < value.length || isFocused;

          return (
            <View key={index} onLayout={getCellOnLayoutHandler(index)}>
              <View
                style={[
                  styles.shadow,
                  isHighlighted && styles.focusShadow,
                  !!error && styles.errorShadow,
                ]}
              />

              <Text
                style={[
                  styles.cell,
                  isHighlighted && styles.focusedCell,
                  !!error && styles.invalidCell,
                ]}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          );
        }}
      />

      {error && <AppTextInputError>{error}</AppTextInputError>}
    </>
  );
};

// TODO: find a way to solve that
// @ts-ignore
export default forwardRef(AppInputConfirmationCode);
