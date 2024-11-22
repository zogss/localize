import { theme } from '@app/themes';
import type { TextProps, TextStyle } from 'react-native';
import styled, { css } from 'styled-components/native';

export interface StyledTextProps extends TextProps {
  color?: keyof typeof theme.colors;
  variant?: keyof typeof theme.fonts;
  align?: TextStyle['textAlign'];
}

export const StyledText = styled.Text<StyledTextProps>`
  ${({ color = 'gray_100', variant = 'text', align = 'auto' }) => css`
    color: ${theme.colors[color as keyof typeof theme.colors]};
    text-align: ${align};
    ${theme.fonts[variant as keyof typeof theme.fonts]}
  `}
`;

export const AppTextInputError = styled(StyledText)`
  color: ${theme.colors.red_500};
  font-size: 14px;
  margin: 10px 0;
`;
