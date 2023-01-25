import React, { useEffect, useMemo } from 'react';
import { LoadingView } from '../partials/LoadingView';
import { LOADING_STATUS } from '../shared/enum/LOADING_STATUS';
import { RootState, useTypedDispatch, useTypedSelector } from '../store';
import { verifyUser } from '../store/modules/auth';
import { IAuthState } from '../store/modules/auth/types';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes = () => {
  //* redux hooks
  const dispatch = useTypedDispatch();
  const authState = useTypedSelector<RootState, IAuthState>(
    (state) => state.auth,
  );

  //* constants
  const ActiveRoutes = useMemo<React.FC>(() => {
    if (authState.loading === LOADING_STATUS.LOADING) {
      return LoadingView;
    } else if (authState.signed) {
      return AppRoutes;
    }
    return AuthRoutes;
  }, [authState]);

  //* handlers
  const rehydrateUser = async () => {
    await dispatch(verifyUser());
  };

  //* lifecycle
  useEffect(() => {
    rehydrateUser();
  }, []);

  //* render
  return <ActiveRoutes />;
};

export default Routes;
