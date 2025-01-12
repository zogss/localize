import {useContext} from 'react';

import {SetupContext} from '@app/contexts';

const useSetup = () => useContext(SetupContext);

export default useSetup;
