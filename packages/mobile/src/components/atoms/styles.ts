import type { FlexStyle, TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

import { theme } from '@app/themes';

export type AppRowProps = Pick<FlexStyle, 'justifyContent' | 'alignItems'> & {
  fullwidth?: boolean;
};

export const AppRow = styled.View<AppRowProps>`
  ${({
    justifyContent = 'center',
    alignItems = 'center',
    fullwidth = false,
  }) => css`
    flex-direction: row;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    width: ${fullwidth ? '100%' : 'auto'};
  `}
`;

const dividerTypes = {
  inset: {
    margin: '10px 0 10px 50px',
  },
  center: {
    margin: '10px 50px',
  },
  full: {
    margin: '10px 0',
  },
};

export interface StyledDividerProps {
  variant?: keyof typeof dividerTypes;
}

export const AppDivider = styled.View<StyledDividerProps>`
  ${({ variant = 'full' }) => css`
    border: 0.3px solid ${theme.colors.dark};
    width: 100%;
    ${dividerTypes[variant]}
  `}
`;

interface AppOptionButtonProps extends TouchableOpacityProps {
  active: boolean;
}

export const AppOptionButton = styled.TouchableOpacity<AppOptionButtonProps>`
  ${({ active }) => css`
    padding: 24px;
    margin-bottom: 16px;
    border-radius: 8px;
    background-color: ${theme.colors.gray_100};
    border-width: 2px;
    border-color: ${theme.colors[active ? 'cyan_500' : 'dark']};
  `}
`;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 6,
  },
});
