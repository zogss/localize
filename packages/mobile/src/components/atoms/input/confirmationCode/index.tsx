import React, {forwardRef, Ref, useRef} from 'react';
import type {TextInput, TextInputProps} from 'react-native';
import {Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {AppTextInputError} from '../../text';
import styles, {SingleInputContainer} from './inputConfirmationCode.styles';

interface AppInputConfirmationCodeProps extends TextInputProps {
  name: string;
  value: string;
  error?: string;
  codeLength?: number;
  setValue: (value: string) => void;
}

const AppInputConfirmationCode = forwardRef<
  TextInput,
  AppInputConfirmationCodeProps
>(({name, codeLength = 6, value, error, setValue}, ref) => {
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const inputRef = useRef();

  return (
    <>
      <CodeField
        {...props}
        ref={ref ?? (inputRef as unknown as Ref<TextInput>)}
        autoFocus
        value={value}
        onChangeText={setValue}
        cellCount={codeLength}
        accessibilityLabel={name}
        rootStyle={styles.root}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => {
          const isHighlighted = index < value.length || isFocused;

          return (
            <SingleInputContainer
              key={index}
              onLayout={getCellOnLayoutHandler(index)}>
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
                ]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </SingleInputContainer>
          );
        }}
      />

      {error && <AppTextInputError>{error}</AppTextInputError>}
    </>
  );
});

export default AppInputConfirmationCode;
