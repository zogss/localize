import { authApi } from '@app/api';
import { useKeyboard } from '@app/hooks';
import { AuthStackNavigationProps } from '@app/navigation';
import { CodeFormData, CodeSchema } from '@app/schemas';
import { errorMessage } from '@app/shared';
import { selectAuth, useTypedSelector } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';

const useConfirmationCode = () => {
  //* hooks
  const { navigate } = useNavigation<AuthStackNavigationProps>();
  const isFocused = useIsFocused();
  const { keyboardOpened } = useKeyboard();
  const methods = useForm<CodeFormData>({
    resolver: zodResolver(CodeSchema),
    defaultValues: { code: '' },
  });
  const { handleSubmit, setError, reset } = methods;

  //* redux hooks
  const { phoneNumber = '' } = useTypedSelector(selectAuth);
  const { useLazyConfirmWppCodeQuery, useLazyLoginQuery } = authApi;
  const [confirmWppCode, { isLoading: confirmWppCodeLoading }] =
    useLazyConfirmWppCodeQuery();
  const [login, { isLoading: loginLoading }] = useLazyLoginQuery();

  //* states
  const [isFormFocused, setIsFormFocused] = useState(false);

  //* handlers
  const onSubmit = handleSubmit(
    useCallback(
      async (data) => {
        try {
          const code = data.code;

          await confirmWppCode({ phone: phoneNumber, code }).unwrap();

          await login({ phone: phoneNumber, code }).unwrap();

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Logged in successfully',
          });
          reset();
        } catch (error: any) {
          const _error = errorMessage(error) || 'Something went wrong!';

          if (
            (error.data.statusCode === 404,
            _error && _error.includes('User not found'))
          ) {
            navigate('SignUpScreen', { code: data.code });
          } else {
            setError('code', {
              type: 'manual',
            });

            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: _error,
            });
          }
        }
      },
      [confirmWppCode],
    ),
  );

  //* effects
  useEffect(() => {
    if (isFocused && keyboardOpened && !isFormFocused) {
      Keyboard.dismiss();
    }
  }, [isFormFocused, keyboardOpened, isFocused]);

  //* return
  return {
    methods,
    onSubmit,
    isLoading: confirmWppCodeLoading || loginLoading,
    phoneNumber,
    isFormFocused,
    setIsFormFocused,
  };
};

export default useConfirmationCode;
