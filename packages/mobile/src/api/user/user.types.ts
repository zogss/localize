import { IUser } from '@app/shared';

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
};

export type GetMeRequest = {
  id: string;
};

export type GetMeResponse = IUser;
