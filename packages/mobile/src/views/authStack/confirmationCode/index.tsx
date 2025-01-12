import React from 'react';

import {AppScreen} from '@app/components';

import {ConfirmationCodeForm, ConfirmationCodeHeader} from './components';
import useConfirmationCode from './confirmationCode.hooks';

const ConfirmationCodeScreen: React.FC = () => {
  const {
    methods,
    onSubmit,
    phoneNumber,
    isLoading,
    isFormFocused,
    setIsFormFocused,
  } = useConfirmationCode();

  return (
    <AppScreen withEdges={['top']}>
      <ConfirmationCodeHeader isFormFocused={isFormFocused} />

      <ConfirmationCodeForm
        {...methods}
        codeLength={6}
        onSubmit={onSubmit}
        isLoading={isLoading}
        phoneNumber={phoneNumber}
        isFormFocused={isFormFocused}
        setIsFormFocused={setIsFormFocused}
      />
    </AppScreen>
  );
};

export default ConfirmationCodeScreen;
