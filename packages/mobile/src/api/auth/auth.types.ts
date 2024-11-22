import { IUser } from '@app/shared';

export type SendWppCodeRequest = {
  phone: string;
};

export type ConfirmWppRequest = {
  phone: string;
  code: string;
};

export type SignInResponse = {
  user: IUser;
  token: string;
};

export type SignInRequest = {
  phone: string;
  code: string;
};
