import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import OtpInputs from 'react-native-otp-inputs';
import PhoneInput from 'react-native-phone-number-input';
import styled from 'styled-components/native';
import * as z from 'zod';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AuthLayout } from '../../layouts/AuthLayout';
import { StackAuthNavigator } from '../../routes/auth.routes';
import {
  useSendPhoneCodeMutation,
  useSignInUserMutation,
  useValidatePhoneCodeMutation
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
const InputContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
`;
const SubmitButtonText = styled.Text`
  height: 24px;
  color: ${ThemeColors.black};
  font-size: 16px;
  font-weight: 600;
`;
const ErrorText = styled.Text`
  color: ${ThemeColors.red_500};
  font-size: 14px;
  font-weight: 600;
`;

const LabelText = styled.Text`
  font-size: 16px;
  color: ${ThemeColors.gray_100};
  font-weight: 600;
`;

enum VALIDATION_STATUS {
  VALIDATING_PHONE = 'validating_phone',
  VALIDATING_CODE = 'validating_code',
}

const PhoneNumberSchema = z.object({
  phoneNumber: z
    .string({
      required_error: 'Phone number is required!',
    })
    .min(1, 'Phone number is required!')
    .refine(
      (value) => {
        let formattedValue;
        if (value[0] === '+') {
          formattedValue = value.substring(1);
        } else {
          formattedValue = value;
        }

        return /^\d*$/.test(formattedValue);
      },
      {
        message: 'Invalid phone number',
      },
    ),
});
type PhoneNumberFormData = z.infer<typeof PhoneNumberSchema>;

const CodeSchema = z.object({
  code: z
    .string({
      required_error: 'Code is required!',
    })
    .min(6, 'Code must be 6 digits!'),
});
type CodeFormData = z.infer<typeof CodeSchema>;

export const SignIn = () => {
  //* hooks
  const navigation = useNavigation<StackAuthNavigator>();
  const {
    control: phoneNumberControl,
    handleSubmit: sendCodeSubmit,
    formState: { errors: phoneNumberErrors },
    reset: phoneNumberReset,
  } = useForm<PhoneNumberFormData>({
    resolver: zodResolver(PhoneNumberSchema),
  });
  const {
    control: codeControl,
    handleSubmit: validateCodeSubmit,
    formState: { errors: codeErrors },
    reset: codeReset,
  } = useForm<CodeFormData>({
    resolver: zodResolver(CodeSchema),
  });

  //* redux hooks
  const [sendPhoneCode, sendResponse] = useSendPhoneCodeMutation();
  const [validatePhoneCode, validateResponse] = useValidatePhoneCodeMutation();
  const [signInUser, signInUserResponse] = useSignInUserMutation();
  const dispatch = useTypedDispatch();

  //* states
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [phoneDDI, setPhoneDDI] = useState('+55');
  const [validationStatus, setValidationStatus] = useState(
    VALIDATION_STATUS.VALIDATING_PHONE,
  );

  //* handlers
  const sendSubmit: SubmitHandler<PhoneNumberFormData> = useCallback(
    async (data: PhoneNumberFormData) => {
      if (validationStatus === VALIDATION_STATUS.VALIDATING_PHONE) {
        const phone = data.phoneNumber.replace(phoneDDI, '');

        sendPhoneCode(phone)
          .unwrap()
          .then(async (res) => {
            if (!!res) {
              const user = {} as IAuthUser;
              user.phoneNumber = phone;
              await AsyncStorage.setItem('auth:phone', JSON.stringify(user));
              setValidationStatus(VALIDATION_STATUS.VALIDATING_CODE);
            }
          })
          .catch((err) => {
            const error = getErrorMessage(err.data ? err.data : err);
            setErrorMessage(error || undefined + ' ' + err);
          });
      }
    },
    [validationStatus, errorMessage, phoneDDI],
  );

  const validateSubmit: SubmitHandler<CodeFormData> = useCallback(
    async (data: CodeFormData) => {
      if (validationStatus === VALIDATION_STATUS.VALIDATING_CODE) {
        const { phoneNumber }: IAuthUser = JSON.parse(
          (await AsyncStorage.getItem('auth:phone')) || '{}',
        );

        const validateData = {
          phone: phoneNumber,
          code: data.code,
        };

        validatePhoneCode(validateData)
          .unwrap()
          .then(async (res) => {
            if (!!res) {
              const user: IAuthUser = JSON.parse(
                (await AsyncStorage.getItem('auth:phone')) || '{}',
              );
              user.phoneCode = data.code;
              await AsyncStorage.setItem('auth:phone', JSON.stringify(user));

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
                  const error = getErrorMessage(err.data ? err.data : err);
                  console.log('error', error, err);
                  if (
                    (err.data.statusCode === 404,
                    error && error.includes('User not found'))
                  ) {
                    navigation.navigate('SignUp');
                  } else {
                    setErrorMessage(error || undefined);
                  }
                });
            }
          })
          .catch((err) => {
            const error = getErrorMessage(err.data ? err.data : err);
            setErrorMessage(error || undefined);
          });
      }
    },
    [validationStatus, errorMessage],
  );

  const removePhoneStorage = async () => {
    await AsyncStorage.removeItem('auth:phone');
  };

  //* effects
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 10000);
    }
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage('');
  }, [validationStatus]);

  //* lifecycle
  useEffect(() => {
    removePhoneStorage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      removePhoneStorage();

      return () => {
        setValidationStatus(VALIDATION_STATUS.VALIDATING_PHONE);
        phoneNumberReset();
        codeReset();
      };
    }, []),
  );

  //* render
  return (
    <AuthLayout subtitle="Log in and start your expedition!">
      <Container>
        {validationStatus === VALIDATION_STATUS.VALIDATING_PHONE && (
          <InputContainer>
            <LabelText>Phone number</LabelText>
            <Controller
              control={phoneNumberControl}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  defaultCode="BR"
                  onChangeFormattedText={onChange}
                  onChangeCountry={(country) =>
                    setPhoneDDI(country.callingCode[0])
                  }
                  value={value}
                  autoFocus
                  containerStyle={{
                    width: '100%',
                    marginTop: 12,
                    backgroundColor: ThemeColors.gray_400,
                    borderRadius: 4,
                  }}
                  textInputStyle={{
                    color: ThemeColors.gray_400,
                  }}
                  textContainerStyle={{
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }}
                  codeTextStyle={{
                    color: ThemeColors.gray_400,
                  }}
                  textInputProps={{
                    placeholderTextColor: ThemeColors.gray_400,
                  }}
                />
              )}
              name="phoneNumber"
            />
            {phoneNumberErrors.phoneNumber && (
              <ErrorText>{phoneNumberErrors.phoneNumber.message}</ErrorText>
            )}
          </InputContainer>
        )}
        {validationStatus === VALIDATION_STATUS.VALIDATING_CODE && (
          <InputContainer>
            <LabelText>Code</LabelText>
            <Controller
              control={codeControl}
              render={({ field: { onChange, value } }) => (
                <OtpInputs
                  handleChange={onChange}
                  keyboardType="phone-pad"
                  numberOfInputs={6}
                  autofillFromClipboard={false}
                  clearTextOnFocus={false}
                  selectTextOnFocus={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 12,
                    maxWidth: 'fit-content',
                  }}
                  inputStyles={{
                    width: '50px',
                    height: '55px',
                    display: 'flex',
                    color: ThemeColors.gray_400,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                  inputContainerStyles={{
                    display: 'flex',
                    width: 'fit-content',
                    backgroundColor: ThemeColors.gray_800,
                    borderRadius: 4,
                    marginHorizontal: 5,
                  }}
                />
              )}
              name="code"
            />
            {codeErrors.code && (
              <ErrorText>{codeErrors.code.message}</ErrorText>
            )}
          </InputContainer>
        )}
        <SubmitButton
          onPress={
            validationStatus === VALIDATION_STATUS.VALIDATING_PHONE
              ? sendCodeSubmit(sendSubmit)
              : validateCodeSubmit(validateSubmit)
          }
          disabled={
            validationStatus === VALIDATION_STATUS.VALIDATING_PHONE
              ? sendResponse.isLoading
              : validateResponse.isLoading
          }
        >
          {sendResponse.isLoading || validateResponse.isLoading ? (
            <LoadingSpinner />
          ) : (
            <SubmitButtonText>
              {validationStatus === VALIDATION_STATUS.VALIDATING_PHONE
                ? 'Send code'
                : 'Validate code'}
            </SubmitButtonText>
          )}
        </SubmitButton>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </Container>
    </AuthLayout>
  );
};
