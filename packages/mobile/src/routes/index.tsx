import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { IUser } from '../shared/@types/IUser';
import { RootState, useTypedDispatch, useTypedSelector } from '../store';
import { signIn } from '../store/modules/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const mocked = true

const Routes = () => {
  //* hooks
  const dispatch = useTypedDispatch();
  const signed = useTypedSelector<RootState, boolean>(
    (state) => state.auth.signed,
  );

  //* handlers
  const rehydrateUser = async () => {
    const token: string | null | undefined = JSON.parse(
      (await AsyncStorage.getItem('user:token')) || 'null',
    );
    const user: IUser | null = JSON.parse(
      (await AsyncStorage.getItem('user:user')) || 'null',
    );

    if (token && user && user.id) {
      await dispatch(signIn({ signed: true, token, user: user }));
    }
  };

  //* lifecycle
  useEffect(() => {
    rehydrateUser();
  }, []);

  //* render
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
