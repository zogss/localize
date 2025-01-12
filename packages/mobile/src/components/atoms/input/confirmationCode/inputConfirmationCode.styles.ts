import {theme} from '@app/themes';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const SingleInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default StyleSheet.create({
  root: {
    width: '100%',
    gap: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: 56,
    height: 60,
    lineHeight: 54,
    fontSize: 24,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderStyle: 'solid',
    textAlign: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.gray_100,
    borderRadius: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  focusedCell: {
    color: theme.colors.black,
    borderColor: theme.colors.cyan_500,
    backgroundColor: theme.colors.cyan_300,
  },
  invalidCell: {
    color: theme.colors.gray_100,
    borderColor: theme.colors.red_500,
    backgroundColor: theme.colors.red_500,
  },
  shadow: {
    position: 'absolute',
    bottom: -2,
    height: '100%',
    width: '100%',
    zIndex: -1,
    borderBottomWidth: 4,
    borderStyle: 'solid',
    borderBottomColor: 'transparent',
    left: 0,
    borderRadius: 8,
  },
  focusShadow: {
    borderBottomColor: theme.colors.cyan_500,
  },
  errorShadow: {
    borderBottomColor: theme.colors.red_500,
  },
});
