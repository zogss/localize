import React from 'react';

import {AppScreen} from '@app/components';

import SignUpForm from './components/signUpForm';
import SignUpHeader from './components/signUpHeader';
import useSignUp from './signUp.hooks';

const SignUpScreen: React.FC = () => {
  const {methods, onSubmit, isLoading, isFormFocused, setIsFormFocused} =
    useSignUp();

  return (
    <AppScreen withEdges={['top']}>
      <SignUpHeader isFormFocused={isFormFocused} />

      <SignUpForm
        {...methods}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isFormFocused={isFormFocused}
        setIsFormFocused={setIsFormFocused}
      />
    </AppScreen>
  );
};

export default SignUpScreen;
