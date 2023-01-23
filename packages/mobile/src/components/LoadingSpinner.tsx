import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
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
`;

const Spinner: StyleProp<ViewStyle> = {
  height: 24,
  width: 24,
  borderRadius: 30,
  borderWidth: 5,
  borderTopColor: ThemeColors.cyan_300,
  borderRightColor: ThemeColors.cyan_300,
  borderBottomColor: ThemeColors.cyan_300,
  borderLeftColor: ThemeColors.gray_800,
};

interface LoadingSpinnerProps {
  style?: StyleProp<ViewStyle>;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ style }) => {
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
        duration: 700,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, []);

  //* render
  return (
    <Container>
      <Animated.View style={[style || Spinner, animatedStyles]} />
    </Container>
  );
};
