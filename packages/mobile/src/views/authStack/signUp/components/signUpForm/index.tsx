import React, {Dispatch, SetStateAction} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';

import {SignUpFormData} from '@app/schemas';
import {AppLoading} from '@app/components';
import AppTextInput from '@app/components/atoms/input/text';

import styles, {
  FormContainer,
  FormControl,
  InputContainer,
  LabelText,
  SubmitButton,
  SubmitButtonText,
} from './signUpForm.styles';

interface SignUpFormProps extends UseFormReturn<SignUpFormData> {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  isLoading: boolean;
  isFormFocused: boolean;
  setIsFormFocused: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  control,
  onSubmit,
  isLoading,
  isFormFocused,
  setIsFormFocused,
}) => {
  return (
    <FormContainer>
      <InputContainer>
        <LabelText>First name</LabelText>
        <Controller
          control={control}
          name="firstName"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <FormControl>
              <AppTextInput
                value={value}
                onChangeText={onChange}
                onFocus={() => !isFormFocused && setIsFormFocused(true)}
                onBlur={() => isFormFocused && setIsFormFocused(false)}
                error={error?.message}
              />
            </FormControl>
          )}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Last name</LabelText>
        <Controller
          control={control}
          name="lastName"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <FormControl>
              <AppTextInput
                value={value}
                onChangeText={onChange}
                onFocus={() => !isFormFocused && setIsFormFocused(true)}
                onBlur={() => isFormFocused && setIsFormFocused(false)}
                error={error?.message}
              />
            </FormControl>
          )}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Username</LabelText>
        <Controller
          control={control}
          name="username"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <FormControl>
              <AppTextInput
                value={value}
                onChangeText={onChange}
                onFocus={() => !isFormFocused && setIsFormFocused(true)}
                onBlur={() => isFormFocused && setIsFormFocused(false)}
                error={error?.message}
              />
            </FormControl>
          )}
        />
      </InputContainer>
      <SubmitButton onPress={onSubmit} disabled={isLoading}>
        {isLoading && <AppLoading style={styles.loading} hideContainer />}
        <SubmitButtonText>Register</SubmitButtonText>
      </SubmitButton>
    </FormContainer>
  );
};

export default SignUpForm;
