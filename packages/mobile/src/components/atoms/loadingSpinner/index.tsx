import React, {useEffect} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {Container, styles} from './loadingSpinner.styles';

interface LoadingSpinnerProps {
  style?: StyleProp<ViewStyle>;
  hideContainer?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  style,
  hideContainer,
}) => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 700,
        easing: Easing.linear,
      }),
      200,
    );
    return () => cancelAnimation(rotation);
  }, []);
  if (hideContainer) {
    return <Animated.View style={[[styles.spinner, style], animatedStyles]} />;
  }

  return (
    <Container>
      <Animated.View style={[[styles.spinner, style], animatedStyles]} />
    </Container>
  );
};

export default LoadingSpinner;
