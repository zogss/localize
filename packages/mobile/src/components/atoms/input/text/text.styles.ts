import {theme} from '@app/themes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
});
