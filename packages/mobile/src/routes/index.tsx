import React, { useEffect } from 'react';
import { LoadingView } from '../partials/LoadingView';
import { LOADING_STATUS } from '../shared/enum/LOADING_STATUS';
import { RootState, useTypedDispatch, useTypedSelector } from '../store';
import { IAuthState, verifyUser } from '../store/modules/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const mocked = true;

const Routes = () => {
  //* hooks
  const dispatch = useTypedDispatch();
  const authState = useTypedSelector<RootState, IAuthState>(
    (state) => state.auth,
  );

  //* handlers
  const rehydrateUser = async () => {
    await dispatch(verifyUser());
  };

  //* lifecycle
  useEffect(() => {
    rehydrateUser();
  }, []);

  //* render
  return authState.loading === LOADING_STATUS.LOADING ? (
    <LoadingView />
  ) : authState.signed ? (
    <AppRoutes />
  ) : (
    <AuthRoutes />
  );
};

export default Routes;
