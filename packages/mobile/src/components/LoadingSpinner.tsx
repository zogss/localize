import React, { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { ThemeColors } from '../styles/colors';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Spinner = {
  height: 24,
  width: 24,
  borderRadius: 30,
  borderWidth: 5,
  borderTopColor: ThemeColors.cyan_300,
  borderRightColor: ThemeColors.cyan_300,
  borderBottomColor: ThemeColors.cyan_300,
  borderLeftColor: ThemeColors.gray_800,
};

export const LoadingSpinner: React.FC = () => {
  //* hooks
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  //* effects
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, []);

  //* render
  return (
    <Container>
      <Animated.View style={[Spinner, animatedStyles]} />
    </Container>
  );
};
