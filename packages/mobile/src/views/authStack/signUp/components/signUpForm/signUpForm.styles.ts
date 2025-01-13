import {theme} from '@app/themes';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  gap: 10px;
`;

export const InputContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
`;

export const FormControl = styled.View`
  width: 100%;
  gap: 4px;
`;

export const SubmitButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 32px;
  padding: 12px 16px;
  background-color: ${theme.colors.cyan_500};
  color: ${theme.colors.black};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
`;

export const SubmitButtonText = styled.Text`
  color: ${theme.colors.black};
  font-size: 16px;
  font-weight: 600;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.red_500};
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
`;

export const LabelText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.gray_100};
  font-weight: 600;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  background-color: ${theme.colors.gray_800};
  color: ${theme.colors.gray_100};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
`;

export default StyleSheet.create({
  loading: {
    position: 'absolute',
    right: 60,
    top: 12,
  },
});
