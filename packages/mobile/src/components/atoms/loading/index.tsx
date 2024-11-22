import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import AppScreen from '../screen';
import { styles } from './loading.styles';

interface LoadingSpinnerProps {
  style?: StyleProp<ViewStyle>;
  hideContainer?: boolean;
}

const AppLoading: React.FC<LoadingSpinnerProps> = ({
  style,
  hideContainer,
}) => {
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
      200,
    );
    return () => cancelAnimation(rotation);
  }, []);

  //* render
  if (hideContainer) {
    return (
      <Animated.View
        style={[{ ...styles.spinner, ...(style as object) }, animatedStyles]}
      />
    );
  }

  return (
    <AppScreen>
      <Animated.View
        style={[{ ...styles.spinner, ...(style as object) }, animatedStyles]}
      />
    </AppScreen>
  );
};

export default AppLoading;
