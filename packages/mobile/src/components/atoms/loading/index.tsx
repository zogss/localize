import { theme } from '@app/themes';
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

const Spinner: StyleProp<ViewStyle> = {
  height: 24,
  width: 24,
  borderRadius: 30,
  borderWidth: 5,
  borderTopColor: theme.colors.cyan_300,
  borderRightColor: theme.colors.cyan_300,
  borderBottomColor: theme.colors.cyan_300,
  borderLeftColor: theme.colors.gray_800,
};

interface LoadingSpinnerProps {
  style?: StyleProp<ViewStyle>;
}

const AppLoading: React.FC<LoadingSpinnerProps> = ({ style }) => {
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
    <AppScreen>
      <Animated.View style={[style || Spinner, animatedStyles]} />
    </AppScreen>
  );
};

export default AppLoading;
