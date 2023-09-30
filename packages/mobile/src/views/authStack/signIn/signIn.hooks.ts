import { authApi } from '@app/api';
import { useKeyboard } from '@app/hooks';
import { StackAuthNavigator } from '@app/navigation';
import { PhoneFormData, PhoneSchema } from '@app/schemas';
import { errorMessage } from '@app/shared';
import { selectAuth, useTypedSelector } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';

const useSignIn = () => {
  //* hooks
  const { navigate } = useNavigation<StackAuthNavigator>();
  const isFocused = useIsFocused();
  const { keyboardOpened } = useKeyboard();
  const methods = useForm<PhoneFormData>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: { phoneNumber: '(82) 99920-4667' },
  });
  const { handleSubmit, setError, reset } = methods;

  //* redux hooks
  const { phoneNumber: statePhoneNumber } = useTypedSelector(selectAuth);
  const { useLazySendWppCodeQuery } = authApi;
  const [sendWppCode, { isLoading, isSuccess, error }] =
    useLazySendWppCodeQuery();

  //* states
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);

  //* handlers
  const onSubmit = handleSubmit(
    useCallback(
      async (data) => {
        const phone = data.phoneNumber;

        sendWppCode({ phone });
      },
      [sendWppCode],
    ),
  );

  //* effects
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

  //* return
  return {
    methods,
    onSubmit,
    isLoading,
    isPhoneNumberFocused,
    setIsPhoneNumberFocused,
  };
};

export default useSignIn;
