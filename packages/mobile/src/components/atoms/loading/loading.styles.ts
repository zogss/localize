import {theme} from '@app/themes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  spinner: {
    height: 24,
    width: 24,
    borderRadius: 30,
    borderWidth: 5,
    borderTopColor: theme.colors.cyan_300,
    borderRightColor: theme.colors.dark,
    borderBottomColor: theme.colors.cyan_300,
    borderLeftColor: theme.colors.cyan_300,
  },
});
