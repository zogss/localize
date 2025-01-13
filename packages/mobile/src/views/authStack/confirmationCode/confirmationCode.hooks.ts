import {useCallback, useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';

import {CodeFormData, CodeSchema} from '@app/schemas';
import {authApi} from '@app/api';
import {selectAuth, useTypedSelector} from '@app/store';
import {useKeyboard} from '@app/hooks';
import {AuthStackNavigationProps} from '@app/navigation';

const useConfirmationCode = () => {
  const {navigate} = useNavigation<AuthStackNavigationProps>();
  const isFocused = useIsFocused();
  const {keyboardOpened} = useKeyboard();
  const methods = useForm<CodeFormData>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {code: ''},
  });
  const {handleSubmit, setError, reset} = methods;

  const {phoneNumber = ''} = useTypedSelector(selectAuth);

  const {useLazyConfirmWppCodeQuery, useLazyLoginQuery} = authApi;
  const [confirmWppCode, confirmWppCodeEffects] = useLazyConfirmWppCodeQuery();
  const isWppCodeConfirmed = confirmWppCodeEffects.isSuccess;

  const [login, loginEffects] = useLazyLoginQuery();

  const [isFormFocused, setIsFormFocused] = useState(false);

  const handleSignIn = () => {
    const {code} = methods.getValues();
    login({phone: phoneNumber, code});
  };

  const handleCodeConfirmation = useCallback(() => {
    if (isWppCodeConfirmed) {
      handleSignIn();
    } else {
      const {code} = methods.getValues();
      confirmWppCode({phone: phoneNumber, code});
    }
  }, [isWppCodeConfirmed]);

  const onSubmit = handleSubmit(
    useCallback(() => {
      handleCodeConfirmation();
    }, [handleCodeConfirmation]),
  );

  useEffect(() => {
    if (confirmWppCodeEffects.isSuccess) {
      handleSignIn();
    }
  }, [confirmWppCodeEffects.isSuccess]);

  useEffect(() => {
    if (loginEffects.isSuccess) {
      reset();
    }
  }, [loginEffects.isSuccess]);

  useEffect(() => {
    if (confirmWppCodeEffects.error) {
      const {message} = confirmWppCodeEffects.error;

      setError('code', {
        type: 'manual',
      });

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
    }
  }, [confirmWppCodeEffects.error]);

  useEffect(() => {
    if (loginEffects.error) {
      const {code, message} = loginEffects.error;

      if (code === '404' && message && message.includes('User not found')) {
        const {code} = methods.getValues();
        navigate('SignUpScreen', {code});
      } else {
        setError('code', {
          type: 'manual',
        });

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });
      }
    }
  }, [loginEffects.error, navigate]);

  useEffect(() => {
    if (isFocused && keyboardOpened && !isFormFocused) {
      Keyboard.dismiss();
    }
  }, [isFormFocused, keyboardOpened, isFocused]);

  return {
    methods,
    onSubmit,
    isLoading: confirmWppCodeEffects.isFetching || loginEffects.isFetching,
    phoneNumber,
    isFormFocused,
    setIsFormFocused,
  };
};

export default useConfirmationCode;
