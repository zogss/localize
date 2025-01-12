import {useCallback, useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';

import {errorMessage} from '@app/shared';
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
  const [confirmWppCode, {isLoading: confirmWppCodeLoading}] =
    useLazyConfirmWppCodeQuery();
  const [login, {isLoading: loginLoading}] = useLazyLoginQuery();

  const [isFormFocused, setIsFormFocused] = useState(false);

  const onSubmit = handleSubmit(
    useCallback(
      async data => {
        try {
          const code = data.code;

          await confirmWppCode({phone: phoneNumber, code}).unwrap();

          await login({phone: phoneNumber, code}).unwrap();

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
            navigate('SignUpScreen', {code: data.code});
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

  useEffect(() => {
    if (isFocused && keyboardOpened && !isFormFocused) {
      Keyboard.dismiss();
    }
  }, [isFormFocused, keyboardOpened, isFocused]);

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
