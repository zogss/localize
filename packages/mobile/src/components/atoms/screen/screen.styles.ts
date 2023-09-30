import { theme } from '@app/themes';
import styled, { css } from 'styled-components/native';

export interface StyledSafeAreaViewProps {
  backgroundColor?: keyof typeof theme.colors;
}

export const StyledSafeAreaView = styled.SafeAreaView<StyledSafeAreaViewProps>`
  ${({ backgroundColor = 'dark' }) => css`
    background-color: ${theme.colors[
      backgroundColor as keyof typeof theme.colors
    ]};
    flex: 1;
  `}
`;

export const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
