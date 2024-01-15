import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
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
  transition: all 0.2s ease-in-out;
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
  font-size: 18px;
  color: ${ThemeColors.gray_100};
  font-weight: 600;
`;
const CellContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 50px;
  border-radius: 4px;
  background-color: ${ThemeColors.gray_100};
`;
const CellText = styled.Text`
  font-size: 24px;
  color: ${ThemeColors.black};
  font-weight: 600;
`;

enum VALIDATION_STATUS {
  VALIDATING_PHONE = 'validating_phone',
  VALIDATING_CODE = 'validating_code',
}

const CELL_COUNT = 6;

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
    getValues: getCodeValues,
    setValue: setCodeValue,
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

  //* refs
  const ref = useBlurOnFulfill({
    value: getCodeValues().code,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: getCodeValues().code,
    setValue: (value) => {
      setCodeValue('code', value);
    },
  });

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

              await AsyncStorage.setItem('@auth_phone', JSON.stringify(user));

              setValidationStatus(VALIDATION_STATUS.VALIDATING_CODE);
            }
          })
          .catch((err) => {
            const error = getErrorMessage(err.data ? err.data : err);
            setErrorMessage(error || undefined);
          });
      }
    },
    [validationStatus, errorMessage, phoneDDI],
  );

  const validateSubmit: SubmitHandler<CodeFormData> = useCallback(
    async (data: CodeFormData) => {
      if (validationStatus === VALIDATION_STATUS.VALIDATING_CODE) {
        const jsonUser = await AsyncStorage.getItem('@auth_phone');
        const user: IAuthUser | null =
          jsonUser !== null ? JSON.parse(jsonUser) : null;

        if (!user) return;

        const validateData = {
          phone: user.phoneNumber,
          code: data.code,
        };

        validatePhoneCode(validateData)
          .unwrap()
          .then(async (res) => {
            if (!!res) {
              const jsonUser = await AsyncStorage.getItem('@auth_phone');
              const user: IAuthUser | null =
                jsonUser !== null ? JSON.parse(jsonUser) : null;

              if (!user) return;

              user.phoneCode = data.code;
              await AsyncStorage.setItem('@auth_phone', JSON.stringify(user));

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
    await AsyncStorage.removeItem('@auth_phone');
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
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={onChange}
                  cellCount={CELL_COUNT}
                  rootStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 20,
                  }}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <CellContainer
                      key={index}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      <CellText>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </CellText>
                    </CellContainer>
                  )}
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
              : validateResponse.isLoading || signInUserResponse.isLoading
          }
        >
          {sendResponse.isLoading ||
          validateResponse.isLoading ||
          signInUserResponse.isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {validationStatus === VALIDATION_STATUS.VALIDATING_CODE && (
                <SubmitButtonText>Validate code</SubmitButtonText>
              )}
              {validationStatus === VALIDATION_STATUS.VALIDATING_PHONE && (
                <SubmitButtonText>Send code </SubmitButtonText>
              )}
            </>
          )}
        </SubmitButton>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </Container>
    </AuthLayout>
  );
};
