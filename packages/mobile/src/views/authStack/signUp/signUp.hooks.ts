import { authApi, userApi } from '@app/api';
import { useKeyboard } from '@app/hooks';
import { AuthRouteProps, AuthStackNavigationProps } from '@app/navigation';
import { SignUpFormData, SignUpSchema } from '@app/schemas/auth/signUp';
import { errorMessage } from '@app/shared';
import { selectAuth, useTypedSelector } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';

const useSignUp = () => {
  //* hooks
  const { params } = useRoute<AuthRouteProps>();
  const { navigate } = useNavigation<AuthStackNavigationProps>();
  const isFocused = useIsFocused();
  const { keyboardOpened } = useKeyboard();
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
  const { handleSubmit, reset } = methods;

  //* redux hooks
  const { useLazyRegisterQuery } = userApi;
  const { useLazyLoginQuery } = authApi;
  const [register, { isLoading: registerLoading }] = useLazyRegisterQuery();
  const [login, { isLoading: loginLoading }] = useLazyLoginQuery();
  const { phoneNumber = '' } = useTypedSelector(selectAuth);

  //* states
  const [isFormFocused, setIsFormFocused] = useState(false);

  //* handlers
  const onSubmit = handleSubmit(
    useCallback(
      async (data) => {
        try {
          await register({
            ...data,
            phone: phoneNumber,
          }).unwrap();

          await login({
            phone: phoneNumber,
            code: params.code,
          }).unwrap();

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Registered',
          });
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

  //* effects
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

  //* return
  return {
    methods,
    onSubmit,
    isLoading: registerLoading || loginLoading,
    isFormFocused,
    setIsFormFocused,
  };
};

export default useSignUp;
