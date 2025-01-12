import {useContext} from 'react';

import {BlurContext} from '@app/contexts';

const useBlur = () => useContext(BlurContext);

export default useBlur;
