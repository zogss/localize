import React from 'react';

import {AppScreen} from '@app/components';

import {SignInForm, SignInHeader} from './components';
import useSignIn from './signIn.hooks';

const SignInScreen: React.FC = () => {
  const {
    methods,
    onSubmit,
    isLoading,
    isPhoneNumberFocused,
    setIsPhoneNumberFocused,
  } = useSignIn();

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
