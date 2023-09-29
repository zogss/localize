import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import React, { createContext, useMemo, useState } from 'react';

interface BlurProps {
  setShowBlur: Dispatch<SetStateAction<boolean>>;
  showBlur: boolean;
}

const BlurContext = createContext({} as BlurProps);

const BlurProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [showBlur, setShowBlur] = useState(false);

  const value = useMemo(
    () => ({ setShowBlur, showBlur }),
    [setShowBlur, showBlur],
  );

  return <BlurContext.Provider value={value}>{children}</BlurContext.Provider>;
};

export { BlurContext, BlurProvider };
