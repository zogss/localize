import { theme } from '@app/themes';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

export interface StyledSafeAreaViewProps {
  backgroundColor?: keyof Pick<
    typeof theme.colors,
    'cyan_300' | 'dark' | 'gray_100'
  >;
}

export const StyledSafeAreaView = styled(SafeAreaView)<StyledSafeAreaViewProps>`
  ${({ theme: { colors }, backgroundColor = 'background' }) => css`
    background-color: ${colors[backgroundColor]};
    flex: 1;
  `}
`;

export const StyledView = styled(View)`
  flex: 1;
`;
