import {ITimestamp} from './timestamp';

export interface IUser extends ITimestamp {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  phone: string;
}
