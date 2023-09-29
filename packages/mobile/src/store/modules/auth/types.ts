import { IUser } from '../../../shared/types/IUser';

export type AuthState = {
  isReady: boolean;
  isAuthenticated: boolean;
  isFirstAccess: boolean;
  user?: IUser;
  phoneNumber?: string;
};

export type InitFullfilledProps = {
  accessToken?: string;
  phoneNumber?: string;
};
