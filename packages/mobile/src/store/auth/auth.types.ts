import {IUser} from '@app/shared/types';

export type AuthState = {
  isReady: boolean;
  isAuthenticated: boolean;
  user: IUser;
  phoneNumber?: string;
};

export type InitFulfilledProps =
  | {
      accessToken?: string;
      phoneNumber?: string;
    }
  | undefined;
