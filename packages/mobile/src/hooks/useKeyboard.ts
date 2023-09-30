import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react-native';
import { Keyboard } from 'react-native';

export default () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const onKeyboardDidShow = (e: KeyboardEvent): void => {
    setKeyboardHeight(e.endCoordinates.height);
    setKeyboardOpened(true);
  };

  const onKeyboardDidHide = (): void => {
    setKeyboardHeight(0);
    setKeyboardOpened(false);
  };

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardDidShow,
    );
    const hideKeyboardListener = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardDidHide,
    );

    return (): void => {
      showKeyboardListener.remove();
      hideKeyboardListener.remove();
    };
  }, []);

  return {
    keyboardHeight,
    keyboardOpened,
  };
};
