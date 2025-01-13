import {BlurView, BlurViewProps} from 'expo-blur';
import styled from 'styled-components/native';

export const StyledBlurView = styled(BlurView)<BlurViewProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
