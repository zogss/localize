import {useCallback, useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';

import {errorMessage} from '@app/shared';
import {SignUpFormData, SignUpSchema} from '@app/schemas/auth/signUp';
import {authApi, userApi} from '@app/api';
import {selectAuth, useTypedSelector} from '@app/store';
import {useKeyboard} from '@app/hooks';
import {AuthRouteProps, AuthStackNavigationProps} from '@app/navigation';

const useSignUp = () => {
  const {params} = useRoute<AuthRouteProps>();
  const {navigate} = useNavigation<AuthStackNavigationProps>();
  const isFocused = useIsFocused();
  const {keyboardOpened} = useKeyboard();
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
  const {handleSubmit, reset} = methods;

  const {useLazyRegisterQuery} = userApi;
  const {useLazyLoginQuery} = authApi;
  const [register, {isLoading: registerLoading}] = useLazyRegisterQuery();
  const [login, {isLoading: loginLoading}] = useLazyLoginQuery();
  const {phoneNumber = ''} = useTypedSelector(selectAuth);

  const [isFormFocused, setIsFormFocused] = useState(false);

  const onSubmit = handleSubmit(
    useCallback(
      async data => {
        try {
          await register({
            ...data,
            phone: phoneNumber,
          }).unwrap();

          await login({
            phone: phoneNumber,
            code: params.code,
          }).unwrap();

          reset();
        } catch (error) {
          const _error = errorMessage(error) || "Couldn't register";

          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: _error,
          });
        }
      },
      [phoneNumber, params, register, login, reset],
    ),
  );

  useEffect(() => {
    if (isFocused && keyboardOpened && !isFormFocused) {
      Keyboard.dismiss();
    }
  }, [isFormFocused, keyboardOpened, isFocused]);

  useEffect(() => {
    if (!phoneNumber) {
      navigate('SignInScreen');
    }
  }, [navigate, phoneNumber]);

  return {
    methods,
    onSubmit,
    isLoading: registerLoading || loginLoading,
    isFormFocused,
    setIsFormFocused,
  };
};

export default useSignUp;
