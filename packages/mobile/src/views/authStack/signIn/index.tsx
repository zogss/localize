import { AppScreen } from '@app/components';
import React from 'react';
import { SignInForm, SignInHeader } from './components';
import useSignIn from './signIn.hooks';
import { settings } from '@app/services';

const SignInScreen: React.FC = () => {
  //* hooks
  const {
    methods,
    onSubmit,
    isLoading,
    isPhoneNumberFocused,
    setIsPhoneNumberFocused,
  } = useSignIn();

  //* render
  return (
    <AppScreen withEdges={['top']}>
      <SignInHeader isFormFocused={isPhoneNumberFocused} />

      <SignInForm
        {...methods}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isPhoneNumberFocused={isPhoneNumberFocused}
        setIsPhoneNumberFocused={setIsPhoneNumberFocused}
      />
    </AppScreen>
  );
};

export default SignInScreen;
