import {IUser} from '@app/shared';

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
};

export type RegisterResponse = IUser;

export type GetMeRequest = void;

export type GetMeResponse = IUser;
