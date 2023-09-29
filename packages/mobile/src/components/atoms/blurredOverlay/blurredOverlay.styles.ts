import type { BlurViewProps } from '@react-native-community/blur';
import { BlurView } from '@react-native-community/blur';
import styled from 'styled-components/native';

export const StyledBlurView = styled(BlurView)<BlurViewProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
