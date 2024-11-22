import { theme } from '@app/themes';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;
export const InputContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
`;
export const SubmitButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 32px;
  padding: 0 16px;
  height: 48px;
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
`;
export const LabelText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.gray_100};
  font-weight: 600;
`;
export const CellContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 50px;
  border-radius: 4px;
  background-color: ${theme.colors.gray_100};
`;
export const CellText = styled.Text`
  font-size: 24px;
  color: ${theme.colors.black};
  font-weight: 600;
`;

export default StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: theme.colors.gray_100,
    paddingVertical: 12,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
    color: theme.colors.black,
    fontFamily: 'System',
    borderRadius: 6,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 60,
    borderWidth: 2,
    borderStyle: 'solid',
    minHeight: 56,
  },
  placeholderTextColor: {
    color: theme.colors.gray_400,
  },
  inputInvalid: {
    borderColor: theme.colors.red_500,
  },
  default: {
    borderColor: 'transparent',
    shadowColor: theme.colors.black,
    elevation: 40,
  },
  focused: {
    borderColor: theme.colors.cyan_500,
    shadowColor: 'transparent',
    elevation: 0,
  },
  loading: {
    position: 'absolute',
    right: 100,
    top: 12,
  },
});
