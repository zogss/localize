import { SetupContext } from '@app/contexts';
import { useContext } from 'react';

const useSetup = () => useContext(SetupContext);

export default useSetup;
