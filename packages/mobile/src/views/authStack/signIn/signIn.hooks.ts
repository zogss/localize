import {useCallback, useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';

import {errorMessage} from '@app/shared';
import {PhoneFormData, PhoneSchema} from '@app/schemas';
import {authApi} from '@app/api';
import {selectAuth, useTypedSelector} from '@app/store';
import {useKeyboard} from '@app/hooks';
import {AuthStackNavigationProps} from '@app/navigation';

const useSignIn = () => {
  const {navigate} = useNavigation<AuthStackNavigationProps>();
  const isFocused = useIsFocused();
  const {keyboardOpened} = useKeyboard();
  const methods = useForm<PhoneFormData>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {phoneNumber: '(82) 99920-4667'},
  });
  const {handleSubmit, setError, reset} = methods;

  const {phoneNumber: statePhoneNumber} = useTypedSelector(selectAuth);
  const {useLazySendWppCodeQuery} = authApi;
  const [sendWppCode, {isLoading, isSuccess, error}] =
    useLazySendWppCodeQuery();

  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);

  const onSubmit = handleSubmit(
    useCallback(
      async data => {
        const phone = data.phoneNumber;

        sendWppCode({phone});
      },
      [sendWppCode],
    ),
  );

  useEffect(() => {
    if (isFocused && keyboardOpened && !isPhoneNumberFocused) {
      Keyboard.dismiss();
    }
  }, [isPhoneNumberFocused, keyboardOpened, isFocused]);

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Code sent',
      });
      reset();

      navigate('ConfirmationCodeScreen');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const _error = errorMessage(error) || "Couldn't send code";

      setError('phoneNumber', {
        type: 'manual',
      });

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: _error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (statePhoneNumber) {
      navigate('ConfirmationCodeScreen');
    }
  }, [navigate, statePhoneNumber]);

  return {
    methods,
    onSubmit,
    isLoading,
    isPhoneNumberFocused,
    setIsPhoneNumberFocused,
  };
};

export default useSignIn;
