import { BlurContext } from '@app/contexts';
import { useContext } from 'react';

const useBlur = () => useContext(BlurContext);

export default useBlur;
