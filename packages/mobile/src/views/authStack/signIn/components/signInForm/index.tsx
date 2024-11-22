import { AppInputMask, AppLoading } from '@app/components';
import { PhoneFormData } from '@app/schemas';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import styles, * as Styled from './signInForm.styles';

interface SignInFormProps extends UseFormReturn<PhoneFormData> {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  isLoading: boolean;
  isPhoneNumberFocused: boolean;
  setIsPhoneNumberFocused: Dispatch<SetStateAction<boolean>>;
}

const SignInForm: React.FC<SignInFormProps> = ({
  control,
  onSubmit,
  isLoading,
  isPhoneNumberFocused,
  setIsPhoneNumberFocused,
}) => (
  <Styled.Container>
    <Styled.InputContainer>
      <Styled.LabelText>Enter your whatsapp number.</Styled.LabelText>
      <Controller
        name="phoneNumber"
        control={control}
        render={({
          field: { ref, name, onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <AppInputMask
            ref={ref}
            name={name}
            value={value}
            placeholder="(12) 34567-8901"
            error={error?.message}
            keyboardType="number-pad"
            onChangeText={(_, unmasked) => onChange(unmasked)}
            onFocus={() => setIsPhoneNumberFocused(true)}
            onBlur={() => {
              setIsPhoneNumberFocused(false);
              onBlur();
            }}
            style={{
              ...styles.input,
              ...styles[isPhoneNumberFocused ? 'focused' : 'default'],
              ...(!!error && styles.inputInvalid),
            }}
          />
        )}
      />
    </Styled.InputContainer>
    <Styled.SubmitButton onPress={onSubmit} disabled={isLoading}>
      {isLoading && <AppLoading style={styles.loading} hideContainer />}
      <Styled.SubmitButtonText>Send code</Styled.SubmitButtonText>
    </Styled.SubmitButton>
  </Styled.Container>
);

export default SignInForm;
