import * as React from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes = () => {
  const auth = false;

  return auth ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
