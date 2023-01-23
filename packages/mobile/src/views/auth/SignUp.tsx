import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import * as z from 'zod';
import { AuthLayout } from '../../layouts/AuthLayout';
import { StackAuthNavigator } from '../../routes/auth.routes';
import {
  useSignInUserMutation,
  useSignUpUserMutation
} from '../../services/api/apiSlice';
import { IAuthUser } from '../../shared/@types/IAuthUser';
import { IUser } from '../../shared/@types/IUser';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';
import { useTypedDispatch } from '../../store';
import { signIn } from '../../store/modules/auth';
import { ThemeColors } from '../../styles/colors';

const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 12px;
`;
const SubmitButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 32px;
  padding: 12px 16px;
  background-color: ${ThemeColors.cyan_500};
  color: ${ThemeColors.black};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
`;
const SubmitButtonText = styled.Text`
  color: ${ThemeColors.black};
  font-size: 16px;
  font-weight: 600;
`;
const ErrorText = styled.Text`
  color: ${ThemeColors.red_500};
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
`;

const LabelText = styled.Text`
  font-size: 16px;
  color: ${ThemeColors.gray_100};
  font-weight: 600;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  background-color: ${ThemeColors.gray_800};
  color: ${ThemeColors.gray_100};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
`;

const signUpSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required!',
    })
    .min(3, 'First name must be at least 3 characters long!')
    .max(20, 'First name must be at most 20 characters long!'),
  lastName: z
    .string({
      required_error: 'Last name is required!',
    })
    .min(3, 'Last name must be at least 3 characters long!')
    .max(20, 'Last name must be at most 20 characters long!'),
  username: z
    .string({
      required_error: 'Username is required!',
    })
    .min(3, 'Username must be at least 3 characters long!')
    .max(20, 'Username must be at most 20 characters long!'),
});
type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUp = () => {
  //* hooks
  const navigation = useNavigation<StackAuthNavigator>();
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  //* redux hooks
  const [signUpUser, signUpUserResponse] = useSignUpUserMutation();
  const [signInUser, signInUserResponse] = useSignInUserMutation();
  const dispatch = useTypedDispatch();

  //* states
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  //* handlers
  const onSubmit = useCallback(async (data: SignUpFormData) => {
    const jsonUser = await AsyncStorage.getItem('@auth_phone');
    const user: IAuthUser | null =
      jsonUser !== null ? JSON.parse(jsonUser) : null;

    if (!user) return;

    signUpUser({
      ...data,
      phoneNumber: user.phoneNumber,
    })
      .unwrap()
      .then(async (res) => {
        if (res) {
          signInUser({
            phone: user.phoneNumber,
            code: user.phoneCode,
          })
            .unwrap()
            .then(async (res: { user?: IUser; token?: string }) => {
              if (res.user && res.token) {
                await dispatch(
                  signIn({
                    signed: true,
                    token: res.token,
                    user: res.user,
                  }),
                );
              }
            })
            .catch((err) => {
              const error = getErrorMessage(err);
              setErrorMessage(error || undefined);
            });

          await AsyncStorage.removeItem('@auth_phone');
        }
      })
      .catch((err) => {
        const error = getErrorMessage(err);
        setErrorMessage(error || undefined);
      });
  }, []);

  const validateUser = async () => {
    if ((await AsyncStorage.getItem('@auth_phone')) === null) {
      navigation.navigate('SignIn');
    }
  };

  //* effects
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 10000);
    }
  }, [errorMessage]);

  //* lifecycle
  useFocusEffect(
    useCallback(() => {
      validateUser();
    }, []),
  );

  //* render
  return (
    <AuthLayout
      subtitle="You are close, complete 
    your registration to start using the app!
    "
    >
      <Container>
        <FormContainer>
          <InputContainer>
            <LabelText>First name</LabelText>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChange={onChange} />
              )}
              name="firstName"
            />
            {formErrors.firstName && (
              <ErrorText>{formErrors.firstName.message}</ErrorText>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Last name</LabelText>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChange={onChange} />
              )}
              name="lastName"
            />
            {formErrors.lastName && (
              <ErrorText>{formErrors.lastName.message}</ErrorText>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Username</LabelText>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChange={onChange} />
              )}
              name="username"
            />
            {formErrors.username && (
              <ErrorText>{formErrors.username.message}</ErrorText>
            )}
          </InputContainer>
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              signUpUserResponse.isLoading || signInUserResponse.isLoading
            }
          >
            <SubmitButtonText>complete</SubmitButtonText>
          </SubmitButton>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </FormContainer>
      </Container>
    </AuthLayout>
  );
};
