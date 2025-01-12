import {setLogoutHandler} from '@app/services/axios';

import {appStore} from './store';

export * from './auth';
export * from './rent';
export * from './store';

// After store creation
setLogoutHandler(() => {
  appStore.dispatch({type: 'logout'});
});
