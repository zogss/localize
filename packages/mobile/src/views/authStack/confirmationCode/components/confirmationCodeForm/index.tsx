import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';

import {phoneFormat} from '@app/services';
import {CodeFormData} from '@app/schemas';
import {AppInputConfirmationCode, AppLoading} from '@app/components';

import styles, * as Styled from './confirmationCodeForm.styles';

interface ConfirmationCodeFormProps extends UseFormReturn<CodeFormData> {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  isLoading: boolean;
  phoneNumber: string;
  codeLength: number;
  isFormFocused: boolean;
  setIsFormFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationCodeForm: React.FC<ConfirmationCodeFormProps> = ({
  control,
  onSubmit,
  isLoading,
  phoneNumber,
  codeLength,
}) => (
  <Styled.Container>
    <Styled.InputContainer>
      <Styled.LabelText>{`Enter the ${codeLength}-digit code.`}</Styled.LabelText>
      <Controller
        name="code"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <AppInputConfirmationCode
            name="passcode"
            value={value}
            setValue={onChange}
            codeLength={codeLength}
            error={error?.message}
          />
        )}
      />
    </Styled.InputContainer>
    <Styled.SubmitButton onPress={onSubmit} disabled={isLoading}>
      {isLoading && <AppLoading style={styles.loading} hideContainer />}
      <Styled.SubmitButtonText>
        {`Sent to ${phoneFormat(phoneNumber)}`}
      </Styled.SubmitButtonText>
    </Styled.SubmitButton>
  </Styled.Container>
);

export default ConfirmationCodeForm;
